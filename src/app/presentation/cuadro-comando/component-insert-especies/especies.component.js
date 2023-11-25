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
var messaging_service_1 = require("../../../data/services/messaging.service");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var aporteEspecie_1 = require("../../../data/model/aporteEspecie");
var EspeciesComponent = (function (_super) {
    __extends(EspeciesComponent, _super);
    function EspeciesComponent(messagingService, proceduresManager, cuencaVerdeService, tasksManager, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.cuencaVerdeService = cuencaVerdeService;
        _this.tasksManager = tasksManager;
        _this.rolesManager = rolesManager;
        _this.notify = new core_1.EventEmitter();
        _this.especie = new aporteEspecie_1.AporteEspecie();
        _this.listadoEspecies = [];
        _this.totalEspecies = 0;
        return _this;
    }
    EspeciesComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        if (this.listadoE != null) {
            this.listadoEspecies = this.listadoE;
        }
    };
    EspeciesComponent.prototype.removeItem = function (index, id) {
        this.listadoEspecies.splice(index, 1);
        /*this.tasksManager.deleteMetas(id)
          .then((response: any) => {
            this.getListadoMetas();
          });*/
    };
    EspeciesComponent.prototype.formatSpecific = function (data, id) {
        // decimal format
        var result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
        //// this.datosCosto.coste = result;
        if (id === 1) {
            $('#unidadPrecio').val(result);
        }
    };
    EspeciesComponent.prototype.insertarEspecie = function () {
        if (this.isValidMetas()) {
            this.listadoEspecies.push(this.especie);
            this.especie = {};
            this.getTotal();
            var objeto = {
                'total': this.totalEspecies,
                'listado': this.listadoEspecies
            };
            this.notify.emit({ id: this.getId(), payload: objeto });
            /* this.tasksManager.crearMetas(this.metas)
               .then(() => {
                 const message = {
                   'tipo': 'Meta Registrada ',
                   'message': ' satisfactoriamente',
                   'style': 'alert-success'
                 };
                 this.messagingService.publish(new BusMessage('alerta', message));
                 this.getListadoMetas();
                 this.metas = <MetasAporte> {};
                 this.metas.contributions_id = this.aporteId;
            });*/
        }
    };
    EspeciesComponent.prototype.getTotal = function () {
        this.totalEspecies = 0;
        var componente = this;
        this.listadoEspecies.forEach(function (especie) {
            componente.totalEspecies = componente.totalEspecies + (Number(especie.price_unit.replace('.', '')) * Number(especie.quantity));
        });
        return componente.totalEspecies;
    };
    EspeciesComponent.prototype.isValidMetas = function () {
        if (this.especie.quantity === '' || this.especie.quantity === null || this.especie.quantity === undefined ||
            Number(this.especie.quantity) === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la cantidad del aporte a registrar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.especie.price_unit === '' || this.especie.price_unit === null || this.especie.price_unit === undefined) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el precio por unidad del aporte a registrar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.especie.description === '' || this.especie.description === null || this.especie.description === undefined) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la descripción del aporte a registrar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    return EspeciesComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EspeciesComponent.prototype, "listadoE", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EspeciesComponent.prototype, "notify", void 0);
EspeciesComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-especies',
        templateUrl: './especies.component.html',
        styleUrls: ['./especies.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        cuenca_verde_service_1.CuencaVerdeService,
        tasks_manager_1.TasksManager,
        roles_manager_1.RolesManager])
], EspeciesComponent);
exports.EspeciesComponent = EspeciesComponent;
//# sourceMappingURL=especies.component.js.map