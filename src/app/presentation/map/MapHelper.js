"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapHelper = (function () {
    function MapHelper() {
    }
    MapHelper.addFeatureToMap = function (component, google, feature, markerBounds) {
        switch (feature.geometry.type) {
            case MapHelper.LINE:
                var coordinates1 = feature.geometry.coordinates;
                var polylineCoordinates_1 = [];
                coordinates1.forEach(function (coordinate) {
                    polylineCoordinates_1.push({ lat: coordinate[1], lng: coordinate[0] });
                    var boundsPoint = new google.maps.LatLng(coordinate[1], coordinate[0]);
                    markerBounds.extend(boundsPoint);
                });
                var mapPolyline_1 = new google.maps.Polyline({
                    path: polylineCoordinates_1,
                    strokeColor: feature.properties.Color,
                    strokeOpacity: 1,
                    strokeWeight: 5,
                    fillColor: feature.properties.Color,
                    fillOpacity: 0.35,
                    zIndex: 4
                });
                mapPolyline_1.data = feature;
                google.maps.event.addListener(mapPolyline_1, 'click', function (event) {
                    if (component.onFeatureClicked) {
                        component.onFeatureClicked('1', mapPolyline_1.data, event);
                    }
                });
                mapPolyline_1.setMap(component.map);
                mapPolyline_1.id = feature.properties.AccionId;
                component.polylines.push(mapPolyline_1);
                break;
            case MapHelper.MULTI_LINE:
                feature.geometry.coordinates.forEach(function (coordinatesArray) {
                    var coordinates2 = coordinatesArray;
                    var multiStringPolylineCoordinates = [];
                    coordinates2.forEach(function (coordinate) {
                        multiStringPolylineCoordinates.push({ lat: coordinate[1], lng: coordinate[0] });
                        var boundsPoint = new google.maps.LatLng(coordinate[1], coordinate[0]);
                        markerBounds.extend(boundsPoint);
                    });
                    var mapPolyline2 = new google.maps.Polyline({
                        path: multiStringPolylineCoordinates,
                        strokeColor: feature.properties.Color,
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                        fillColor: feature.properties.Color,
                        fillOpacity: 0.35
                    });
                    mapPolyline2.data = feature;
                    google.maps.event.addListener(mapPolyline2, 'click', function (event) {
                        if (component.onFeatureClicked) {
                            component.onFeatureClicked('1', mapPolyline2.data, event);
                        }
                    });
                    mapPolyline2.setMap(component.map);
                    mapPolyline2.id = feature.properties.AccionId;
                    component.polylines.push(mapPolyline2);
                });
                break;
            case MapHelper.POLYGON:
                var coordinates3 = feature.geometry.coordinates;
                var polygonCoordinates_1 = [];
                coordinates3.forEach(function (coordinate) {
                    coordinate.forEach(function (point) {
                        polygonCoordinates_1.push({ lat: point[1], lng: point[0] });
                        var boundsPoint = new google.maps.LatLng(point[1], point[0]);
                        markerBounds.extend(boundsPoint);
                    });
                });
                var mapPolygon_1 = new google.maps.Polygon({
                    path: polygonCoordinates_1,
                    strokeColor: feature.properties.Color,
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                    fillColor: feature.properties.Color,
                    fillOpacity: 0.35
                });
                mapPolygon_1.data = feature;
                google.maps.event.addListener(mapPolygon_1, 'click', function (event) {
                    if (component.onFeatureClicked) {
                        component.onFeatureClicked('1', mapPolygon_1.data, event);
                    }
                });
                mapPolygon_1.setMap(component.map);
                mapPolygon_1.id = feature.properties.AccionId;
                component.polygons.push(mapPolygon_1);
                break;
            case MapHelper.MULTI_POLYGON:
                feature.geometry.coordinates.forEach(function (coordinatesArray) {
                    var multiPolygonCoordinates = [];
                    coordinatesArray.forEach(function (coordinate) {
                        coordinate.forEach(function (point) {
                            multiPolygonCoordinates.push({ lat: point[1], lng: point[0] });
                            var boundsPoint = new google.maps.LatLng(point[1], point[0]);
                            markerBounds.extend(boundsPoint);
                        });
                    });
                    var mapMultiPolygon = new google.maps.Polygon({
                        path: multiPolygonCoordinates,
                        strokeColor: feature.properties.Color,
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                        fillColor: feature.properties.Color,
                        fillOpacity: 0.35
                    });
                    mapMultiPolygon.data = feature;
                    google.maps.event.addListener(mapMultiPolygon, 'click', function (event) {
                        if (component.onFeatureClicked) {
                            component.onFeatureClicked('1', mapMultiPolygon.data, event);
                        }
                    });
                    mapMultiPolygon.setMap(component.map);
                    mapMultiPolygon.id = feature.properties.AccionId;
                    component.polygons.push(mapMultiPolygon);
                });
                break;
            case MapHelper.POINT:
                var pointCoordinates = feature.geometry.coordinates;
                var center = { lat: pointCoordinates[1], lng: pointCoordinates[0] };
                var mapCircle_1 = new google.maps.Circle({
                    strokeColor: feature.properties.AccionId ? 0 : '#FF4081',
                    strokeOpacity: 1,
                    strokeWeight: feature.properties.AccionId ? 0 : 3,
                    fillColor: feature.properties.Color,
                    fillOpacity: 1,
                    center: center,
                    radius: 5
                });
                mapCircle_1.data = feature;
                google.maps.event.addListener(mapCircle_1, 'click', function (event) {
                    if (component.onFeatureClicked) {
                        component.onFeatureClicked('1', mapCircle_1.data, event);
                    }
                });
                var boundsPoint = new google.maps.LatLng(pointCoordinates[1], pointCoordinates[0]);
                markerBounds.extend(boundsPoint);
                mapCircle_1.setMap(component.map);
                mapCircle_1.id = feature.properties.AccionId;
                component.circles.push(mapCircle_1);
                break;
        }
    };
    MapHelper.addMonitoreoPointToMap = function (component, google, point) {
        var pointCoordinates = point.coordinate.split(',');
        var latLng = new google.maps.LatLng(Number(pointCoordinates[0]), Number(pointCoordinates[1]));
        var icon = {
            path: 'M50,40c-8.285,0-15,6.718-15,15c0,8.285,6.715,15,15,15c8.283,0,15-6.715,15-15 ' +
                '   C65,46.718,58.283,40,50,40z M90,25H78c-1.65,0-3.428-1.28-3.949-2.846l-3.102-9.309C70.426,11.28,68.65,10,67,10H33  ' +
                '  c-1.65,0-3.428,1.28-3.949,2.846l-3.102,9.309C25.426,23.72,23.65,25,22,25H10C4.5,25,0,29.5,0,35v45c0,5.5,4.5,10,10,10h80   ' +
                ' c5.5,0,10-4.5,10-10V35C100,29.5,95.5,25,90,25z M50,80c-13.807,0-25-11.193-25-25c0-13.806,11.193-25,25-25  ' +
                '  c13.805,0,25,11.194,25,25C75,68.807,63.805,80,50,80z M86.5,41.993c-1.932,0-3.5-1.566-3.5-3.5c0-1.932,1.568-3.5,3.5-3.5  ' +
                '  c1.934,0,3.5,1.568,3.5,3.5C90,40.427,88.433,41.993,86.5,41.993z',
            fillColor: '#006DF0',
            fillOpacity: .6,
            strokeWeight: 0,
            scale: 1
        };
        var marker = new google.maps.Marker({
            position: latLng,
            draggable: false,
            icon: icon,
            customInfo: point
        });
        google.maps.event.addListener(marker, 'click', function () {
            if (component.onMonitoreoPointClicked) {
                component.onMonitoreoPointClicked(this.customInfo);
            }
        });
        marker.setMap(component.map);
    };
    MapHelper.getGeoJsonBudget = function (geoJson) {
        var accionesWithMaterials = {};
        var accionesWithMaterialsHashes = {};
        var budget = [];
        geoJson.features.forEach(function (feature) {
            var budgetItem = {};
            budgetItem.actionId = feature.properties.AccionId;
            budgetItem.hash = feature.properties.hash;
            budgetItem.length = feature.properties.SHAPE_Leng;
            budgetItem.materialId = feature.properties.MaterialId;
            budget.push(budgetItem);
        });
        return budget;
    };
    MapHelper.onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index;
    };
    return MapHelper;
}());
MapHelper.POINT = 'Point';
MapHelper.POLYGON = 'Polygon';
MapHelper.MULTI_POLYGON = 'MultiPolygon';
MapHelper.LINE = 'LineString';
MapHelper.MULTI_LINE = 'MultiLineString';
exports.MapHelper = MapHelper;
//# sourceMappingURL=MapHelper.js.map