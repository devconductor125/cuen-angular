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
var PredioPotencialComponent = (function (_super) {
    __extends(PredioPotencialComponent, _super);
    function PredioPotencialComponent(proceduresManager, tasksManager, router, cuencaServices, rolesManager, messagingService, globals) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.cuencaServices = cuencaServices;
        _this.rolesManager = rolesManager;
        _this.messagingService = messagingService;
        _this.globals = globals;
        _this.mapError = false;
        _this.marcadores = [];
        _this.predio = {
            'name': null,
            'lat': null,
            'lng': null
        };
        return _this;
    }
    PredioPotencialComponent.prototype.ngOnInit = function () {
        var component = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                component.success(position, component);
            }, function () {
                component.error(component);
            });
        }
        else {
            this.mapError = true;
        }
    };
    PredioPotencialComponent.prototype.error = function (msg) {
        this.mapError = true;
    };
    PredioPotencialComponent.prototype.success = function (position, component) {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: position.coords.latitude, lng: position.coords.longitude },
            zoom: 15,
            styles: this.globals.mapStyle,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        });
        google.maps.event.addListener(map, 'click', function (e) {
            component.marcadores.forEach(function (marcador) {
                marcador.setMap(null);
            });
            component.marcadores = [];
            component.latitudFinal = '';
            component.longitudFinal = '';
            var location = e.latLng;
            component.predio.lat = e.latLng.lat();
            component.predio.lng = e.latLng.lng();
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
            component.marcadores.push(marker);
            google.maps.event.addListener(marker, 'click', function (event) {
                var infoWindow = new google.maps.InfoWindow({
                    content: 'Ubicación del Predio'
                });
                infoWindow.open(map, marker);
            });
        });
    };
    PredioPotencialComponent.prototype.onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index;
    };
    PredioPotencialComponent.prototype.ngOnDestroy = function () {
    };
    PredioPotencialComponent.prototype.createP = function () {
        var _this = this;
        if (this.predio.name && this.predio.lat && this.predio.lng) {
            this.cuencaServices.sendPotencialPredio(this.predio)
                .then(function () {
                var message = {
                    'tipo': 'Creación Exitosa ',
                    'message': ' Predio Potencial creado satisfactoriamente',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                var link = ['/app/procedures'];
                _this.router.navigate(link);
            });
        }
        else {
            var message = {
                'tipo': '',
                'message': 'Debes ingresar un nombre y ubicar un marcador en el mapa',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        }
    };
    return PredioPotencialComponent;
}(base_component_1.BaseComponent));
PredioPotencialComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-predio-potencial',
        templateUrl: './predio-potencial.component.html',
        styleUrls: ['./predio-potencial.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        cuenca_verde_service_1.CuencaVerdeService,
        roles_manager_1.RolesManager,
        messaging_service_1.MessagingService,
        globals_1.Globals])
], PredioPotencialComponent);
exports.PredioPotencialComponent = PredioPotencialComponent;
//# sourceMappingURL=predio-potencial.component.js.map