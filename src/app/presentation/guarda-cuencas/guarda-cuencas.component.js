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
var guarda_cuenca_1 = require("../../data/model/guarda-cuenca");
var messaging_service_1 = require("../../data/services/messaging.service");
var cuenca_verde_service_1 = require("../../data/services/cuenca-verde.service");
var roles_manager_1 = require("../../data/managers/roles.manager");
var GuardacuencasComponent = (function (_super) {
    __extends(GuardacuencasComponent, _super);
    function GuardacuencasComponent(cuencaVerdeServices, messagingService, proceduresManager, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.cuencaVerdeServices = cuencaVerdeServices;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.rolesManager = rolesManager;
        _this.modelGuarda = '0';
        _this.roles = [];
        _this.users = [];
        _this.cuotas = [];
        return _this;
    }
    GuardacuencasComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.selectedGuardacuenca = new guarda_cuenca_1.GuardaCuenca();
        this.selectedGuardacuenca.monthlyQuota = [];
        this.getRoles()
            .then(this.getGuardacuencas);
    };
    GuardacuencasComponent.prototype.ngOnDestroy = function () {
    };
    GuardacuencasComponent.prototype.getRoles = function () {
        var _this = this;
        var component = this;
        return new Promise(function (resolve) {
            _this.rolesManager.getAllRoles()
                .then(function (roles) {
                _this.roles = roles;
                resolve(component);
            });
        });
    };
    GuardacuencasComponent.prototype.getGuardacuencas = function (component) {
        var componente = this;
        component.proceduresManager.getUsers(component.GUARDACUENCA)
            .then(function (users) {
            component.users = users;
            component.users.forEach(function (item) {
                component.quoteId(item.id);
            });
        });
    };
    GuardacuencasComponent.prototype.quoteId = function (id) {
        var _this = this;
        this.cuencaVerdeServices.getGuardaCuencaMonthlyQuota(id)
            .then(function (response) {
            _this.selectedGuardacuenca.monthlyQuota[id] = response.quota;
        });
    };
    GuardacuencasComponent.prototype.saveGuardaCuenca = function (idG) {
        var _this = this;
        if (this.validQuote(idG)) {
            this.cuencaVerdeServices.updateGuardaCuencaMonthlyQuota(idG, this.selectedGuardacuenca.monthlyQuota[idG])
                .then(function () {
                var message = {
                    'tipo': 'Actualizada: ',
                    'message': 'Cuota Mensual del GuardaCuencas actualizada Satisfactoriamente',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            });
        }
    };
    GuardacuencasComponent.prototype.validQuote = function (idG) {
        if (String(this.selectedGuardacuenca.monthlyQuota[idG]) === '0' || this.selectedGuardacuenca.monthlyQuota[idG] === ''
            || this.selectedGuardacuenca.monthlyQuota[idG] === undefined ||
            this.selectedGuardacuenca.monthlyQuota[idG] === null) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona la cuota para asignar',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    return GuardacuencasComponent;
}(base_component_1.BaseComponent));
GuardacuencasComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-guarda-cuencas',
        templateUrl: './guarda-cuencas.component.html',
        styleUrls: ['./guarda-cuencas.component.css']
    }),
    __metadata("design:paramtypes", [cuenca_verde_service_1.CuencaVerdeService,
        messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        roles_manager_1.RolesManager])
], GuardacuencasComponent);
exports.GuardacuencasComponent = GuardacuencasComponent;
//# sourceMappingURL=guarda-cuencas.component.js.map