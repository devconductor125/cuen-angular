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
var messaging_service_1 = require("../../../data/services/messaging.service");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var geo_json_service_1 = require("../../../data/services/geo-json.service");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var base_component_1 = require("../../base-component/base-component");
var ViewTaskIntentionComponent = (function (_super) {
    __extends(ViewTaskIntentionComponent, _super);
    function ViewTaskIntentionComponent(messagingService, proceduresManager, tasksManager, router, activatedRoute, geoJsonService, rolesManager, cuencaService) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.geoJsonService = geoJsonService;
        _this.rolesManager = rolesManager;
        _this.cuencaService = cuencaService;
        return _this;
    }
    ViewTaskIntentionComponent.prototype.ngOnInit = function () {
        this.getUserRoles(this);
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.getTask();
    };
    ViewTaskIntentionComponent.prototype.getTask = function () {
        var _this = this;
        var componente = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.tasksManager.getCartaIntencion(String(id))
                    .then(function (task) {
                    _this.task = task;
                    console.log(_this.task);
                    _this.checkCartaIntencion();
                }, function () {
                    var link = ['/app'];
                    componente.router.navigate(link);
                });
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    ViewTaskIntentionComponent.prototype.checkCartaIntencion = function () {
        var _this = this;
        this.tasksManager.getCartaIntencion(this.task.id)
            .then(function (response) {
            _this.cartaIntencionData = response;
        });
    };
    return ViewTaskIntentionComponent;
}(base_component_1.BaseComponent));
ViewTaskIntentionComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-view-task-intention',
        templateUrl: './view-task-open.component.html',
        styleUrls: ['./view-task-intention.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        router_1.ActivatedRoute,
        geo_json_service_1.GeoJsonService,
        roles_manager_1.RolesManager,
        cuenca_verde_service_1.CuencaVerdeService])
], ViewTaskIntentionComponent);
exports.ViewTaskIntentionComponent = ViewTaskIntentionComponent;
//# sourceMappingURL=view-task-intention.component.js.map
