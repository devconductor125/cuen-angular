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
var contractor_1 = require("../../../data/model/contractor");
var contractors_manager_1 = require("../../../data/managers/contractors.manager");
var router_1 = require("@angular/router");
var messaging_service_1 = require("../../../data/services/messaging.service");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var geo_json_service_1 = require("../../../data/services/geo-json.service");
var ContractorsViewComponent = (function (_super) {
    __extends(ContractorsViewComponent, _super);
    function ContractorsViewComponent(messagingService, proceduresManager, contractorManager, router, activatedRoute, geoJsonService, rolesManager, tasksManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.contractorManager = contractorManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.geoJsonService = geoJsonService;
        _this.rolesManager = rolesManager;
        _this.tasksManager = tasksManager;
        _this.contractor = new contractor_1.Contractor();
        _this.hasDocuments = false;
        _this.repeatpass = '';
        _this.typePerson = [
            { 'id': '1', 'type': 'Natural' },
            { 'id': '2', 'type': 'Jurídico' }
        ];
        _this.categories = [];
        return _this;
    }
    ContractorsViewComponent.prototype.ngOnInit = function () {
        this.getContractorsCategorias();
        this.getModalityC();
        this.getContractType();
        this.getContractor();
        this.guarantee = [
            { 'id': '1', 'name': 'De Cumplimiento' },
            { 'id': '2', 'name': 'De Buen Manejo' },
            { 'id': '3', 'name': 'De Correcta Inversión' },
            { 'id': '4', 'name': 'No Aplica' }
        ];
    };
    ///// Modalidad de contrato
    ContractorsViewComponent.prototype.getModalityC = function () {
        var _this = this;
        this.tasksManager.getModalityC()
            .then(function (modalities) {
            _this.contractormodality = modalities;
        });
    };
    ContractorsViewComponent.prototype.getContractType = function () {
        var _this = this;
        this.tasksManager.getContractType()
            .then(function (typeContract) {
            _this.contractType = typeContract;
        });
    };
    ContractorsViewComponent.prototype.getContractor = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.contractorManager.getContractorDetails(String(id))
                    .then(function (contractor) {
                    _this.contractor = contractor;
                    console.log(_this.contractor);
                    ///this.contractor.categories = ['1', '2'];
                    ///console.log(this.contractor);
                });
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    ///// categorías contratista
    ContractorsViewComponent.prototype.getContractorsCategorias = function () {
        var componente = this;
        this.tasksManager.getContractorsCategorias()
            .then(function (categorias) {
            var listcategories = categorias;
            ///console.log(listcategories);
            componente.categories = [];
            listcategories.forEach(function (item) {
                componente.categories.push({ value: String(item.id), label: String(item.name) });
            });
        });
    };
    ContractorsViewComponent.prototype.obtenerArchivos = function () {
        var _this = this;
        this.documents = null;
        this.contractorManager.getAllContractorFiles(this.contractor)
            .then(function (files) {
            if (files.images && files.documents) {
                if (files.images.length > 0 || files.documents.length > 0) {
                    if (files.images.length > 0) {
                        _this.images = files.images;
                    }
                    if (files.documents && files.documents.length > 0) {
                        _this.documents = files.documents;
                    }
                    _this.hasDocuments = true;
                }
                else {
                    _this.hasDocuments = false;
                }
            }
        });
    };
    return ContractorsViewComponent;
}(base_component_1.BaseComponent));
ContractorsViewComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-view-contractors',
        templateUrl: './view-contractors.component.html',
        styleUrls: ['./view-contractors.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        contractors_manager_1.ContractorsManager,
        router_1.Router,
        router_1.ActivatedRoute,
        geo_json_service_1.GeoJsonService,
        roles_manager_1.RolesManager,
        tasks_manager_1.TasksManager])
], ContractorsViewComponent);
exports.ContractorsViewComponent = ContractorsViewComponent;
//# sourceMappingURL=view-contractors.component.js.map