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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var create_task_component_1 = require("../create-task/create-task.component");
var messaging_service_1 = require("../../../data/services/messaging.service");
var task_type_1 = require("../../../data/model/task-type");
var EditTaskComponent = (function (_super) {
    __extends(EditTaskComponent, _super);
    function EditTaskComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showRoleAndUserSelector = true;
        return _this;
    }
    EditTaskComponent.prototype.onDataLoaded = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return params.get('id') + ''; })
            .subscribe(function (id) {
            if (id) {
                _this.tasksManager.getObjectForEdit(String(id))
                    .then(function (object) {
                    _this.task = object;
                    if (Number(_this.task.taskType.id) === 5) {
                        _this.showExtraFields = false;
                    }
                    _this.mapTaskObjects();
                });
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    EditTaskComponent.prototype.mapTaskObjects = function () {
        var component = this;
        component.procedures.forEach(function (procedure) {
            if (Number(procedure.id) === Number(component.task.process)) {
                component.task.procedure = procedure;
            }
        });
        component.roles.forEach(function (role) {
            if (Number(role.id) === Number(component.task.role.id)) {
                component.task.role = role;
                component.getUsers();
            }
        });
        var taskType = new task_type_1.TaskType();
        taskType.id = '0';
        taskType.name = this.task.type_name;
        this.taskTypes = [];
        this.taskTypes.push(taskType);
        this.task.taskType = taskType;
        if (!this.hasValidRole()) {
            this.showRoleAndUserSelector = false;
        }
    };
    EditTaskComponent.prototype.updateTask = function () {
        var _this = this;
        if (this.isValidTaskEdit()) {
            this.tasksManager.update(this.task)
                .then(function (success) {
                if (success) {
                    var message = {
                        'tipo': 'Actualizada',
                        'message': 'La tarea ha sido actualizada satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/tasks'];
                    _this.router.navigate(link);
                }
            });
        }
    };
    EditTaskComponent.prototype.isValidTaskEdit = function () {
        if (Number(this.task.procedure.id) <= 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona un Procedimiento',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.showExtraFields) {
            /*if (!this.task.property || this.task.property.length === 0) {
              const message = {
                'tipo': 'Error: ',
                'message': 'Selecciona un Predio',
                'style': 'alert-danger'
              };
              this.messagingService.publish(new BusMessage('alerta', message));
              return false;
            }*/
            if (!this.task.description || this.task.description.length === 0) {
                var message = {
                    'tipo': 'Error: ',
                    'message': 'Ingresa la descripción de la tarea',
                    'style': 'alert-danger'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                return false;
            }
        }
        if (Number(this.task.taskType.id) <= 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona un tipo de tarea',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        this.task.title = this.task.taskType.name;
        if (!this.task.title || this.task.title.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el título de la tarea',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.task.user || Number(this.task.user.id) === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona un usuario para enviar la tarea',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    EditTaskComponent.prototype.hasValidRole = function () {
        var role = Number(this.task.role.id);
        return role === 0 || role === 4 || role === 5;
    };
    return EditTaskComponent;
}(create_task_component_1.CreateTaskComponent));
EditTaskComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-edit-task',
        templateUrl: './edit-task.component.html',
        styleUrls: ['./edit-task.component.css']
    })
], EditTaskComponent);
exports.EditTaskComponent = EditTaskComponent;
//# sourceMappingURL=edit-task.component.js.map