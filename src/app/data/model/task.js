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
var user_1 = require("./user");
var procedure_1 = require("./procedure");
var task_details_1 = require("./task-details");
var base_object_1 = require("./base-object");
var Task = (function (_super) {
    __extends(Task, _super);
    function Task() {
        var _this = _super.call(this) || this;
        _this.user = new user_1.User();
        _this.procedure = new procedure_1.Procedure();
        _this.details = new task_details_1.TaskDetails();
        return _this;
    }
    return Task;
}(base_object_1.BaseObject));
exports.Task = Task;
//# sourceMappingURL=task.js.map