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
var TraslateAporteComponent = (function (_super) {
    __extends(TraslateAporteComponent, _super);
    function TraslateAporteComponent(messagingService, proceduresManager, router, activatedRoute, tasksManager, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.tasksManager = tasksManager;
        _this.rolesManager = rolesManager;
        _this.programs = [];
        _this.procedure = new procedure_1.Procedure();
        _this.aporteTraslado = new aporte_1.Aporte();
        return _this;
    }
    TraslateAporteComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.getAporte();
        this.getPrograms();
    };
    TraslateAporteComponent.prototype.getAporte = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.tasksManager.getAporteForId(String(id))
                    .then(function (object) {
                    _this.aporte = object;
                    _this.aporteTemp = Number(_this.aporte.budget);
                });
            }
            else {
                var link = ['/app/comando'];
                _this.router.navigate(link);
            }
        });
    };
    TraslateAporteComponent.prototype.traslateAporte = function () {
        var _this = this;
        if (this.isValidTraslate()) {
            var objeto = {
                'id': this.aporte.id, 'budget_traslate': this.aporteTraslado.aporte,
                'activity_traslate': this.aporteTraslado.activity_id
            };
            ////console.log(objeto);
            this.tasksManager.traslateAporte(objeto)
                .then(function (result) {
                if (result) {
                    var message = {
                        'tipo': 'Traslado Exitoso',
                        'message': 'El aporte ha sido trasladado satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/comando'];
                    _this.router.navigate(link);
                }
            });
        }
    };
    TraslateAporteComponent.prototype.getProgramProjects = function (program) {
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
    TraslateAporteComponent.prototype.getProjectActivities = function (project) {
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
    TraslateAporteComponent.prototype.getPrograms = function () {
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
    TraslateAporteComponent.prototype.onChange = function (aporteValue) {
        this.aporteTemp = Number(this.aporte.budget) - Number(this.aporteTraslado.aporte);
    };
    TraslateAporteComponent.prototype.setObjectActive = function (activity) {
        this.aporteTraslado.activity_id = activity.id + '';
    };
    TraslateAporteComponent.prototype.isValidTraslate = function () {
        if (this.aporteTraslado.aporte === '' || this.aporteTraslado.aporte === null || this.aporteTraslado.aporte === undefined ||
            Number(this.aporteTraslado.aporte) === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el aporte que se le trasladará a la actividad seleccionada',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (Number(this.aporteTraslado.aporte) > Number(this.aporte.budget)) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Nop cuenta con dicha cantidad para transferir',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.aporteTraslado.activity_id === '' || this.aporteTraslado.activity_id === null
            || this.aporteTraslado.activity_id === undefined) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona la actividad',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    return TraslateAporteComponent;
}(base_component_1.BaseComponent));
TraslateAporteComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-traslate-aporte',
        templateUrl: './traslate-aporte.component.html',
        styleUrls: ['./traslate-aporte.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        router_1.Router,
        router_1.ActivatedRoute,
        tasks_manager_1.TasksManager,
        roles_manager_1.RolesManager])
], TraslateAporteComponent);
exports.TraslateAporteComponent = TraslateAporteComponent;
//# sourceMappingURL=traslate-aporte.component.js.map