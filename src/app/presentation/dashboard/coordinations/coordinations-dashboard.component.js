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
var messaging_service_1 = require("../../../data/services/messaging.service");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var base_component_1 = require("../../base-component/base-component");
var CoordinationsDashboardComponent = (function (_super) {
    __extends(CoordinationsDashboardComponent, _super);
    function CoordinationsDashboardComponent(proceduresManager, messagingService, tasksManager, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.messagingService = messagingService;
        _this.tasksManager = tasksManager;
        _this.rolesManager = rolesManager;
        return _this;
    }
    CoordinationsDashboardComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
    };
    return CoordinationsDashboardComponent;
}(base_component_1.BaseComponent));
CoordinationsDashboardComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-coordinations-dashboard',
        templateUrl: './coordinations-dashboard.component.html'
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        messaging_service_1.MessagingService,
        tasks_manager_1.TasksManager,
        roles_manager_1.RolesManager])
], CoordinationsDashboardComponent);
exports.CoordinationsDashboardComponent = CoordinationsDashboardComponent;
//# sourceMappingURL=coordinations-dashboard.component.js.map