"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/toPromise");
var predio_1 = require("../model/predio");
var geo_json_geometry_1 = require("../model/geoJson/geo-json-geometry");
var geo_json_properties_1 = require("../model/geoJson/geo-json-properties");
var geo_json_1 = require("../model/geoJson/geo-json");
var polygon_1 = require("../model/polygon");
var pqrs_1 = require("../model/pqrs");
var budget_1 = require("../model/budget");
var pool_of_contracts_action_1 = require("../model/pool-of-contracts-action");
var MappingUtils = (function () {
    function MappingUtils() {
    }
    MappingUtils.geoJsonToPredio = function (predioId, geoJson) {
        var predio = new predio_1.Predio(predioId);
        geoJson.features.forEach(function (feature) {
            switch (feature.geometry.type) {
                case 'Polygon':
                    var polygon = MappingUtils.featureToPolygon(feature);
                    predio.addPolygon(polygon);
                    break;
            }
        });
        predio.setGeoJson(geoJson);
        return predio;
    };
    MappingUtils.featureToPolygon = function (feature) {
        var polygon = new polygon_1.Polygon();
        polygon.setType(feature.geometry.type);
        var geometry = new geo_json_geometry_1.GeoJsonGeometry(feature.geometry.type);
        if (feature.geometry.coordinates && feature.geometry.coordinates.length > 0) {
            geometry.setCoordinates(feature.geometry.coordinates);
        }
        polygon.setGeometry(geometry);
        var properties = new geo_json_properties_1.GeoJsonProperties();
        properties.setAcciones(feature.properties.Acciones);
        properties.setObjectId(feature.properties.OBJECTID);
        properties.setObservations(feature.properties.Observacio);
        properties.setPolygon(feature.properties.Pol);
        properties.setShapeArea(feature.properties.SHAPE_Area);
        properties.setShapeLength(feature.properties.SHAPE_Leng);
        polygon.setProperties(properties);
        return polygon;
    };
    MappingUtils.predioToGeoJson = function (predio) {
        var geoJson = new geo_json_1.GeoJson();
        predio.getPolygons().forEach(function (polygon) {
            var feature = MappingUtils.polygonToFeature(polygon);
            geoJson.addFeature(feature);
        });
        return geoJson;
    };
    MappingUtils.polygonToFeature = function (polygon) {
        var feature = {};
        feature.type = 'Feature';
        feature.geometry = {};
        feature.geometry.type = polygon.getType();
        feature.geometry = polygon.getGeometry();
        feature.properties = polygon.getProperties();
        return feature;
    };
    MappingUtils.getMockGeoJson = function () {
        return '{\n' +
            '\t"crs": null,\n' +
            '\t"features": [{\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [\n' +
            '\t\t\t\t[\n' +
            '\t\t\t\t\t[-75.5726983, 5.8870883],\n' +
            '\t\t\t\t\t[-75.5728, 5.8869983],\n' +
            '\t\t\t\t\t[-75.5730983, 5.8869183],\n' +
            '\t\t\t\t\t[-75.5731983, 5.8867783],\n' +
            '\t\t\t\t\t[-75.5731983, 5.88663],\n' +
            '\t\t\t\t\t[-75.5731983, 5.8864783],\n' +
            '\t\t\t\t\t[-75.5730983, 5.8860283],\n' +
            '\t\t\t\t\t[-75.5729983, 5.8857283],\n' +
            '\t\t\t\t\t[-75.5729983, 5.88562]\n' +
            '\t\t\t\t]\n' +
            '\t\t\t],\n' +
            '\t\t\t"type": "MultiLineString"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Aislamiento Bosque de Nacimiento",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [\n' +
            '\t\t\t\t[\n' +
            '\t\t\t\t\t[-75.5712, 5.8811483],\n' +
            '\t\t\t\t\t[-75.5711, 5.8810783],\n' +
            '\t\t\t\t\t[-75.5708983, 5.8809683],\n' +
            '\t\t\t\t\t[-75.5705983, 5.88081],\n' +
            '\t\t\t\t\t[-75.5704, 5.8807083],\n' +
            '\t\t\t\t\t[-75.5703, 5.8805883],\n' +
            '\t\t\t\t\t[-75.5701983, 5.88044],\n' +
            '\t\t\t\t\t[-75.5699983, 5.8800983],\n' +
            '\t\t\t\t\t[-75.5698, 5.8799983]\n' +
            '\t\t\t\t]\n' +
            '\t\t\t],\n' +
            '\t\t\t"type": "MultiLineString"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Aislamiento Bosque de Ladera",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.88557],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.88557],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5728, 5.8852083],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5728, 5.8852083],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5722983, 5.8845483],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.572, 5.8841483],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5718983, 5.884],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5717983, 5.88356],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5712983, 5.88274],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5713983, 5.8822],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}],\n' +
            '\t"last_added_feature": null,\n' +
            '\t"multi_line_string_features": [{\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [\n' +
            '\t\t\t\t[\n' +
            '\t\t\t\t\t[-75.5726983, 5.8870883],\n' +
            '\t\t\t\t\t[-75.5728, 5.8869983],\n' +
            '\t\t\t\t\t[-75.5730983, 5.8869183],\n' +
            '\t\t\t\t\t[-75.5731983, 5.8867783],\n' +
            '\t\t\t\t\t[-75.5731983, 5.88663],\n' +
            '\t\t\t\t\t[-75.5731983, 5.8864783],\n' +
            '\t\t\t\t\t[-75.5730983, 5.8860283],\n' +
            '\t\t\t\t\t[-75.5729983, 5.8857283],\n' +
            '\t\t\t\t\t[-75.5729983, 5.88562]\n' +
            '\t\t\t\t]\n' +
            '\t\t\t],\n' +
            '\t\t\t"type": "MultiLineString"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Aislamiento Bosque de Nacimiento",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [\n' +
            '\t\t\t\t[\n' +
            '\t\t\t\t\t[-75.5712, 5.8811483],\n' +
            '\t\t\t\t\t[-75.5711, 5.8810783],\n' +
            '\t\t\t\t\t[-75.5708983, 5.8809683],\n' +
            '\t\t\t\t\t[-75.5705983, 5.88081],\n' +
            '\t\t\t\t\t[-75.5704, 5.8807083],\n' +
            '\t\t\t\t\t[-75.5703, 5.8805883],\n' +
            '\t\t\t\t\t[-75.5701983, 5.88044],\n' +
            '\t\t\t\t\t[-75.5699983, 5.8800983],\n' +
            '\t\t\t\t\t[-75.5698, 5.8799983]\n' +
            '\t\t\t\t]\n' +
            '\t\t\t],\n' +
            '\t\t\t"type": "MultiLineString"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Aislamiento Bosque de Ladera",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}],\n' +
            '\t"point_features": [{\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.88557],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.88557],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5729, 5.8855183],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5728, 5.8852083],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5728, 5.8852083],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5722983, 5.8845483],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.572, 5.8841483],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5718983, 5.884],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5717983, 5.88356],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5712983, 5.88274],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "Huerto leñero",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}, {\n' +
            '\t\t"geometry": {\n' +
            '\t\t\t"coordinates": [-75.5713983, 5.8822],\n' +
            '\t\t\t"type": "Point"\n' +
            '\t\t},\n' +
            '\t\t"properties": {\n' +
            '\t\t\t"Acciones": "STARD",\n' +
            '\t\t\t"OBJECTID": 0,\n' +
            '\t\t\t"Pol": null,\n' +
            '\t\t\t"SHAPE_Area": 0.0,\n' +
            '\t\t\t"SHAPE_Leng": 0.0\n' +
            '\t\t},\n' +
            '\t\t"type": "Feature"\n' +
            '\t}],\n' +
            '\t"type": "FeatureCollection"\n' +
            '}';
    };
    MappingUtils.pqrsResponseToPQRS = function (component, response) {
        response.conservation_agreement_corporation = Boolean(response.conservation_agreement_corporation);
        response.subscribe_agreement = Boolean(response.subscribe_agreement);
        var pqrs = new pqrs_1.PQRS();
        Object.assign(pqrs, response);
        if (response.response_pqrs && response.response_pqrs.length > 0) {
            pqrs.response = response.response_pqrs[0].response_email_request_pqrs;
        }
        component.dependencies.forEach(function (dependency) {
            if (String(dependency.id) === String(response.dependencies_role_id)) {
                pqrs.dependency = dependency;
            }
        });
        component.pqrsTypes.forEach(function (pqrsType) {
            if (String(pqrsType.id) === String(response.type_pqrs_id)) {
                pqrs.pqrsType = pqrsType;
            }
        });
        return pqrs;
    };
    MappingUtils.budgetToPoolOfContractsAction = function (processId, budget) {
        var action = new pool_of_contracts_action_1.PoolOfContractsAction();
        action.process_id = processId;
        action.budget_id = Number(budget.id);
        action.action = budget.action;
        action.type = budget.type;
        action.material = budget.material;
        return action;
    };
    MappingUtils.mapPoolOfContractsActionToBudget = function (procedure) {
        var budget = new budget_1.Budget;
        budget.hash_map = procedure.id + '_' + procedure.pool_id + '_' + procedure.process_id + '_' + procedure.budget_id + '_' + procedure.action + '_' + procedure.material;
        budget.action = procedure.action;
        budget.material = procedure.material;
        budget.selected = true;
        budget.id = String(procedure.budget_id);
        return budget;
    };
    return MappingUtils;
}());
exports.MappingUtils = MappingUtils;
//# sourceMappingURL=mapping.utils.js.map