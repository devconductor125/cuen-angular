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
var browser_utils_1 = require("../../data/utils/browser.utils");
var geo_json_service_1 = require("../../data/services/geo-json.service");
var shape_files_uploader_1 = require("../shape-file-uploader/shape-files-uploader");
var MapHelper_1 = require("./MapHelper");
var base_component_1 = require("../base-component/base-component");
var tasks_manager_1 = require("../../data/managers/tasks.manager");
var cuenca_verde_service_1 = require("../../data/services/cuenca-verde.service");
var roles_manager_1 = require("../../data/managers/roles.manager");
var messaging_service_1 = require("../../data/services/messaging.service");
var MapComponent = (function (_super) {
    __extends(MapComponent, _super);
    function MapComponent(proceduresManager, tasksManager, route, geoJsonService, cuencaVerdeService, router, rolesManager, messagingService, activatedRoute) {
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
        _this.polyLine = null;
        _this.polygons = null;
        _this.polylines = null;
        _this.circles = null;
        _this.hasDocuments = false;
        _this.polygons = [];
        _this.polylines = [];
        _this.circles = [];
        return _this;
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTask();
        var component = this;
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            mapTypeId: 'hybrid',
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        });
        this.bounds = new google.maps.LatLngBounds();
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (id) {
            _this.taskId = id;
        });
        this.route.paramMap
            .switchMap(function (params) { return _this.tasksManager.getGeoJsonFromTaskId(+params.get('id') + ''); })
            .subscribe(function (geoJson) {
            if (geoJson.features) {
                delete geoJson.last_added_feature;
                delete geoJson.multi_line_string_features;
                delete geoJson.point_features;
                geoJson.budget = MapHelper_1.MapHelper.getGeoJsonBudget(geoJson);
                component.proceduresManager.addToCurrentGeoJsonList(geoJson);
                component.addGeoJsonToMap(geoJson);
            }
            else {
                var link = ['app/view-tasks/' + _this.taskId];
                _this.router.navigate(link);
                var message = {
                    'tipo': 'El Mapa ',
                    'message': ' no ha sido cargado',
                    'style': 'alert-warning'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            }
        }, function (reason) {
            console.log(reason);
        });
        this.getUserRoles(this);
    };
    MapComponent.prototype.ngOnDestroy = function () {
    };
    MapComponent.prototype.getTask = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.tasksManager.getTaskDetails(String(id))
                    .then(function (task) {
                    _this.task = task;
                }).then(function () {
                    _this.getFiles();
                    _this.getComments();
                });
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    MapComponent.prototype.getFiles = function () {
        var _this = this;
        this.tasksManager.getAllTaskFiles(this.task)
            .then(function (files) {
            if (files.images) {
                if (files.images.length > 0 || files.documents.length > 0) {
                    if (files.images.length > 0) {
                        _this.images = files.images;
                    }
                    if (files.documents.length > 0) {
                        _this.documents = files.documents;
                        _this.hasDocuments = true;
                    }
                }
                else {
                    _this.hasDocuments = false;
                }
            }
        });
    };
    MapComponent.prototype.addGeoJsonToMap = function (geoJson) {
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
    MapComponent.prototype.onFeatureClicked = function (type, feature, event) {
        if (this.infoWindow != null) {
            this.infoWindow.close();
        }
        this.infoWindow = new google.maps.InfoWindow({
            content: feature.properties.Acciones + ' ' + (feature.properties.Material ? feature.properties.Material : ''),
            position: event.latLng
        });
        this.infoWindow.open(this.map);
        this.map.setCenter(event.latLng);
    };
    MapComponent.prototype.onFilesUploaded = function (event) {
        switch (event.id) {
            case 'shapeFileUploader':
                if (event.type === 'filesUploaded') {
                    this.fileUploader.reset();
                    var geoJson = event.payload.text();
                    var geoJsonObject = JSON.parse(geoJson);
                    Object.assign(geoJsonObject, JSON.parse(event.payload.text()));
                    geoJsonObject.budget = MapHelper_1.MapHelper.getGeoJsonBudget(geoJsonObject);
                    this.proceduresManager.addToCurrentGeoJsonList(geoJsonObject);
                    this.addGeoJsonToMap(geoJsonObject);
                }
                break;
        }
    };
    MapComponent.prototype.convertToShapeFile = function () {
        var _this = this;
        var geoJsonList = this.proceduresManager.getCurrentGeoJsonList();
        geoJsonList.forEach(function (geoJson) {
            _this.getShapeFile(geoJson);
        });
    };
    MapComponent.prototype.getShapeFile = function (geoJson) {
        this.geoJsonService.geoJsonToShape(geoJson, MapHelper_1.MapHelper.LINE)
            .then(function (blob) {
            browser_utils_1.BrowserUtils.downloadZipFromBlob(blob, MapHelper_1.MapHelper.LINE);
        })
            .catch(function (error) {
            console.log(error);
        });
        this.geoJsonService.geoJsonToShape(geoJson, MapHelper_1.MapHelper.MULTI_LINE)
            .then(function (blob) {
            browser_utils_1.BrowserUtils.downloadZipFromBlob(blob, MapHelper_1.MapHelper.MULTI_LINE);
        })
            .catch(function (error) {
            console.log(error);
        });
        this.geoJsonService.geoJsonToShape(geoJson, MapHelper_1.MapHelper.POLYGON)
            .then(function (blob) {
            browser_utils_1.BrowserUtils.downloadZipFromBlob(blob, MapHelper_1.MapHelper.POLYGON);
        })
            .catch(function (error) {
            console.log(error);
        });
        this.geoJsonService.geoJsonToShape(geoJson, MapHelper_1.MapHelper.POINT)
            .then(function (blob) {
            browser_utils_1.BrowserUtils.downloadZipFromBlob(blob, MapHelper_1.MapHelper.POINT);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    MapComponent.prototype.uploadMap = function () {
        var _this = this;
        if (this.hasDocuments) {
            if (Number(this.taskId) > 0) {
                var geoJsonList = this.proceduresManager.getCurrentGeoJsonList();
                if (geoJsonList.length > 0) {
                    var geoJsonRequest = geoJsonList[0];
                    for (var i = 1; i < geoJsonList.length; i++) {
                        geoJsonRequest.features = geoJsonRequest.features.concat(geoJsonList[i].features);
                        geoJsonRequest.budget = this.mergeBudgets(geoJsonRequest.budget, geoJsonList[i].budget);
                    }
                    var budgetArray = geoJsonRequest.budget;
                    var filteredBudget_1 = [];
                    budgetArray.forEach(function (budget) {
                        if (!isNaN(budget.actionId)) {
                            if (isNaN(budget.materialId)) {
                                budget.materialId = null;
                            }
                            filteredBudget_1.push(budget);
                        }
                    });
                    delete geoJsonRequest.budget;
                    delete geoJsonRequest.polygon_features;
                    delete geoJsonRequest.multi_polygon_features;
                    delete geoJsonRequest.multi_line_string_features;
                    delete geoJsonRequest.point_features;
                    if (filteredBudget_1.length > 0) {
                        this.cuencaVerdeService.sendMap(this.taskId, filteredBudget_1, geoJsonRequest)
                            .then(function () {
                            _this.tasksManager.clearObjects();
                            _this.proceduresManager.clearGeoJsonCache();
                            _this.approveTask();
                        });
                    }
                }
            }
        }
        else {
            var message = {
                'tipo': 'Archivo Requerido: ',
                'message': ' Se necesita adjuntar la Ficha Predial antes de aprobar',
                'style': 'alert-warning'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        }
    };
    MapComponent.prototype.mergeBudgets = function (budget1, budget2) {
        var keysBudget2 = Object.keys(budget2);
        keysBudget2.forEach(function (key) {
            if (budget1[key]) {
                budget1[key] = budget1[key] + budget2[key];
            }
            else {
                budget1[key] = budget2[key];
            }
        });
        return budget1;
    };
    MapComponent.prototype.approveTask = function () {
        var _this = this;
        this.tasksManager.approveTask(this.taskId)
            .then(function () {
            _this.tasksManager.clearObjects();
            var message = {
                'tipo': 'Tarea enviada ',
                'message': 'y aprobada satisfactoriamente',
                'style': 'alert-success'
            };
            _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            var link = ['/app/tasks'];
            _this.router.navigate(link);
        });
    };
    MapComponent.prototype.getComments = function () {
        var _this = this;
        this.tasksManager.getAllComments(this.task)
            .then(function (comments) {
            if (comments instanceof Array) {
                _this.comments = comments;
            }
        });
    };
    MapComponent.prototype.insertComment = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            var objeto = {
                'task_id': id,
                'sub_type': _this.task.sub_type.id,
                'comment': _this.comment
            };
            if (objeto.comment !== '' && objeto.comment !== undefined) {
                _this.tasksManager.insertComment(objeto)
                    .then(function (response) {
                    _this.getComments();
                    _this.comment = '';
                });
            }
        });
    };
    return MapComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.ViewChild('shapeFileUploader'),
    __metadata("design:type", shape_files_uploader_1.ShapeFilesUploaderComponent)
], MapComponent.prototype, "fileUploader", void 0);
MapComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-map',
        templateUrl: './map.component.html',
        styleUrls: ['./map.component.css']
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
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map-sig-task-execution.component.jscution.component.js.map
