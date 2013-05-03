Leaflet.Snap
============

Enable snapping between layers !

Check out the [demo](http://makinacorpus.github.com/Leaflet.Snap/) !


It depends on [Leaflet.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil).

For Polyline edition snapping it also depends on [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw).


Usage
-----

For markers : 

```javascript

    var guideLayer = ...;

    var marker = L.marker([48.488, 1.395]).addTo(map);
        marker.snapediting = new L.Handler.MarkerSnap(map, marker);
        marker.snapediting.addGuideLayer(guideLayer);
        marker.snapediting.enable();
```

For polylines : 

```javascript
    var polyline = L.polyline(...).addTo(map);
        polyline.snapediting = new L.Handler.PolylineSnap(map, polyline);
        polyline.snapediting.addGuideLayer(guideLayer);
        polyline.snapediting.enable();
```

Events:

**snap** (//layer//, //latlng//) : fired when snapped to ``layer`` at ``latlng``

**unsnap** (//layer//) : fired when unsnapped from ``layer``


TODO
----

* Add init hooks to simplify initialization

Authors
-------

[![Makina Corpus](http://depot.makina-corpus.org/public/logo.gif)](http://makinacorpus.com)
