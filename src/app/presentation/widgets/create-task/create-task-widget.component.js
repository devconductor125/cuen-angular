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
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var router_1 = require("@angular/router");
var create_task_component_1 = require("../../tasks/create-task/create-task.component");
var messaging_service_1 = require("../../../data/services/messaging.service");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var CreateTaskWidgetComponent = (function (_super) {
    __extends(CreateTaskWidgetComponent, _super);
    function CreateTaskWidgetComponent(messagingService, proceduresManager, tasksManager, router, activatedRoute, cuencaVerdeServices, rolesManager) {
        var _this = _super.call(this, messagingService, proceduresManager, tasksManager, router, activatedRoute, cuencaVerdeServices, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.cuencaVerdeServices = cuencaVerdeServices;
        _this.rolesManager = rolesManager;
        return _this;
    }
    CreateTaskWidgetComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.task = {};
        this.getUserRoles(this);
    };
    CreateTaskWidgetComponent.prototype.createTask = function () {
        if (this.isValidTask()) {
        }
    };
    return CreateTaskWidgetComponent;
}(create_task_component_1.CreateTaskComponent));
CreateTaskWidgetComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-create-task-widget',
        templateUrl: './create-task-widget.component.html'
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        router_1.ActivatedRoute,
        cuenca_verde_service_1.CuencaVerdeService,
        roles_manager_1.RolesManager])
], CreateTaskWidgetComponent);
exports.CreateTaskWidgetComponent = CreateTaskWidgetComponent;
//# sourceMappingURL=create-task-widget.component.js.map