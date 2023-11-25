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
var roles_manager_1 = require("../../../data/managers/roles.manager");
var create_procedure_component_1 = require("../create-procedure/create-procedure.component");
var EditProcedureComponent = (function (_super) {
    __extends(EditProcedureComponent, _super);
    function EditProcedureComponent(messagingService, proceduresManager, router, rolesManager, activatedRoute) {
        var _this = _super.call(this, messagingService, proceduresManager, router, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.activatedRoute = activatedRoute;
        return _this;
    }
    EditProcedureComponent.prototype.onDataLoaded = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.proceduresManager.getObjectForEdit(String(id))
                    .then(function (object) {
                    _this.procedure = object;
                    _this.mapProcedureObjects();
                });
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    EditProcedureComponent.prototype.mapProcedureObjects = function () {
        var component = this;
        this.programs.forEach(function (program) {
            component.procedure.programs.forEach(function (localProgram) {
                if (localProgram.id === program.id) {
                    program.selected = false; // This triggers the checkbox onChange
                    component.getProjects(program);
                }
            });
        });
    };
    EditProcedureComponent.prototype.mapProjectObjects = function (projects) {
        var component = this;
        projects.forEach(function (project) {
            component.procedure.projects.forEach(function (localProject) {
                if (localProject.id === project.id) {
                    project.selected = false; // This triggers the checkbox onChange
                    component.getActivities(project);
                }
            });
        });
    };
    EditProcedureComponent.prototype.mapProjectActivities = function (activities) {
        var component = this;
        activities.forEach(function (activity) {
            component.procedure.activities.forEach(function (localActivity) {
                if (Number(localActivity.id) === activity.id) {
                    activity.selected = true; // This triggers the checkbox onChange
                }
            });
        });
    };
    EditProcedureComponent.prototype.updateProcedure = function () {
        var _this = this;
        this.setProcedureActivities();
        if (this.isValidProcedure()) {
            this.proceduresManager.update(this.procedure)
                .then(function (result) {
                if (result) {
                    var message = {
                        'tipo': 'Actualizado',
                        'message': 'El procedimiento ha sido actualizado satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/procedures'];
                    _this.router.navigate(link);
                }
            });
        }
    };
    return EditProcedureComponent;
}(create_procedure_component_1.CreateProcedureComponent));
EditProcedureComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-edit-procedure',
        templateUrl: './edit-procedure.component.html',
        styleUrls: ['./edit-procedure.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        router_1.Router,
        roles_manager_1.RolesManager,
        router_1.ActivatedRoute])
], EditProcedureComponent);
exports.EditProcedureComponent = EditProcedureComponent;
//# sourceMappingURL=edit-procedure.component.js.map