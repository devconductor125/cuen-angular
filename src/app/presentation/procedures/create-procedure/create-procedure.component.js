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
var router_1 = require("@angular/router");
var base_component_1 = require("../../base-component/base-component");
var messaging_service_1 = require("../../../data/services/messaging.service");
var procedure_1 = require("../../../data/model/procedure");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var CreateProcedureComponent = (function (_super) {
    __extends(CreateProcedureComponent, _super);
    function CreateProcedureComponent(messagingService, proceduresManager, router, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.programs = [];
        _this.procedure = new procedure_1.Procedure();
        return _this;
    }
    CreateProcedureComponent.prototype.ngOnInit = function () {
        var component = this;
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.proceduresManager.loadAllObjects()
            .then(function () {
            component.getPrograms()
                .then(function () { return component.onDataLoaded(); });
        });
    };
    CreateProcedureComponent.prototype.getPrograms = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.proceduresManager.getPrograms()
                .then(function (programs) {
                _this.programs = programs;
                resolve();
            });
        });
    };
    CreateProcedureComponent.prototype.getProjects = function (program) {
        program.selected = !program.selected;
        var component = this;
        if (program.selected) {
            this.proceduresManager.getProgramProjects(program.id)
                .then(function (projects) {
                component.programs.forEach(function (localProgram) {
                    if (localProgram.name === program.name) {
                        localProgram.projects = projects;
                        component.mapProjectObjects(localProgram.projects);
                    }
                });
            });
        }
        else {
            component.programs.forEach(function (localProgram) {
                if (localProgram.name === program.name) {
                    localProgram.projects = null;
                }
            });
        }
    };
    CreateProcedureComponent.prototype.mapProjectObjects = function (projects) {
    };
    CreateProcedureComponent.prototype.getActivities = function (project) {
        project.selected = !project.selected;
        var component = this;
        if (project.selected) {
            this.proceduresManager.getProjectActivities(project.id)
                .then(function (activities) {
                project.activities = activities;
                component.mapProjectActivities(project.activities);
            });
        }
        else {
            project.activities = null;
        }
    };
    CreateProcedureComponent.prototype.mapProjectActivities = function (activities) {
    };
    CreateProcedureComponent.prototype.onDataLoaded = function () {
    };
    CreateProcedureComponent.prototype.setObjectActive = function (activity) {
        activity.selected = !activity.selected;
    };
    CreateProcedureComponent.prototype.saveProcedure = function () {
        var _this = this;
        this.setProcedureActivities();
        if (this.isValidProcedure()) {
            this.proceduresManager.create(this.procedure)
                .then(function (result) {
                if (result) {
                    var message = {
                        'tipo': 'Registrado',
                        'message': 'El procedimiento ha sido registrado satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/procedures'];
                    _this.router.navigate(link);
                }
            });
        }
    };
    CreateProcedureComponent.prototype.setProcedureActivities = function () {
        var component = this;
        this.procedure.activities = [];
        this.programs.forEach(function (program) {
            if (program.projects) {
                program.projects.forEach(function (project) {
                    if (project.activities) {
                        project.activities.forEach(function (activity) {
                            if (activity.selected) {
                                component.procedure.activities.push(activity);
                            }
                        });
                    }
                });
            }
        });
    };
    CreateProcedureComponent.prototype.isValidProcedure = function () {
        if (!this.procedure.name || this.procedure.name.length === 0) {
            alert('Ingresa el nombre del proyecto.');
            return false;
        }
        if (!this.procedure.description) {
            alert('Ingresa la descripción.');
            return false;
        }
        if (this.procedure.activities.length === 0) {
            alert('Selecciona una o más actividades.');
            return false;
        }
        return true;
    };
    return CreateProcedureComponent;
}(base_component_1.BaseComponent));
CreateProcedureComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-create-procedure',
        templateUrl: './create-procedure.component.html',
        styleUrls: ['./create-procedure.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        router_1.Router,
        roles_manager_1.RolesManager])
], CreateProcedureComponent);
exports.CreateProcedureComponent = CreateProcedureComponent;
//# sourceMappingURL=create-procedure.component.js.map