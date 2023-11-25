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
var aporte_1 = require("../../../data/model/aporte");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var CreateAporteComponent = (function (_super) {
    __extends(CreateAporteComponent, _super);
    function CreateAporteComponent(messagingService, proceduresManager, router, tasksManager, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.router = router;
        _this.tasksManager = tasksManager;
        _this.rolesManager = rolesManager;
        _this.programs = [];
        _this.procedure = new procedure_1.Procedure();
        _this.aporte = new aporte_1.Aporte();
        _this.asociado = [];
        _this.tipoAporte = [{ 'id': '1', 'name': 'Dinero' }, { 'id': '2', 'name': 'Especies' }, { 'id': '3', 'name': 'Ambos' }];
        return _this;
    }
    CreateAporteComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.getPrograms();
        this.aporte.asociado_id = '0';
        this.aporte.type = '0';
        this.getAsociados();
    };
    CreateAporteComponent.prototype.getPrograms = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.proceduresManager.getPrograms()
                .then(function (programs) {
                if (programs[0].id !== 0) {
                    var placeholder = _this.getCustomPlaceholder('Selecciona un programa');
                    programs.unshift(placeholder);
                }
                _this.programs = programs;
                _this.procedure.program = programs[0];
                resolve();
            });
        });
    };
    CreateAporteComponent.prototype.getAsociados = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.tasksManager.getAllAssociated()
                .then(function (assosiated) {
                _this.asociado = assosiated;
                resolve();
            });
        });
    };
    CreateAporteComponent.prototype.getProgramProjects = function (program) {
        var _this = this;
        var component = this;
        if (program.id === '0') {
            this.projects = null;
            this.activities = null;
            return;
        }
        this.proceduresManager.getProgramProjects(program.id)
            .then(function (projects) {
            var placeholder = _this.getCustomPlaceholder('Selecciona un proyecto');
            projects.unshift(placeholder);
            _this.projects = projects;
            if (!_this.procedure.id) {
                _this.procedure.project = placeholder;
            }
            _this.projects.forEach(function (project) {
                if (project.id === component.procedure.project.id) {
                    component.procedure.project = project;
                    component.getProjectActivities(project);
                }
            });
        });
    };
    CreateAporteComponent.prototype.formatSpecific = function (data, id) {
        // decimal format
        var result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
        //// this.datosCosto.coste = result;
        if (id === 1) {
            $('#aporteAsociado').val(result);
        }
    };
    CreateAporteComponent.prototype.getProjectActivities = function (project) {
        var component = this;
        if (project.id === 0) {
            this.activities = null;
            return;
        }
        this.proceduresManager.getProjectActivities(project.id)
            .then(function (activities) {
            if (component.procedure.activities) {
                activities.forEach(function (activity) {
                    component.procedure.activities.forEach(function (procedureActivity) {
                        if (activity.id === Number(procedureActivity.id)) {
                            activity.selected = true;
                        }
                    });
                });
            }
            component.activities = activities;
            component.procedure.activities = null;
        });
    };
    CreateAporteComponent.prototype.onDataLoaded = function () {
    };
    CreateAporteComponent.prototype.setObjectActive = function (activity) {
        this.aporte.activity_id = activity.id + '';
    };
    CreateAporteComponent.prototype.saveAporte = function () {
        var _this = this;
        var componente = this;
        if (this.isValidProcedure()) {
            if (this.aporte.type === '1') {
                this.aporte.budget_species = '0';
            }
            if (this.aporte.type === '2') {
                this.aporte.aporte = '0';
            }
            this.tasksManager.insertAssociated(this.aporte)
                .then(function (result) {
                var message = {
                    'tipo': 'Registrado',
                    'message': 'El aporte ha sido registrado satisfactoriamente',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                var link = ['/app/comando'];
                _this.router.navigate(link);
            }, function (reason) {
                ////console.log(reason);
                var message = {
                    'tipo': 'Error',
                    'message': reason,
                    'style': 'alert-danger'
                };
                componente.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            });
        }
    };
    CreateAporteComponent.prototype.getArrayEspecies = function ($event) {
        this.aporte.budget_species = $event.payload.total;
        this.aporte.species_contribution = $event.payload.listado;
    };
    CreateAporteComponent.prototype.isValidProcedure = function () {
        if (this.aporte.activity_id === '' || this.aporte.activity_id === null || this.aporte.activity_id === undefined) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona la actividad',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (Number(this.aporte.asociado_id) <= 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona un asociado',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.aporte.type === '0') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona el tipo de aporte que se le asignará a la actividad',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.aporte.type === '1' && this.aporte.aporte === '' || this.aporte.type === '1' && this.aporte.aporte === null ||
            this.aporte.type === '1' && this.aporte.aporte === undefined) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el aporte que se le asignará a la actividad',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.aporte.type === '2' && this.aporte.budget_species === '' || this.aporte.type === '2' && this.aporte.budget_species === null ||
            this.aporte.type === '2' && this.aporte.budget_species === undefined) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el aporte en especies que se le asignará a la actividad',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.aporte.type === '3') {
            if (this.aporte.aporte === '' || this.aporte.aporte === null || this.aporte.aporte === undefined) {
                var message = {
                    'tipo': 'Error: ',
                    'message': 'Ingresa el aporte en dinero que se le asignará a la actividad',
                    'style': 'alert-danger'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                return false;
            }
            if (this.aporte.budget_species === '' || this.aporte.budget_species === null || this.aporte.budget_species === undefined) {
                var message = {
                    'tipo': 'Error: ',
                    'message': 'Ingresa el aporte en especies que se le asignará a la actividad',
                    'style': 'alert-danger'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                return false;
            }
        }
        return true;
    };
    return CreateAporteComponent;
}(base_component_1.BaseComponent));
CreateAporteComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-create-aporte',
        templateUrl: './create-aporte.component.html',
        styleUrls: ['./create-aporte.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        router_1.Router,
        tasks_manager_1.TasksManager,
        roles_manager_1.RolesManager])
], CreateAporteComponent);
exports.CreateAporteComponent = CreateAporteComponent;
//# sourceMappingURL=create-aporte.component.js.map