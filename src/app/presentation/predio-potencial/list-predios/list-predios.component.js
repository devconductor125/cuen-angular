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
var contractors_manager_1 = require("../../../data/managers/contractors.manager");
var router_1 = require("@angular/router");
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var ListPrediosComponent = (function (_super) {
    __extends(ListPrediosComponent, _super);
    function ListPrediosComponent(proceduresManager, rolesManager, contractorsManager, cuencaServices, router) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.rolesManager = rolesManager;
        _this.contractorsManager = contractorsManager;
        _this.cuencaServices = cuencaServices;
        _this.router = router;
        _this.predios = [];
        return _this;
    }
    ListPrediosComponent.prototype.ngOnInit = function () {
        this.getUserRoles(this);
        this.getPrediosPotenciales();
    };
    ListPrediosComponent.prototype.getPrediosPotenciales = function () {
        var componente = this;
        this.cuencaServices.getPredios()
            .then(function (predios) {
            componente.predios = predios;
            console.log(componente.predios);
        });
    };
    return ListPrediosComponent;
}(base_component_1.BaseComponent));
ListPrediosComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-list-predios',
        templateUrl: './list-predios.component.html',
        styleUrls: ['./list-predios.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        roles_manager_1.RolesManager,
        contractors_manager_1.ContractorsManager,
        cuenca_verde_service_1.CuencaVerdeService,
        router_1.Router])
], ListPrediosComponent);
exports.ListPrediosComponent = ListPrediosComponent;
//# sourceMappingURL=list-predios.component.js.map