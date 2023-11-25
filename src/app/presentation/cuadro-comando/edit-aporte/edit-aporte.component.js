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
var base_component_1 = require("../../base-component/base-component");
var messaging_service_1 = require("../../../data/services/messaging.service");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var EditAporteComponent = (function (_super) {
    __extends(EditAporteComponent, _super);
    function EditAporteComponent(messagingService, proceduresManager, router, activatedRoute, tasksManager, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.tasksManager = tasksManager;
        _this.rolesManager = rolesManager;
        return _this;
    }
    EditAporteComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.getAporte();
    };
    EditAporteComponent.prototype.getAporte = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            _this.aporteID = idString;
            if (id > 0) {
                _this.tasksManager.getAporteForId(String(id))
                    .then(function (object) {
                    _this.aporte = object;
                    if (_this.aporte.committed_budget === null) {
                        _this.aporte.committed_budget = '0';
                    }
                    if (_this.aporte.paid_budget === null) {
                        _this.aporte.paid_budget = '0';
                    }
                    _this.aporteOriginal = Number(_this.aporte.budget);
                });
            }
            else {
                var link = ['/app/comando'];
                _this.router.navigate(link);
            }
        });
    };
    EditAporteComponent.prototype.updateAporte = function () {
        var _this = this;
        if (this.isValidProcedure()) {
            this.tasksManager.updateAssociated(this.aporte)
                .then(function (result) {
                if (result) {
                    var message = {
                        'tipo': 'Registrado',
                        'message': 'El aporte ha sido actualizado satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/comando'];
                    _this.router.navigate(link);
                }
            });
        }
    };
    EditAporteComponent.prototype.getArrayEspecies = function ($event) {
        this.aporte.budget_species = $event.payload.total;
        this.aporte.species_contribution = $event.payload.listado;
    };
    EditAporteComponent.prototype.isValidProcedure = function () {
        if (this.aporte.budget === '' || this.aporte.budget === null || this.aporte.budget === undefined) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el aporte que se le asignará a la actividad',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (Number(this.aporte.budget) < this.aporteOriginal) {
            var message = {
                'tipo': 'Error: ',
                'message': 'El aporte no puede ser menor al registrado originalmente',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    return EditAporteComponent;
}(base_component_1.BaseComponent));
EditAporteComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-edit-aporte',
        templateUrl: './edit-aporte.component.html',
        styleUrls: ['./edit-aporte.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        router_1.Router,
        router_1.ActivatedRoute,
        tasks_manager_1.TasksManager,
        roles_manager_1.RolesManager])
], EditAporteComponent);
exports.EditAporteComponent = EditAporteComponent;
//# sourceMappingURL=edit-aporte.component.js.map