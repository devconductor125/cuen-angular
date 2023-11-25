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
var project_1 = require("../../../data/model/project");
var ProjectToProgramComponent = (function (_super) {
    __extends(ProjectToProgramComponent, _super);
    function ProjectToProgramComponent(proceduresManager, taskManager, router, activatedRoute, rolesManager, messagingService) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.taskManager = taskManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.rolesManager = rolesManager;
        _this.messagingService = messagingService;
        _this.listProjects = [];
        _this.project = new project_1.Project();
        return _this;
    }
    ProjectToProgramComponent.prototype.ngOnInit = function () {
        //// this.getProjects();
    };
    ProjectToProgramComponent.prototype.regProject = function () {
        if (this.validarRegistro()) {
            ////this.insertProject();
            this.listProjects.push(this.project);
            this.project = new project_1.Project();
        }
    };
    ProjectToProgramComponent.prototype.validarRegistro = function () {
        if (!this.project.name || this.project.name.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el nombre del proyecto',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    ProjectToProgramComponent.prototype.getProjects = function () {
        var _this = this;
        this.taskManager.getListProjects(this.programId).then(function (response) {
            ///// console.log(response);
            if (response instanceof Array) {
                _this.listProjects = response;
            }
            else {
                _this.listProjects = [];
            }
            /// console.log(this.listObservation);
        });
    };
    ProjectToProgramComponent.prototype.insertProject = function () {
        var _this = this;
        this.taskManager.insertProject(this.project, this.programId).then(function (response) {
            var message = {
                'tipo': 'Registro: ',
                'message': 'El proyecto se agregó satisfactoriamente',
                'style': 'alert-success'
            };
            _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            _this.project = new project_1.Project();
            _this.getProjects();
        }, function (reason) {
            var message = {
                'tipo': 'Error: ',
                'message': 'El proyecto no se pudo agregar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        });
    };
    ProjectToProgramComponent.prototype.deleteProject = function (idProject) {
        var _this = this;
        this.taskManager.deleteProject(idProject).then(function (response) {
            var message = {
                'tipo': 'Eliminado Satisfactoriamente: ',
                'message': 'Proyecto eliminado',
                'style': 'alert-success'
            };
            _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            _this.getProjects();
        }, function (reason) {
            var message = {
                'tipo': 'Error: ',
                'message': 'No se logró borrar el proyecto',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        });
    };
    return ProjectToProgramComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ProjectToProgramComponent.prototype, "programId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ProjectToProgramComponent.prototype, "programName", void 0);
ProjectToProgramComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-project-to-program',
        templateUrl: './project-to-program-component.html',
        styleUrls: ['./project-to-program-component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        router_1.ActivatedRoute,
        roles_manager_1.RolesManager,
        messaging_service_1.MessagingService])
], ProjectToProgramComponent);
exports.ProjectToProgramComponent = ProjectToProgramComponent;
//# sourceMappingURL=project-to-program-component.js.map