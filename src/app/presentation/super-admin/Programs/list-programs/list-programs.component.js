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
var base_component_1 = require("../../../base-component/base-component");
var procedures_manager_1 = require("../../../../data/managers/procedures.manager");
var tasks_manager_1 = require("../../../../data/managers/tasks.manager");
var router_1 = require("@angular/router");
var roles_manager_1 = require("../../../../data/managers/roles.manager");
var messaging_service_1 = require("../../../../data/services/messaging.service");
var ListProgramsComponent = (function (_super) {
    __extends(ListProgramsComponent, _super);
    function ListProgramsComponent(proceduresManager, taskManager, router, activatedRoute, rolesManager, messagingService) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.taskManager = taskManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.rolesManager = rolesManager;
        _this.messagingService = messagingService;
        _this.listPrograms = [];
        return _this;
    }
    ListProgramsComponent.prototype.ngOnInit = function () {
        this.getUserRoles(this);
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        /////this.getListPrograms();
        var objeto = {
            'id': '1',
            'name': 'Programa 1',
            'created_at': '12/05/2018',
            'updated_at': '12/18/2018',
            'selected': 'true',
            'projects': []
        };
        this.listPrograms.push(objeto);
    };
    ListProgramsComponent.prototype.getListPrograms = function () {
        var _this = this;
        this.taskManager.getListPrograms()
            .then(function (response) {
            _this.listPrograms = response;
            console.log(_this.listPrograms);
        });
    };
    return ListProgramsComponent;
}(base_component_1.BaseComponent));
ListProgramsComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-list-programs',
        templateUrl: './list-programs.component.html',
        styleUrls: ['./list-programs.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        router_1.ActivatedRoute,
        roles_manager_1.RolesManager,
        messaging_service_1.MessagingService])
], ListProgramsComponent);
exports.ListProgramsComponent = ListProgramsComponent;
//# sourceMappingURL=list-programs.component.js.map