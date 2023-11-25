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
var base_component_1 = require("../base-component/base-component");
var procedures_manager_1 = require("../../data/managers/procedures.manager");
var tasks_manager_1 = require("../../data/managers/tasks.manager");
var router_1 = require("@angular/router");
var roles_manager_1 = require("../../data/managers/roles.manager");
var task_1 = require("../../data/model/task");
var messaging_service_1 = require("../../data/services/messaging.service");
var MonitoreosComponent = (function (_super) {
    __extends(MonitoreosComponent, _super);
    function MonitoreosComponent(proceduresManager, tasksManager, router, activatedRoute, rolesManager, messagingService) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.rolesManager = rolesManager;
        _this.messagingService = messagingService;
        _this.notify = new core_1.EventEmitter();
        _this.monitoreos = [];
        _this.types_monitoreos = []; // TODO Change for MonitoreoTypes
        return _this;
    }
    MonitoreosComponent.prototype.ngOnInit = function () {
        this.monitoreo = {};
        this.monitoreo.task_id = this.task.id;
        this.getTypeMonitoreos();
        this.getMonitoreos();
    };
    MonitoreosComponent.prototype.insertarMonitoreo = function () {
        var _this = this;
        if (this.validarMonitor()) {
            this.tasksManager.crearMonitor(this.monitoreo)
                .then(function () {
                var message = {
                    'tipo': 'Monitoreo Registrado ',
                    'message': ' satisfactoriamente',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                _this.getMonitoreos();
                _this.monitoreo = {};
            });
        }
        else {
            var message = {
                'tipo': 'Error al Registrar Monitoreo ',
                'message': ' se requieren todos los campos',
                'style': 'alert-warning'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        }
    };
    MonitoreosComponent.prototype.getMonitoreos = function () {
        var _this = this;
        this.tasksManager.getMonitoreos(String(this.task.id))
            .then(function (monitoreos) {
            if (monitoreos instanceof Array) {
                _this.monitoreos = monitoreos;
                _this.notify.emit({ id: _this.getId(), payload: _this.monitoreos });
            }
        });
    };
    MonitoreosComponent.prototype.getTypeMonitoreos = function () {
        var _this = this;
        this.tasksManager.getTypeMonitor()
            .then(function (typeMonitor) {
            _this.types_monitoreos = typeMonitor;
        });
    };
    MonitoreosComponent.prototype.removeItem = function (index, id) {
        var _this = this;
        this.monitoreos.splice(index, 1);
        this.tasksManager.deleteMonitoreos(id)
            .then(function (response) {
            _this.getMonitoreos();
        });
    };
    MonitoreosComponent.prototype.validarMonitor = function () {
        if (this.monitoreo.type + '' === '0' || this.monitoreo.type === undefined || this.monitoreo.type === null) {
            return false;
        }
        if (this.monitoreo.date_start + '' === '0' || this.monitoreo.date_start === undefined || this.monitoreo.date_start === null) {
            return false;
        }
        if (this.monitoreo.date_deadline + '' === '0' || this.monitoreo.date_deadline === undefined || this.monitoreo.date_deadline === null) {
            return false;
        }
        if (this.monitoreo.comment === '' || this.monitoreo.comment === undefined || this.monitoreo.comment === null) {
            return false;
        }
        return true;
    };
    MonitoreosComponent.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return MonitoreosComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", task_1.Task)
], MonitoreosComponent.prototype, "task", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MonitoreosComponent.prototype, "notify", void 0);
MonitoreosComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-monitoreos-component',
        templateUrl: './monitoreos.component.html',
        styleUrls: ['./monitoreos.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        router_1.ActivatedRoute,
        roles_manager_1.RolesManager,
        messaging_service_1.MessagingService])
], MonitoreosComponent);
exports.MonitoreosComponent = MonitoreosComponent;
//# sourceMappingURL=monitoreos.component.js.map