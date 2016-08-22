Leaflet.Snap
============

Enables snapping of draggable markers to polylines and other layers !

Check out the [demo](http://makinacorpus.github.com/Leaflet.Snap/) !


It depends on [Leaflet.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil).

For snapping on shape drawing or edition snapping, it also depends on [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw).

If your guide layer contains several thousands for features, adding the [LayerIndex](https://github.com/makinacorpus/Leaflet.LayerIndex) is recommended, this plugin takes advantage of the spatial index if it is available.

Usage
-----

* Add ``leaflet.snap.js`` and ``leaflet.geometryutil.js`` (optionally ``leaflet.draw.js``)

### For markers :

```javascript

    var guideLayer = ...;

    var marker = L.marker([48.488, 1.395]).addTo(map);
        marker.snapediting = new L.Handler.MarkerSnap(map, marker);
        marker.snapediting.addGuideLayer(guideLayer);
        marker.snapediting.enable();
```

### For Leaflet.Draw :

```javascript

    var guideLayers = [guides, road];

    map.drawControl.setDrawingOptions({
        polyline: { guideLayers: guideLayers },
        polygon: { guideLayers: guideLayers, snapDistance: 5 },
    });
```

### For editing existing polyline :

```javascript
    var polyline = L.polyline(...).addTo(map);
        polyline.snapediting = new L.Handler.PolylineSnap(map, polyline);
        polyline.snapediting.addGuideLayer(guideLayer);
        polyline.snapediting.enable();
```

Both ``L.Handler.MarkerSnap`` and ``L.Handler.PolylineSnap`` accept options as a third
argument.

### For editing existing polyline with L.EditToolbar.SnapEdit :

L.EditToolbar.SnapEdit is an extension of L.EditToolbar.Edit in Leaflet.draw.

```javascript
var polyline = L.polyline(...).addTo(map);
var editToolbar = new L.EditToolbar.SnapEdit(map, {
   featureGroup: L.featureGroup([polyline]),
   snapOptions: {
      guideLayers: [guideLayer]
   }
});

editToolbar.enable();
```

```L.EditToolbar.SnapEdit``` accepts options and initial guide layers.  

### Options:

**snapDistance** : (default 15) distance in pixels where snapping occurs

**snapVertices** : (default true) whether layers vertices add additional snap attraction

### Events :

**snap** ( _layer_, _latlng_ ) : fired when snapped to ``layer`` at ``latlng``

**unsnap** ( _layer_ ) : fired when unsnapped from ``layer``


CHANGELOG
---------

### 0.0.4

* Fix to use leaflet-draw ^0.3.0
* Delete git module and use node module instead
* Can Snap for 'editing existing polyline with L.EditToolbar.SnapEdit' 
* Example can be use with http / https

### 0.0.3

* Set the newly drawn point/vertex to the snapped location

### 0.0.2

* Disable snapping when the feature is deleted

### 0.0.1

* Fix Snaping if guide layer has Leaflet.LayerIndex


TODO
----

* Add init hooks to simplify initialization

Authors
-------

* Mathieu Leplatre
* Tobias Bieniek
* Frédéric Bonifas

[![Makina Corpus](http://depot.makina-corpus.org/public/logo.gif)](http://makinacorpus.com)
