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
var procedures_manager_1 = require("../../data/managers/procedures.manager");
var router_1 = require("@angular/router");
var base_component_1 = require("../base-component/base-component");
var tasks_manager_1 = require("../../data/managers/tasks.manager");
var cuenca_verde_service_1 = require("../../data/services/cuenca-verde.service");
var roles_manager_1 = require("../../data/managers/roles.manager");
var messaging_service_1 = require("../../data/services/messaging.service");
var MapHelper_1 = require("../map/MapHelper");
var MapaTaskExecutionComponent = (function (_super) {
    __extends(MapaCalendarComponent, _super);
    function MapaCalendarComponent(proceduresManager, tasksManager, router, cuencaService, rolesManager, messagingService) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.cuencaService = cuencaService;
        _this.rolesManager = rolesManager;
        _this.messagingService = messagingService;
        _this.notify = new core_1.EventEmitter();
        _this.mapError = false;
        _this.marcadores = [];
        _this.predio = {
            'name': '',
            'lat': '',
            'lng': ''
        };
        _this.polygons = null;
        _this.polylines = null;
        _this.circles = null;
        _this.polygons = [];
        _this.polylines = [];
        _this.circles = [];
        return _this;
    }
    MapaCalendarComponent.prototype.ngOnInit = function () {
        this.URL_IMG = this.cuencaService.API_URL_IMG;
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
    MapaCalendarComponent.prototype.error = function (msg) {
        this.mapError = true;
    };
    MapaCalendarComponent.prototype.success = function (position, component) {
        var lats = position.coords.latitude;
        var lngs = position.coords.longitude;
        var myLocation = {
            center: new google.maps.LatLng(lats, lngs),
            zoom: 17
        };
        this.map = new google.maps.Map(document.getElementById('map'), myLocation);
        this.infoWindow = new google.maps.InfoWindow({
            size: new google.maps.Size(150, 400)
        });
    };
    MapaCalendarComponent.prototype.loadGeoJson = function (geoJson) {
        this.addGeoJsonToMap(geoJson);
    };
    MapaCalendarComponent.prototype.addGeoJsonToMap = function (geoJson) {
        var features = geoJson.features;
        if (features) {
            var markerBounds = new google.maps.LatLngBounds();
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                if (feature) {
                    MapHelper_1.MapHelper.addFeatureToMap(this, google, feature, markerBounds);
                    this.map.fitBounds(markerBounds);
                }
            }
        }
    };
    MapaCalendarComponent.prototype.getId = function () {
        return this.componentId;
    };
    MapaCalendarComponent.prototype.onFeatureClicked = function (type, feature) {
        var objeto = {
            type: type,
            properties: feature.properties
        };
        this.notify.emit({ payload: objeto });
    };
    MapaCalendarComponent.prototype.onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index;
    };
    MapaCalendarComponent.prototype.crearMarcador = function (lat, lng, id) {
        this.addMarkerToMap(lat, lng, id);
    };
    MapaCalendarComponent.prototype.addMarkerToMap = function (lat, lng, id) {
        var componente = this;
        var image = this.URL_IMG + 'camera-pointer.png';
        var marker = new google.maps.Marker({
            position: { lat: Number(lat), lng: Number(lng) },
            icon: image,
        });
        marker.setValues({ id: id });
        marker.addListener('click', function () {
            var store_id = marker.get('id');
            var objeto = {
                type: '2',
                properties: store_id
            };
            componente.notify.emit({ payload: objeto });
        });
        marker.setMap(this.map);
    };
    MapaCalendarComponent.prototype.ngOnDestroy = function () {
    };
    return MapaCalendarComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MapaTaskExecutionComponent.prototype, "notify", void 0);
MapaTaskExecutionComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-mapa-calendar',
        templateUrl: './mapa-task-execution.component.html',
        styleUrls: ['./mapa-task-execution.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        cuenca_verde_service_1.CuencaVerdeService,
        roles_manager_1.RolesManager,
        messaging_service_1.MessagingService])
], MapaTaskExecutionComponent);
exports.MapaCalendarComponent = MapaTaskExecutionComponent;
//# sourceMappingURL=mapa-task-execution.component.js.mapjs.map
