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
var router_1 = require("@angular/router");
var procedure_1 = require("../../../data/model/procedure");
var ViewsComandoComponent = (function (_super) {
    __extends(ViewsComandoComponent, _super);
    function ViewsComandoComponent(proceduresManager, messagingService, tasksManager, router, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.messagingService = messagingService;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.aportes = [];
        _this.filter = '0';
        _this.asociadoModel = '0';
        _this.asociado = [];
        _this.programs = [];
        _this.procedure = new procedure_1.Procedure();
        _this.activity_id = '0';
        return _this;
    }
    ViewsComandoComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.getUserRoles(this);
        this.getAportes();
        this.getAsociados();
        this.getPrograms();
    };
    ViewsComandoComponent.prototype.getAsociados = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.tasksManager.getAllAssociated()
                .then(function (assosiated) {
                _this.asociado = assosiated;
                resolve();
            });
        });
    };
    ViewsComandoComponent.prototype.deleteTask = function (task) {
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
    ViewsComandoComponent.prototype.getAportes = function () {
        /*this.aportes = [
          {'id': '1', 'associated': 'PDV', 'project': 'Proyecto', 'program': 'Programa', 'activity': 'Actividad', 'budget': '$ 1.000.000'},
          {'id': '2', 'associated': 'PDV', 'project': 'Proyecto', 'program': 'Programa', 'activity': 'Actividad', 'budget': '$ 1.000.000'}
          ];*/
        var _this = this;
        this.tasksManager.getAllAportes()
            .then(function (aportes) {
            _this.aportes = aportes;
        });
    };
    ViewsComandoComponent.prototype.routerLink = function (id) {
        var link = ['/app/edit-aporte/' + id];
        this.router.navigate(link);
    };
    ViewsComandoComponent.prototype.routerLinkAporte = function (id) {
        var link = ['/app/traslate-aporte/' + id];
        this.router.navigate(link);
    };
    ViewsComandoComponent.prototype.getProgramProjects = function (program) {
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
    ViewsComandoComponent.prototype.getProjectActivities = function (project) {
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
    ViewsComandoComponent.prototype.setObjectActive = function (activity) {
        this.activity_id = activity.id + '';
    };
    ViewsComandoComponent.prototype.getPrograms = function () {
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
    ViewsComandoComponent.prototype.changeFilter = function () {
        this.asociadoModel = '0';
        this.activity_id = '0';
    };
    ViewsComandoComponent.prototype.getFilterAportes = function () {
        var _this = this;
        if (this.isValidFilter()) {
            var objeto = {
                'directive_filter': this.filter,
                'id_objeto': (this.filter === '1') ? this.asociadoModel : (this.filter === '2') ? this.activity_id : ''
            };
            this.tasksManager.filterAporte(objeto)
                .then(function (objetoFilter) {
                _this.aportes = objetoFilter.detail;
            });
            //// console.log(objeto);
        }
    };
    ViewsComandoComponent.prototype.isValidFilter = function () {
        if (this.filter === '0') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona el tipo de Filtro',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.filter === '1' && this.asociadoModel === '0') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona un asociado para filtar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.filter === '2' && this.activity_id === '0') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona una actividad para filtrar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    ViewsComandoComponent.prototype.getPercent = function (total, cantidad) {
        var percent;
        if (cantidad === null) {
            cantidad = 0;
        }
        if (total === null || Number(total) === 0) {
            return 0 + '%';
        }
        else {
            percent = (Number(cantidad) * 100) / Number(total);
            return percent.toFixed(2) + '%';
        }
    };
    ViewsComandoComponent.prototype.getSustract = function (maximo, minimum, paid) {
        var result;
        result = (Number(maximo) - Number(minimum)) - Number(paid);
        return result;
    };
    ViewsComandoComponent.prototype.getSum = function (maximo, minimum) {
        var result;
        result = Number(maximo) + Number(minimum);
        return result;
    };
    return ViewsComandoComponent;
}(base_component_1.BaseComponent));
ViewsComandoComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-comando',
        templateUrl: './views-comando.component.html',
        styleUrls: ['./views-comando.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        messaging_service_1.MessagingService,
        tasks_manager_1.TasksManager,
        router_1.Router,
        roles_manager_1.RolesManager])
], ViewsComandoComponent);
exports.ViewsComandoComponent = ViewsComandoComponent;
//# sourceMappingURL=views-comando.component.js.map