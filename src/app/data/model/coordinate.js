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
var Coordinate = (function (_super) {
    __extends(Coordinate, _super);
    function Coordinate() {
        return _super.call(this) || this;
    }
    Coordinate.prototype.setLatitude = function (latitude) {
        this.lat = latitude;
    };
    Coordinate.prototype.getLatitude = function () {
        return this.lat;
    };
    Coordinate.prototype.setLongitude = function (longitude) {
        this.lng = longitude;
    };
    Coordinate.prototype.getLongitude = function () {
        return this.lng;
    };
    return Coordinate;
}(base_object_1.BaseObject));
exports.Coordinate = Coordinate;
//# sourceMappingURL=coordinate.js.map