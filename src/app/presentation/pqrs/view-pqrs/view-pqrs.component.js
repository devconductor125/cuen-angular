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
var router_1 = require("@angular/router");
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var common_1 = require("@angular/common");
var messaging_service_1 = require("../../../data/services/messaging.service");
var pqrs_1 = require("../../../data/model/pqrs");
var PQRSType_1 = require("../../../data/model/PQRSType");
var Dependency_1 = require("../../../data/model/Dependency");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var base_component_1 = require("../../base-component/base-component");
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var mapping_utils_1 = require("../../../data/utils/mapping.utils");
var ViewPqrsComponent = (function (_super) {
    __extends(ViewPqrsComponent, _super);
    function ViewPqrsComponent(activatedRoute, cuencaVerdeService, messagingService, location, proceduresManager, rolesManager, router) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.activatedRoute = activatedRoute;
        _this.cuencaVerdeService = cuencaVerdeService;
        _this.messagingService = messagingService;
        _this.location = location;
        _this.proceduresManager = proceduresManager;
        _this.rolesManager = rolesManager;
        _this.router = router;
        _this.pqrs = new pqrs_1.PQRS();
        _this.dependencies = [];
        _this.pqrsTypes = [];
        return _this;
    }
    ViewPqrsComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.getUserRoles(this);
    };
    ViewPqrsComponent.prototype.ngOnDestroy = function () {
    };
    ViewPqrsComponent.prototype.onGotRoles = function () {
        var _this = this;
        this.getDependencies()
            .then(function () { return _this.getPqrsTypes(); })
            .then(function () { return _this.getObject(); });
    };
    ViewPqrsComponent.prototype.getObject = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            _this.cuencaVerdeService.getPqrs(idString)
                .then(function (response) {
                _this.pqrs = mapping_utils_1.MappingUtils.pqrsResponseToPQRS(_this, response);
            })
                .catch(function (reason) { return console.log(reason); });
        });
    };
    ViewPqrsComponent.prototype.getDependencies = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getDependencies()
                .then(function (dependencies) {
                if (dependencies.length > 0) {
                    if (dependencies[0].id !== '0') {
                        var placeholder = new Dependency_1.Dependency();
                        placeholder.id = '0';
                        placeholder.name = 'Selecciona una dependencia';
                        dependencies.unshift(placeholder);
                    }
                    if (!_this.pqrs.id) {
                        _this.pqrs.dependency = dependencies[0];
                    }
                    _this.dependencies = dependencies;
                    resolve();
                }
            });
        });
    };
    ViewPqrsComponent.prototype.getPqrsTypes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pqrsTypes = [];
            _this.cuencaVerdeService.getPqrsTypes()
                .then(function (pqrsTypes) {
                if (pqrsTypes.length > 0) {
                    if (pqrsTypes[0].id !== '0') {
                        var placeholder = new PQRSType_1.PQRSType();
                        placeholder.id = '0';
                        placeholder.name = 'Selecciona un tipo de PQRS';
                        pqrsTypes.unshift(placeholder);
                    }
                    if (!_this.pqrs.id) {
                        _this.pqrs.pqrsType = pqrsTypes[0];
                    }
                    _this.pqrsTypes = pqrsTypes;
                    resolve();
                }
            });
        });
    };
    ViewPqrsComponent.prototype.updatePqrs = function () {
        var _this = this;
        if (this.pqrs.isValid()) {
            this.cuencaVerdeService.updatePqrs(this.pqrs)
                .then(function (response) {
                var message = {
                    'tipo': 'Error',
                    'message': 'Envío exitoso',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                var link = ['app/pqrs'];
                _this.router.navigate(link);
            })
                .catch(function (reason) { return console.log(reason); });
        }
        else {
            var message = {
                'tipo': 'Error',
                'message': 'Debes completar los campos',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        }
    };
    ViewPqrsComponent.prototype.sendPqrsResponse = function () {
        var _this = this;
        if (this.pqrs.isValidForResponse()) {
            this.cuencaVerdeService.sendPqrsResponse(this.pqrs)
                .then(function (response) {
                var message = {
                    'tipo': '',
                    'message': 'Envío exitoso',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                _this.location.back();
            })
                .catch(function (reason) { return console.log(reason); });
        }
        else {
            var message = {
                'tipo': 'Error',
                'message': 'Debes completar los campos',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        }
    };
    return ViewPqrsComponent;
}(base_component_1.BaseComponent));
ViewPqrsComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-view-pqrs',
        templateUrl: './view-pqrs.component.html',
        styleUrls: ['./view-pqrs.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        cuenca_verde_service_1.CuencaVerdeService,
        messaging_service_1.MessagingService,
        common_1.Location,
        procedures_manager_1.ProceduresManager,
        roles_manager_1.RolesManager,
        router_1.Router])
], ViewPqrsComponent);
exports.ViewPqrsComponent = ViewPqrsComponent;
//# sourceMappingURL=view-pqrs.component.js.map