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
var base_component_1 = require("../../base-component/base-component");
var messaging_service_1 = require("../../../data/services/messaging.service");
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var contractors_manager_1 = require("../../../data/managers/contractors.manager");
var router_1 = require("@angular/router");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var CreateTareaEjecucionComponent = (function (_super) {
    __extends(CreateTareaEjecucionComponent, _super);
    function CreateTareaEjecucionComponent(messagingService, proceduresManager, contractorsManager, router, rolesManager, tasksManager, activatedRoute, ref) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.contractorsManager = contractorsManager;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.tasksManager = tasksManager;
        _this.activatedRoute = activatedRoute;
        _this.ref = ref;
        _this.listTask = [];
        return _this;
    }
    CreateTareaEjecucionComponent.prototype.ngOnInit = function () {
        this.getTaskForExecution();
        this.task = {
            title: '',
            description: '',
            startdate: '',
            deadline: '',
            pool_contractor_id: ''
        };
    };
    CreateTareaEjecucionComponent.prototype.isValidMonitoreo = function () {
        return false;
    };
    CreateTareaEjecucionComponent.prototype.getTaskForExecution = function () {
        var _this = this;
        this.tasksManager.getTaskForExecution()
            .then(function (response) {
            _this.listTask = response;
            console.log(_this.listTask);
        });
    };
    CreateTareaEjecucionComponent.prototype.guardar = function () {
        var _this = this;
        var componente = this;
        ///console.log(this.task);
        if (this.isValidTask()) {
            console.log(this.task);
            this.tasksManager.crearExecutionTask(this.task)
                .then(function () {
                var message = {
                    'tipo': 'Tarea de Ejecución Registrada ',
                    'message': ' satisfactoriamente.',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                var link = ['/app/tareas-ejecucion'];
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
    CreateTareaEjecucionComponent.prototype.isValidTask = function () {
        if (!this.task.title || this.task.title.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el título de la tarea',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.task.description || this.task.description.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la descripción de la tarea',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.task.startdate === '') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingrese la fecha de Inicio',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.task.deadline === '') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingrese la fecha de Culminación',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.task.pool_contractor_id === '') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Seleccione una Tarea a Ejecutar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    return CreateTareaEjecucionComponent;
}(base_component_1.BaseComponent));
CreateTareaEjecucionComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-create-ejecucion',
        templateUrl: './create-tarea-ejecucion.component.html',
        styleUrls: ['./create-tarea-ejecucion.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        contractors_manager_1.ContractorsManager,
        router_1.Router,
        roles_manager_1.RolesManager,
        tasks_manager_1.TasksManager,
        router_1.ActivatedRoute,
        core_1.ChangeDetectorRef])
], CreateTareaEjecucionComponent);
exports.CreateTareaEjecucionComponent = CreateTareaEjecucionComponent;
//# sourceMappingURL=create-tarea-ejecucion.component.js.map