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
var messaging_service_1 = require("../../../data/services/messaging.service");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var create_pool_of_contracts_component_1 = require("../create-pool-of-contracts/create-pool-of-contracts.component");
var pool_of_contracts_manager_1 = require("../../../data/managers/pool-of-contracts.manager");
var mapping_utils_1 = require("../../../data/utils/mapping.utils");
var ViewPoolOfContractsComponent = (function (_super) {
    __extends(ViewPoolOfContractsComponent, _super);
    function ViewPoolOfContractsComponent(messagingService, proceduresManager, poolOfContractsManager, router, rolesManager, activatedRoute) {
        var _this = _super.call(this, messagingService, proceduresManager, poolOfContractsManager, router, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.poolOfContractsManager = poolOfContractsManager;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.activatedRoute = activatedRoute;
        return _this;
    }
    ViewPoolOfContractsComponent.prototype.onDataLoaded = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.poolOfContractsManager.getObjectForEdit(String(id))
                    .then(function (object) {
                    _this.poolOfContracts = object;
                    _this.mapPoolObjects();
                });
            }
            else {
                var link = ['/app/pools-of-contracts'];
                _this.router.navigate(link);
            }
        });
    };
    ViewPoolOfContractsComponent.prototype.mapPoolObjects = function () {
        var component = this;
        if (this.poolOfContracts.pool_by_process) {
            this.poolOfContracts.pool_by_process.forEach(function (procedure) {
                component.procedures.forEach(function (componentProcedure) {
                    if (componentProcedure.id === procedure.process_id) {
                        componentProcedure.selected = true;
                        componentProcedure.budget.push(mapping_utils_1.MappingUtils.mapPoolOfContractsActionToBudget(procedure));
                    }
                });
            });
        }
    };
    ViewPoolOfContractsComponent.prototype.updatePoolOfContracts = function () {
    };
    return ViewPoolOfContractsComponent;
}(create_pool_of_contracts_component_1.CreatePoolOfContractsComponent));
ViewPoolOfContractsComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-view-pools-of-contracts',
        templateUrl: './view-pool-of-contracts.component.html',
        styleUrls: ['./view-pool-of-contracts.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        pool_of_contracts_manager_1.PoolOfContractsManager,
        router_1.Router,
        roles_manager_1.RolesManager,
        router_1.ActivatedRoute])
], ViewPoolOfContractsComponent);
exports.ViewPoolOfContractsComponent = ViewPoolOfContractsComponent;
//# sourceMappingURL=view-pool-of-contracts.component.js.map