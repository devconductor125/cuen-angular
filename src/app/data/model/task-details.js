"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var task_details_object_1 = require("./task-details-object");
var TaskDetails = (function () {
    function TaskDetails() {
        this.status = new task_details_object_1.TaskDetailObject();
        this.type = new task_details_object_1.TaskDetailObject();
        this.process = new task_details_object_1.TaskDetailObject();
        this.activity = new task_details_object_1.TaskDetailObject();
        this.project = new task_details_object_1.TaskDetailObject();
        this.program = new task_details_object_1.TaskDetailObject();
        this.user = new task_details_object_1.TaskDetailObject();
        this.role = new task_details_object_1.TaskDetailObject();
        this.startdate = new task_details_object_1.TaskDetailObject();
        this.deadline = new task_details_object_1.TaskDetailObject();
    }
    return TaskDetails;
}());
exports.TaskDetails = TaskDetails;
//# sourceMappingURL=task-details.js.map