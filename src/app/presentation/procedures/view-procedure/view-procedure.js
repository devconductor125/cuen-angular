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
var messaging_service_1 = require("../../../data/services/messaging.service");
var base_component_1 = require("../../base-component/base-component");
var procedure_1 = require("../../../data/model/procedure");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var ViewProjectComponent = (function (_super) {
    __extends(ViewProjectComponent, _super);
    function ViewProjectComponent(messagingService, proceduresManager, router, rolesManager, activatedRoute) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.activatedRoute = activatedRoute;
        _this.procedureTypes = [];
        _this.procedure = new procedure_1.Procedure();
        _this.tasks = [];
        _this.intervention = [];
        return _this;
    }
    ViewProjectComponent.prototype.ngOnInit = function () {
        var component = this;
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.proceduresManager.loadAllObjects()
            .then(function () {
            component.loadProcedure();
        });
    };
    ViewProjectComponent.prototype.loadProcedure = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (id) {
            if (Number(id) > 0) {
                _this.procedure.id = id;
                _this.proceduresManager.getObjectForEdit(id)
                    .then(function (object) {
                    _this.procedure = object;
                    _this.getProcedureTasksAndPredio(_this.procedure);
                    _this.bugdetByProcess();
                    _this.interventionUser();
                }).then(function () {
                    _this.proceduresManager.getPercentageData(_this.procedure.id)
                        .then(function (response) {
                        _this.percentage = response.data;
                    });
                });
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    ViewProjectComponent.prototype.getProcedureTasksAndPredio = function (procedure) {
        var _this = this;
        if (procedure) {
            this.proceduresManager.getProcedureTasksAndPredio(String(procedure.id))
                .then(function (tasks) {
                if (tasks.task.length > 0) {
                    _this.tasks = tasks.task;
                    _this.predio = tasks.property;
                }
                else {
                    _this.tasks = [];
                }
                console.log(tasks);
            });
        }
    };
    ViewProjectComponent.prototype.interventionUser = function () {
        var _this = this;
        this.proceduresManager.getInterventionProcess(String(this.procedure.id))
            .then(function (response) {
            _this.intervention = response;
            console.log(_this.intervention);
        });
    };
    ViewProjectComponent.prototype.bugdetByProcess = function () {
        var _this = this;
        this.proceduresManager.bugdetByProcess(String(this.procedure.id))
            .then(function (response) {
            _this.budgetP = response;
            ////console.log(this.budgetP);
        });
    };
    return ViewProjectComponent;
}(base_component_1.BaseComponent));
ViewProjectComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-view-procedures',
        templateUrl: './view-procedure.component.html',
        styleUrls: ['./view-procedure.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        router_1.Router,
        roles_manager_1.RolesManager,
        router_1.ActivatedRoute])
], ViewProjectComponent);
exports.ViewProjectComponent = ViewProjectComponent;
//# sourceMappingURL=view-procedure.js.map