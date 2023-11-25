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
var roles_manager_1 = require("../../../data/managers/roles.manager");
var pool_of_contracts_manager_1 = require("../../../data/managers/pool-of-contracts.manager");
var pool_of_contracts_1 = require("../../../data/model/pool-of-contracts");
var mapping_utils_1 = require("../../../data/utils/mapping.utils");
var CreatePoolOfContractsComponent = (function (_super) {
    __extends(CreatePoolOfContractsComponent, _super);
    function CreatePoolOfContractsComponent(messagingService, proceduresManager, poolOfContractsManager, router, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.poolOfContractsManager = poolOfContractsManager;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.poolOfContracts = new pool_of_contracts_1.PoolOfContracts();
        return _this;
    }
    CreatePoolOfContractsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.poolOfContractsManager.loadAllObjects();
        this.procedures = [];
        this.getProceduresWithActionsForPool()
            .then(function () { return _this.onDataLoaded(); });
    };
    CreatePoolOfContractsComponent.prototype.getProceduresWithActionsForPool = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.proceduresManager.getProceduresWithActionsForPool()
                .then(function (proceduresWithActionsForPool) {
                _this.procedures = proceduresWithActionsForPool;
                ////console.log(this.procedures);
                resolve();
            });
        });
    };
    CreatePoolOfContractsComponent.prototype.onDataLoaded = function () {
    };
    CreatePoolOfContractsComponent.prototype.savePoolOfContracts = function () {
        var _this = this;
        this.setPoolProcedures();
        if (this.isValidPool()) {
            this.poolOfContractsManager.create(this.poolOfContracts)
                .then(function (result) {
                if (result) {
                    var message = {
                        'tipo': 'Registrado',
                        'message': 'La bolsa presupuestal ha sido registrada satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/pools-of-contracts'];
                    _this.router.navigate(link);
                }
            });
        }
    };
    CreatePoolOfContractsComponent.prototype.setPoolProcedures = function () {
        var component = this;
        this.poolOfContracts.pool_by_process = [];
        this.procedures.forEach(function (procedure) {
            if (procedure.selected) {
                procedure.budget.forEach(function (budget) {
                    if (budget.selected) {
                        component.poolOfContracts.pool_by_process.push(mapping_utils_1.MappingUtils.budgetToPoolOfContractsAction(procedure.id, budget)); // TODO should be procedure.id
                    }
                });
            }
        });
    };
    CreatePoolOfContractsComponent.prototype.isValidPool = function () {
        if (!this.poolOfContracts.name || this.poolOfContracts.name.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el nombre de la bolsa presupuestal',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.poolOfContracts.hasBudgets()) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona una o más acciones',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    return CreatePoolOfContractsComponent;
}(base_component_1.BaseComponent));
CreatePoolOfContractsComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-create-pools-of-contracts',
        templateUrl: './create-pool-of-contracts.component.html',
        styleUrls: ['./create-pool-of-contracts.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        pool_of_contracts_manager_1.PoolOfContractsManager,
        router_1.Router,
        roles_manager_1.RolesManager])
], CreatePoolOfContractsComponent);
exports.CreatePoolOfContractsComponent = CreatePoolOfContractsComponent;
//# sourceMappingURL=create-pool-of-contracts.component.js.map