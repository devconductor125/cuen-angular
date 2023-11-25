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
var base_component_1 = require("../../base-component/base-component");
var messaging_service_1 = require("../../../data/services/messaging.service");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var ProceduresComponent = (function (_super) {
    __extends(ProceduresComponent, _super);
    function ProceduresComponent(messagingService, proceduresManager, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.rolesManager = rolesManager;
        return _this;
    }
    ProceduresComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.proceduresManager.loadAllObjects()
            .then(function (response) {
            if (response instanceof Array) {
                _this.procedures = response;
            }
        });
        this.getUserRoles(this);
    };
    ProceduresComponent.prototype.deleteProject = function (procedure) {
        var component = this;
        this.shouldDelete(function () {
            component.proceduresManager.deleteObject(procedure)
                .then(function (success) {
                if (success) {
                    var i = component.procedures.length;
                    while (i--) {
                        if (component.procedures[i].id === procedure.id) {
                            component.procedures.splice(i, 1);
                        }
                    }
                }
            });
        });
    };
    return ProceduresComponent;
}(base_component_1.BaseComponent));
ProceduresComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-procedures',
        templateUrl: './procedures.component.html',
        styleUrls: ['./procedures.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        roles_manager_1.RolesManager])
], ProceduresComponent);
exports.ProceduresComponent = ProceduresComponent;
//# sourceMappingURL=procedures.component.js.map