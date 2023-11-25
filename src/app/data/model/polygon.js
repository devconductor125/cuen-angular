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
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon() {
        return _super.call(this) || this;
    }
    Polygon.prototype.getGeometry = function () {
        return this.geometry;
    };
    Polygon.prototype.setGeometry = function (geometry) {
        this.geometry = geometry;
    };
    Polygon.prototype.getCenterLatitude = function () {
        return this.geometry.getCoordinates()[0][0][1];
    };
    Polygon.prototype.getCenterLongitude = function () {
        return this.geometry.getCoordinates()[0][0][0];
    };
    Polygon.prototype.getArrayForMap = function () {
        var arrayForMap = [];
        this.geometry.getCoordinates()[0].forEach(function (coordinates) {
            var coordinate = {};
            coordinate.lat = coordinates[1];
            coordinate.lng = coordinates[0];
            arrayForMap.push(coordinate);
        });
        return arrayForMap;
    };
    Polygon.prototype.setType = function (type) {
        this.type = type;
    };
    Polygon.prototype.getType = function () {
        return this.type;
    };
    Polygon.prototype.setProperties = function (properties) {
        this.properties = properties;
    };
    Polygon.prototype.getProperties = function () {
        return this.properties;
    };
    return Polygon;
}(base_object_1.BaseObject));
exports.Polygon = Polygon;
//# sourceMappingURL=polygon.js.map