L.Handler.MarkerSnap = L.Handler.extend({
    statics: {
        SNAP_DISTANCE: 15  // in pixels
    },

    initialize: function (map, marker) {
        L.Handler.prototype.initialize.call(this, map);
        this._markers = [];
        this._guides = [];

        if (marker) {
            // new markers should be draggable !
            if (!marker.dragging) marker.dragging = new L.Handler.MarkerDrag(marker);
            marker.dragging.enable();
            this.watchMarker(marker);
        }

        // Convert SNAP_DISTANCE in pixels into buffer in degres, for searching around mouse
        // It changes at each zoom change.
        function computeBuffer() {
            this._buffer = map.layerPointToLatLng(new L.Point(0,0)).lat -
                           map.layerPointToLatLng(new L.Point(L.Handler.MarkerSnap.SNAP_DISTANCE, 0)).lat;
        }
        map.on('zoomend', computeBuffer, this);
        map.whenReady(computeBuffer, this);
        computeBuffer();
    },

    enable: function () {
        this.disable();
        for (var i=0; i<this._markers.length; i++) {
            this.watchMarker(this._markers[i]);
        }
    },

    disable: function () {
        for (var i=0; i<this._markers.length; i++) {
            this.unwatchMarker(this._markers[i]);
        }
    },

    watchMarker: function (marker) {
        if (this._markers.indexOf(marker) == -1)
            this._markers.push(marker);
        marker.on('move', this._snapMarker, this);
    },

    unwatchMarker: function (marker) {
        marker.off('move', this._snapMarker);
        delete marker['snap'];
    },

    addGuideLayer: function (layer) {
        this._guides.push(layer);
    },

    _snapMarker: function(e) {
        var marker = e.target,
            latlng = marker.getLatLng(),
            snaplist = [];

        function processGuide(guide) {
            if ((guide._layers !== undefined) &&
                (typeof guide.searchBuffer !== 'function')) {
                // Guide is a layer group and has no L.LayerIndexMixin (from Leaflet.LayerIndex)
                for (var id in guide._layers) {
                    processGuide(guide._layers[id]);
                }
            }
            else if (typeof guide.searchBuffer === 'function') {
                // Search snaplist around mouse
                snaplist = snaplist.concat(guide.searchBuffer(latlng, this._buffer));
            }
            else {
                snaplist.push(guide);
            }
        }

        for (var i=0, n = this._guides.length; i < n; i++) {
            var guide = this._guides[i];
            processGuide(guide);
        }

        var closest = L.GeometryUtil.closestLayerSnap(this._map, snaplist, latlng, L.Handler.MarkerSnap.SNAP_DISTANCE, true);
        closest = closest || {layer: null, latlng: null};
        this._updateSnap(marker, closest.layer, closest.latlng);
    },

    _updateSnap: function (marker, layer, latlng) {
        if (layer && latlng) {
            marker._latlng = L.latLng(latlng);
            marker.update();
            if (marker.snap != layer) {
                marker.snap = layer;
                L.DomUtil.addClass(marker._icon, 'marker-snapped');
                marker.fire('snap', {layer:layer, latlng: latlng});
            }
        }
        else {
            if (marker.snap) {
                L.DomUtil.removeClass(marker._icon, 'marker-snapped');
                marker.fire('unsnap', {layer:marker.snap});
            }
            delete marker['snap'];
        }
    }
});


L.Edit = L.Edit || {};
L.Edit.Poly = L.Edit.Poly || { extend: function () {} };

L.Handler.PolylineSnap = L.Edit.Poly.extend({

    initialize: function (map, poly, options) {
        L.Edit.Poly.prototype.initialize.call(this, poly, options);
        this._snapper = new L.Handler.MarkerSnap(map);
    },

    addGuideLayer: function (layer) {
        this._snapper.addGuideLayer(layer);
    },

    _createMarker: function (latlng, index) {
        var marker = L.Edit.Poly.prototype._createMarker.call(this, latlng, index);

        // Treat middle markers differently
        var isMiddle = arguments.callee.caller.toString().indexOf('_getMiddleLatLng') != -1;
        if (isMiddle) {
            // Snap middle markers, only once they were touched
            marker.on('dragstart', function () {
                this._snapper.watchMarker(marker);
            }, this);
        }
        else {
            this._snapper.watchMarker(marker);
        }
        return marker;
    }
});

