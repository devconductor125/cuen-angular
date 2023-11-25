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
var angular_instantsearch_1 = require("angular-instantsearch");
var search_box_1 = require("angular-instantsearch/search-box/search-box");
var ContractorsComponent = (function (_super) {
    __extends(ContractorsComponent, _super);
    function ContractorsComponent(proceduresManager, rolesManager, contractorsManager, router) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.rolesManager = rolesManager;
        _this.contractorsManager = contractorsManager;
        _this.router = router;
        _this.contractors = null;
        _this.contratistas = [];
        return _this;
    }
    ContractorsComponent.prototype.ngOnInit = function () {
        this.getUserRoles(this);
        this.getContratistas();
    };
    ContractorsComponent.prototype.getLink = function (hit) {
        var result = '';
        switch (hit.type) {
            case 'Contratista':
                result = '/app/view-contractor/' + hit.entity_id;
                break;
            default:
                result = '';
        }
        return result;
    };
    ContractorsComponent.prototype.openResult = function (hit) {
        var link = [this.getLink(hit)];
        if (link[0].length > 0) {
            this.router.navigate(link); // TODO Wendy Mayerly to fix router navigation bug
            // window.location.href = 'http://localhost:6200' + link;
        }
    };
    ContractorsComponent.prototype.getContratistas = function () {
        var componente = this;
        this.proceduresManager.getUsers(5)
            .then(function (users) {
            componente.contratistas = users;
            ///console.log(this.contratistas);
        });
    };
    return ContractorsComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.ViewChild('searchBox'),
    __metadata("design:type", search_box_1.NgAisSearchBox)
], ContractorsComponent.prototype, "searchBox", void 0);
__decorate([
    core_1.ViewChild('instantSearch'),
    __metadata("design:type", angular_instantsearch_1.NgAisInstantSearch)
], ContractorsComponent.prototype, "instantSearch", void 0);
ContractorsComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-contractors',
        templateUrl: './contractors.component.html',
        styleUrls: ['./contractors.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        roles_manager_1.RolesManager,
        contractors_manager_1.ContractorsManager,
        router_1.Router])
], ContractorsComponent);
exports.ContractorsComponent = ContractorsComponent;
//# sourceMappingURL=contractors.component.js.map