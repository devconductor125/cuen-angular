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
var router_1 = require("@angular/router");
var base_component_1 = require("../../base-component/base-component");
var messaging_service_1 = require("../../../data/services/messaging.service");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var activity_1 = require("../../../data/model/activity");
var ActivityToProjectComponent = (function (_super) {
    __extends(ActivityToProjectComponent, _super);
    function ActivityToProjectComponent(proceduresManager, taskManager, router, activatedRoute, rolesManager, messagingService) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.taskManager = taskManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.rolesManager = rolesManager;
        _this.messagingService = messagingService;
        _this.listActivities = [];
        _this.activity = new activity_1.Activity();
        return _this;
    }
    ActivityToProjectComponent.prototype.ngOnInit = function () {
        //// this.getActivitiesByIdProject();
    };
    ActivityToProjectComponent.prototype.regActivity = function () {
        if (this.validarRegistro()) {
            ////this.insertActivityByProject();
            this.listActivities.push(this.activity);
            this.activity = new activity_1.Activity();
        }
    };
    ActivityToProjectComponent.prototype.validarRegistro = function () {
        if (!this.activity.name || this.activity.name.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el nombre de la actividad',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    ActivityToProjectComponent.prototype.getActivitiesByIdProject = function () {
        var _this = this;
        this.taskManager.getListProjects(this.projectId).then(function (response) {
            ///// console.log(response);
            if (response instanceof Array) {
                _this.listActivities = response;
            }
            else {
                _this.listActivities = [];
            }
            /// console.log(this.listObservation);
        });
    };
    ActivityToProjectComponent.prototype.insertActivityByProject = function () {
        var _this = this;
        this.taskManager.insertActivityByProject(this.activity, this.projectId).then(function (response) {
            var message = {
                'tipo': 'Registro: ',
                'message': 'La actividad se agregó satisfactoriamente',
                'style': 'alert-success'
            };
            _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            _this.activity = new activity_1.Activity();
            _this.getActivitiesByIdProject();
        }, function (reason) {
            var message = {
                'tipo': 'Error: ',
                'message': 'El proyecto no se pudo agregar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        });
    };
    ActivityToProjectComponent.prototype.deleteActivity = function (idActivity) {
        var _this = this;
        this.taskManager.deleteActivity(idActivity).then(function (response) {
            var message = {
                'tipo': 'Eliminado Satisfactoriamente: ',
                'message': 'Actividad eliminada',
                'style': 'alert-success'
            };
            _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            _this.getActivitiesByIdProject();
        }, function (reason) {
            var message = {
                'tipo': 'Error: ',
                'message': 'No se logró borrar el proyecto',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        });
    };
    return ActivityToProjectComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ActivityToProjectComponent.prototype, "projectId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ActivityToProjectComponent.prototype, "projectName", void 0);
ActivityToProjectComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-activity-to-project',
        templateUrl: './activity-to-project-component.html',
        styleUrls: ['./activity-to-project-component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        router_1.ActivatedRoute,
        roles_manager_1.RolesManager,
        messaging_service_1.MessagingService])
], ActivityToProjectComponent);
exports.ActivityToProjectComponent = ActivityToProjectComponent;
//# sourceMappingURL=activity-to-project-component.js.map