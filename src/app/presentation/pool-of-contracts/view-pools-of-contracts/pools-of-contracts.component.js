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
var roles_manager_1 = require("../../../data/managers/roles.manager");
var pool_of_contracts_manager_1 = require("../../../data/managers/pool-of-contracts.manager");
var PoolsOfContractsComponent = (function (_super) {
    __extends(PoolsOfContractsComponent, _super);
    function PoolsOfContractsComponent(proceduresManager, rolesManager, poolOfContractsManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.rolesManager = rolesManager;
        _this.poolOfContractsManager = poolOfContractsManager;
        return _this;
    }
    PoolsOfContractsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.poolOfContractsManager.loadAllObjects()
            .then(function (pools) {
            if (pools instanceof Array) {
                _this.pools = pools;
            }
        });
        this.getUserRoles(this);
    };
    return PoolsOfContractsComponent;
}(base_component_1.BaseComponent));
PoolsOfContractsComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-pools-of-contracts',
        templateUrl: './pools-of-contracts.component.html',
        styleUrls: ['./pools-of-contracts.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        roles_manager_1.RolesManager,
        pool_of_contracts_manager_1.PoolOfContractsManager])
], PoolsOfContractsComponent);
exports.PoolsOfContractsComponent = PoolsOfContractsComponent;
//# sourceMappingURL=pools-of-contracts.component.js.map