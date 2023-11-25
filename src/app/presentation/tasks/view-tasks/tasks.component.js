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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var base_component_1 = require("../../base-component/base-component");
var messaging_service_1 = require("../../../data/services/messaging.service");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var TasksComponent = (function (_super) {
    __extends(TasksComponent, _super);
    function TasksComponent(proceduresManager, messagingService, tasksManager, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.messagingService = messagingService;
        _this.tasksManager = tasksManager;
        _this.rolesManager = rolesManager;
        _this.rolesList = [];
        _this.filterActive = false;
        return _this;
    }
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.tasksManager.loadAllObjects()
            .then(function (response) {
            if (response instanceof Array) {
                response = response.filter(function (task) { return task.role_id && task.role_name && task.sub_type; });
                _this.tasks = response;
                _this.allTasks = Object.assign([], response);
                _this.getRolesList(response);
            }
        });
        this.getUserRoles(this);
        this.roleFilter = '0';
    };
    TasksComponent.prototype.getRolesList = function (tasks) {
        var rolesMap = new Map();
        var placeholder = {};
        placeholder.id = 0;
        placeholder.name = 'Selecciona un Rol';
        rolesMap.set(placeholder.id, placeholder);
        this.selectedRole = placeholder;
        tasks.forEach(function (task) {
            var role = {};
            role.id = task.role_id;
            role.name = task.role_name;
            rolesMap.set(role.id, role);
        });
        this.rolesList = Array.from(rolesMap.values());
    };
    TasksComponent.prototype.filterTasksByRole = function (selectedRole) {
        if (selectedRole.id === 0) {
            this.tasks = Object.assign([], this.allTasks);
        }
        else {
            this.tasks = this.allTasks.filter(function (task) { return task.role_id === selectedRole.id; });
        }
    };
    TasksComponent.prototype.deleteTask = function (task) {
        var component = this;
        this.shouldDelete(function () {
            component.tasksManager.deleteObject(task)
                .then(function (success) {
                if (success) {
                    var i = component.tasks.length;
                    while (i--) {
                        if (component.tasks[i].id === task.id) {
                            component.tasks.splice(i, 1);
                        }
                    }
                }
            });
        });
    };
    TasksComponent.prototype.filterApply = function () {
        if (this.validFilter()) {
            this.filterActive = true;
        }
    };
    TasksComponent.prototype.filterClear = function () {
        this.roleFilter = '0';
        this.filterActive = false;
    };
    TasksComponent.prototype.validFilter = function () {
        if (this.roleFilter === '0') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona un tipo de filtro',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            this.filterActive = false;
            return false;
        }
        return true;
    };
    TasksComponent.prototype.isCartaIntencion = function (task) {
        return String(task.route).includes('carta');
    };
    return TasksComponent;
}(base_component_1.BaseComponent));
TasksComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-tasks',
        templateUrl: './tasks.component.html',
        styleUrls: ['./tasks.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        messaging_service_1.MessagingService,
        tasks_manager_1.TasksManager,
        roles_manager_1.RolesManager])
], TasksComponent);
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map