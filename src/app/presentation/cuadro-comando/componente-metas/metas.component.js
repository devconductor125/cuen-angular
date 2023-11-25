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
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var metasAporte_1 = require("../../../data/model/metasAporte");
var messaging_service_1 = require("../../../data/services/messaging.service");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var MetasComponent = (function (_super) {
    __extends(MetasComponent, _super);
    function MetasComponent(messagingService, proceduresManager, cuencaVerdeService, tasksManager, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.cuencaVerdeService = cuencaVerdeService;
        _this.tasksManager = tasksManager;
        _this.rolesManager = rolesManager;
        _this.notify = new core_1.EventEmitter();
        _this.metas = new metasAporte_1.MetasAporte();
        _this.listadoMetas = [];
        return _this;
    }
    MetasComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.getListadoMetas();
        this.metas.contributions_id = this.aporteId;
    };
    MetasComponent.prototype.getListadoMetas = function () {
        var _this = this;
        this.tasksManager.getAllMetas()
            .then(function (metas) {
            _this.listadoMetas = metas;
        });
    };
    MetasComponent.prototype.removeItem = function (index, id) {
        this.listadoMetas.splice(index, 1);
        /*this.tasksManager.deleteMetas(id)
          .then((response: any) => {
            this.getListadoMetas();
          });*/
    };
    MetasComponent.prototype.insertarMeta = function () {
        var _this = this;
        if (this.isValidMetas()) {
            this.tasksManager.crearMetas(this.metas)
                .then(function () {
                var message = {
                    'tipo': 'Meta Registrada ',
                    'message': ' satisfactoriamente',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                _this.getListadoMetas();
                _this.metas = {};
                _this.metas.contributions_id = _this.aporteId;
            });
        }
    };
    MetasComponent.prototype.isValidMetas = function () {
        if (this.metas.quantity === '' || this.metas.quantity === null || this.metas.quantity === undefined ||
            Number(this.metas.quantity) === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la cantidad de la meta a registrar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.metas.unit === '' || this.metas.unit === null || this.metas.unit === undefined) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la unidad de la meta a registrar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.metas.description === '' || this.metas.description === null || this.metas.description === undefined) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la descripción de la meta a registrar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    return MetasComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MetasComponent.prototype, "aporteId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MetasComponent.prototype, "notify", void 0);
MetasComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-metas',
        templateUrl: './metas.component.html',
        styleUrls: ['./metas.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        cuenca_verde_service_1.CuencaVerdeService,
        tasks_manager_1.TasksManager,
        roles_manager_1.RolesManager])
], MetasComponent);
exports.MetasComponent = MetasComponent;
//# sourceMappingURL=metas.component.js.map