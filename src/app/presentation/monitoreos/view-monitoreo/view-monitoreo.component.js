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
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var geo_json_service_1 = require("../../../data/services/geo-json.service");
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var router_1 = require("@angular/router");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var messaging_service_1 = require("../../../data/services/messaging.service");
var MapHelper_1 = require("../../map/MapHelper");
var ViewMonitoreoComponent = (function (_super) {
    __extends(ViewMonitoreoComponent, _super);
    function ViewMonitoreoComponent(proceduresManager, tasksManager, route, geoJsonService, cuencaVerdeService, router, rolesManager, messagingService, activatedRoute) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.route = route;
        _this.geoJsonService = geoJsonService;
        _this.cuencaVerdeService = cuencaVerdeService;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.messagingService = messagingService;
        _this.activatedRoute = activatedRoute;
        _this.shapeFileUploader = 'shapeFileUploader';
        _this.map = null;
        _this.hasDocuments = false;
        _this.polygons = null;
        _this.polylines = null;
        _this.circles = null;
        _this.polygons = [];
        _this.polylines = [];
        _this.circles = [];
        return _this;
    }
    ViewMonitoreoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTask();
        var component = this;
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            mapTypeId: 'terrain'
        });
        this.bounds = new google.maps.LatLngBounds();
        this.route.paramMap
            .switchMap(function (params) { return _this.tasksManager.getMonitoreoDetail(+params.get('id') + ''); })
            .subscribe(function (monitoreoDetail) {
            if (monitoreoDetail.id) {
                component.monitoreoDetail = monitoreoDetail;
                component.addMonitoreoToView(component, monitoreoDetail);
            }
            else {
                var link = ['app'];
                _this.router.navigate(link);
            }
        }, function (reason) {
            console.log(reason);
        });
        this.getUserRoles(this);
    };
    ViewMonitoreoComponent.prototype.ngOnDestroy = function () {
    };
    ViewMonitoreoComponent.prototype.getTask = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.tasksManager.getTaskDetails(String(id))
                    .then(function (task) {
                    // this.task = task;
                }).then(function () {
                    // this.getFiles();
                });
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    ViewMonitoreoComponent.prototype.approveTask = function () {
        /*this.tasksManager.approveTask(this.monitoreoId)
         .then(() => {
         this.tasksManager.clearObjects();
         const message = {
         'tipo': 'Tarea enviada ',
         'message': 'y aprobada satisfactoriamente',
         'style': 'alert-success'
         };
         this.messagingService.publish(new BusMessage('alerta', message));
         const link = ['/app/tasks'];
         this.router.navigate(link);
         });*/
    };
    ViewMonitoreoComponent.prototype.addMonitoreoToView = function (component, monitoreoDetail) {
        if (monitoreoDetail.geojson_feature) {
            var feature = JSON.parse(monitoreoDetail.geojson_feature);
            this.addFeatureToMap(feature);
        }
        if (monitoreoDetail.points) {
            monitoreoDetail.points.forEach(function (point) {
                MapHelper_1.MapHelper.addMonitoreoPointToMap(component, google, point);
            });
        }
    };
    ViewMonitoreoComponent.prototype.addFeatureToMap = function (featureToAdd) {
        var features = [];
        features.push(featureToAdd);
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
    ViewMonitoreoComponent.prototype.onMonitoreoPointClicked = function (point) {
        this.images = point.images;
    };
    ViewMonitoreoComponent.prototype.getComments = function () {
        var _this = this;
        this.tasksManager.getAllMonitoreoComments(this.monitoreoDetail)
            .then(function (comments) {
            _this.comments = comments;
        });
    };
    ViewMonitoreoComponent.prototype.insertComment = function () {
        var _this = this;
        var id = Number(this.monitoreoDetail.id);
        var objeto = {
            'task_id': id,
            'sub_type': this.monitoreoDetail.id,
            'comment': this.comentario
        };
        if (objeto.comment !== '' && objeto.comment !== undefined) {
            this.tasksManager.insertMonitoreoComment(objeto)
                .then(function (response) {
                _this.getComments();
                _this.comentario = '';
            });
        }
    };
    return ViewMonitoreoComponent;
}(base_component_1.BaseComponent));
ViewMonitoreoComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-map',
        templateUrl: './view-monitoreo.component.html',
        styleUrls: ['./view-monitoreo.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.ActivatedRoute,
        geo_json_service_1.GeoJsonService,
        cuenca_verde_service_1.CuencaVerdeService,
        router_1.Router,
        roles_manager_1.RolesManager,
        messaging_service_1.MessagingService,
        router_1.ActivatedRoute])
], ViewMonitoreoComponent);
exports.ViewMonitoreoComponent = ViewMonitoreoComponent;
//# sourceMappingURL=view-monitoreo.component.js.map