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
var Line = (function (_super) {
    __extends(Line, _super);
    function Line() {
        var _this = _super.call(this) || this;
        _this.geometry = [];
        return _this;
    }
    Line.prototype.setCoordinates = function (coordinates) {
        this.geometry = coordinates;
    };
    Line.prototype.getCoordinates = function () {
        return this.geometry;
    };
    Line.prototype.removeLastCoordinate = function () {
        this.geometry.pop();
    };
    Line.prototype.addCoordinate = function (coordinate) {
        this.geometry.push(coordinate);
    };
    return Line;
}(base_object_1.BaseObject));
exports.Line = Line;
//# sourceMappingURL=line.js.map