"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeoJsonProperties = (function () {
    function GeoJsonProperties() {
    }
    GeoJsonProperties.prototype.setAcciones = function (Acciones) {
        this.Acciones = Acciones;
    };
    GeoJsonProperties.prototype.setObjectId = function (OBJECTID) {
        this.OBJECTID = OBJECTID;
    };
    GeoJsonProperties.prototype.getObjectId = function () {
        return this.OBJECTID;
    };
    GeoJsonProperties.prototype.setObservations = function (Observacio) {
        this.Observacio = Observacio;
    };
    GeoJsonProperties.prototype.setPolygon = function (Pol) {
        this.Pol = Pol;
    };
    GeoJsonProperties.prototype.setShapeArea = function (SHAPE_Area) {
        this.SHAPE_Area = SHAPE_Area;
    };
    GeoJsonProperties.prototype.setShapeLength = function (SHAPE_Leng) {
        this.SHAPE_Leng = SHAPE_Leng;
    };
    return GeoJsonProperties;
}());
exports.GeoJsonProperties = GeoJsonProperties;
//# sourceMappingURL=geo-json-properties.js.map