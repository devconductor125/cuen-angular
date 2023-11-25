"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_object_1 = require("./base-object");
var Predio = (function (_super) {
    __extends(Predio, _super);
    function Predio(objectId) {
        var _this = _super.call(this) || this;
        _this.id = objectId;
        _this.polygons = [];
        return _this;
    }
    Predio.prototype.getPolygons = function () {
        return this.polygons;
    };
    Predio.prototype.getPolygon = function (objectId) {
        var resultArea = null;
        this.polygons.forEach(function (polygon) {
            if (polygon.id === objectId) {
                resultArea = polygon;
            }
        });
        return resultArea;
    };
    Predio.prototype.setPolygons = function (area) {
        this.polygons = area;
    };
    Predio.prototype.removeLastPolygon = function () {
        this.polygons.pop();
    };
    Predio.prototype.addPolygon = function (area) {
        this.polygons.push(area);
    };
    Predio.prototype.setGeoJson = function (geoJson) {
        this.geoJson = geoJson;
    };
    Predio.prototype.getGeoJson = function () {
        return this.geoJson;
    };
    return Predio;
}(base_object_1.BaseObject));
exports.Predio = Predio;
//# sourceMappingURL=predio.js.map