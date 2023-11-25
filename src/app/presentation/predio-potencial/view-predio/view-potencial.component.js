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
var base_component_1 = require("../../base-component/base-component");
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var messaging_service_1 = require("../../../data/services/messaging.service");
var globals_1 = require("../../../../globals");
var ViewPotencialComponent = (function (_super) {
    __extends(ViewPotencialComponent, _super);
    function ViewPotencialComponent(proceduresManager, tasksManager, router, cuencaServices, rolesManager, messagingService, activatedRoute, globals) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.cuencaServices = cuencaServices;
        _this.rolesManager = rolesManager;
        _this.messagingService = messagingService;
        _this.activatedRoute = activatedRoute;
        _this.globals = globals;
        _this.mapError = false;
        _this.marcadores = [];
        _this.listPredios = [];
        _this.predio = {
            'name': null,
            'lat': null,
            'lng': null
        };
        return _this;
    }
    ViewPotencialComponent.prototype.ngOnInit = function () {
        this.getPredios();
    };
    ViewPotencialComponent.prototype.error = function (msg) {
        this.mapError = true;
    };
    ViewPotencialComponent.prototype.success = function (position) {
        var coordenadas = position.split(',');
        var lat = parseFloat(coordenadas[0]);
        var lng = parseFloat(coordenadas[1]);
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: lat, lng: lng },
            zoom: 15,
            styles: this.globals.mapStyle,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        });
        var marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map,
            title: 'Ubicación del Predio'
        });
    };
    ViewPotencialComponent.prototype.onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index;
    };
    ViewPotencialComponent.prototype.ngOnDestroy = function () {
    };
    ViewPotencialComponent.prototype.getPredios = function () {
        var _this = this;
        var componente = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.cuencaServices.getPredios()
                    .then(function (predios) {
                    componente.listPredios = predios;
                    var selected = componente.listPredios.filter(function (predio) { return String(predio.id) === String(id); });
                    if (selected.length > 0) {
                        componente.predio = selected[0];
                        if (componente.predio.main_coordinate) {
                            componente.success(componente.predio.main_coordinate);
                        }
                        else {
                            componente.error(componente);
                        }
                    }
                });
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    return ViewPotencialComponent;
}(base_component_1.BaseComponent));
ViewPotencialComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-predio-view',
        templateUrl: './view-potencial.component.html',
        styleUrls: ['./view-potencial.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        cuenca_verde_service_1.CuencaVerdeService,
        roles_manager_1.RolesManager,
        messaging_service_1.MessagingService,
        router_1.ActivatedRoute,
        globals_1.Globals])
], ViewPotencialComponent);
exports.ViewPotencialComponent = ViewPotencialComponent;
//# sourceMappingURL=view-potencial.component.js.map