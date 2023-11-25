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
var Procedure = (function (_super) {
    __extends(Procedure, _super);
    function Procedure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tasks = [];
        return _this;
    }
    Procedure.prototype.hasGotTasks = function () {
        return this.tasks != null && this.tasks.length > 0;
    };
    Procedure.prototype.getTasks = function () {
        return this.tasks;
    };
    Procedure.prototype.setTasks = function (tasks) {
        this.tasks = tasks;
    };
    Procedure.prototype.setProgressBarAnimationValues = function () {
        this.animationDelay = 0;
        this.animationDuration = Math.floor(Math.random() * (1800 - 1200 + 1)) + 1200;
    };
    return Procedure;
}(base_object_1.BaseObject));
exports.Procedure = Procedure;
//# sourceMappingURL=procedure.js.map