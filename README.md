Leaflet.Snap
============

Enables snapping of draggable markers to polylines and other layers ! 
Now updated to work with Leaflet.Draw for Leaflet 1.0!

<p align="center">
<a href="https://www.npmjs.com/package/leaflet-snap"><img alt="npm" src="https://img.shields.io/npm/dt/leaflet-snap"></a>
<a href="https://www.npmjs.com/package/leaflet-snap"><img alt="npm" src= "https://img.shields.io/npm/v/leaflet-snap?color=red"></a>
</p>

<div class="demo">
<p align="center">Check out the <a href="https://makinacorpus.github.io/Leaflet.Snap/">demo</a> ! </p>
</div>

Install
-----
In order to use this plugin in your app you can either:
* install it via your favorite package manager:
    * `npm i leaflet-snap`
    * `bower install git@github.com:makinacorpus/Leaflet.Snap.git`
* download the repository and import the `leaflet.snap.js` file in your app.

Dependencies
-----
It depends on [Leaflet.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil).

For snapping on shape drawing or edition snapping, it also depends on [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw).

If your guide layer contains several thousands for features, adding the [LayerIndex](https://github.com/makinacorpus/Leaflet.LayerIndex) is recommended, this plugin takes advantage of the spatial index if it is available.

Usage
-----

* Add `leaflet.snap.js` and `leaflet.geometryutil.js` (optionally `leaflet.draw.js`)

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

Both `L.Handler.MarkerSnap` and `L.Handler.PolylineSnap` accept options as a third
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

`L.EditToolbar.SnapEdit` accepts options and initial guide layers.  

### Options:

**snapDistance** : (default 15) distance in pixels where snapping occurs

**snapVertices** : (default true) whether layers vertices add additional snap attraction

### Events :

**snap** ( _layer_, _latlng_ ) : fired when snapped to ``layer`` at ``latlng``

**unsnap** ( _layer_ ) : fired when unsnapped from ``layer``


Leaflet.Snap.Guidelines
============

L.Snap.Guidelines ia a class that works with Leaflet Draw to draw horizontal and vertical guidelines along all other existing rectangles and circles when in draw or edit mode, and allows the mouse to snap to those lines, to help the user to draw things that line up perfectly despite their being distance between them. Note that other shapes will always have snapping-prioirty over the guidelines.

```javascript
var guideLines = new L.Snap.Guidelines(map, guideLayers, {});
```

### Options:

**guideStyle** : The style of the guidelines, as a hash. By default, we have weight:1, color:black, opacity:0.1, and dashArray: 15, 10, 5.
    
### Methods:

**enabled** : as expected.
**enable** :  as expected.
**disable** :  as expected.


Leaflet.Snap.Gridlines
============

```javascript
var gridlines = new L.Snap.Gridlines(map, guideLayers, {
 'pixelSpacingX' : 98,
 'pixelSpacingY' : 98
});
```
    
L.Snap.Gridlines draws a grid on the map, and enables L.Snap to snap to its lines. Intersections of NS/WE gridlines will be preferred over sticking to a single line, but other shapes will always have snapping priority over the grid itself. 

### Options:
            
**maxBounds** : Specifies the NSWE bounds for the gridlines. If the maxBounds option is not set, the maxBounds on the map itself is used by default.

**numGridlines** -or- **numGridlinesLat**/**numGridlinesLng** -or- **gridSpacingLat**/**gridSpacingLng** -or- **pixelSpacingX**/**pixelSpacingY** : Only one of these options (or pairs of options) should be set. the "num" options specify the number of gridlines to fit in the maxBounds for each direction, calculating their spacing based on the total width/height, while the "spacing" options do the opposite, calculating the number based on the spacing. Spacing also allows one to specify its values in pixel or latlng coordinates.
    
**gridStyle** : The style of the gridlines themselves, as a hash. By default, we have weight:1, color:black, and opacity:0.1.
    
### Methods:

**enabled** : as expected.
**enable** :  as expected.
**disable** :  as expected.
**disableSnap** : disable snap without changing the show/hide status of the grid.
**disableSnap** : re-enables snap without changing the show/hide status of the grid.
**calcDimensions** : redraws the grid with new dimensions; options are the same as the constructor.
**show** : shows the grid and disables snap on the grid.
**hide** : hides the grid and disables snap on the grid.

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
