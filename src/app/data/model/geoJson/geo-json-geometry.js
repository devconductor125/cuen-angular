"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeoJsonGeometry = (function () {
    function GeoJsonGeometry(type) {
        this.type = type;
        this.type = type;
        this.coordinates = [];
    }
    GeoJsonGeometry.prototype.setCoordinates = function (coordinates) {
        this.coordinates = coordinates;
    };
    GeoJsonGeometry.prototype.getCoordinates = function () {
        return this.coordinates;
    };
    GeoJsonGeometry.prototype.removeLastCoordinate = function () {
        this.coordinates.pop();
    };
    GeoJsonGeometry.prototype.addCoordinates = function (newCoordinates) {
        var component = this;
        newCoordinates.forEach(function (coordinate) {
            var coordinatesArray = [];
            coordinatesArray.push(coordinate.getLatitude());
            coordinatesArray.push(coordinate.getLongitude());
            component.coordinates[0].push(coordinatesArray);
        });
    };
    return GeoJsonGeometry;
}());
exports.GeoJsonGeometry = GeoJsonGeometry;
//# sourceMappingURL=geo-json-geometry.js.map