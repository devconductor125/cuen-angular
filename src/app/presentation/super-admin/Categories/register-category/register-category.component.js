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
var categories_1 = require("../../../../data/model/categories");
var RegisterCategoryComponent = (function (_super) {
    __extends(RegisterCategoryComponent, _super);
    function RegisterCategoryComponent(proceduresManager, tasksManager, router, activatedRoute, rolesManager, messagingService) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.rolesManager = rolesManager;
        _this.messagingService = messagingService;
        _this.categoryRegister = new categories_1.Categories();
        _this.listRoles = [];
        return _this;
    }
    RegisterCategoryComponent.prototype.ngOnInit = function () {
    };
    RegisterCategoryComponent.prototype.guardar = function () {
        var componente = this;
        ///console.log(this.task);
        if (this.isValidCategory()) {
            console.log(this.categoryRegister);
            alert('Registrar');
            /// REGISTRAR
            /*this.tasksManager.crearExecutionTask(this.userRegister)
              .then(() => {
                const message = {
                  'tipo': 'Usuario Registrado ',
                  'message': ' satisfactoriamente.',
                  'style': 'alert-success'
                };
                this.messagingService.publish(new BusMessage('alerta', message));
  
                const link = ['/app/list-user'];
                this.router.navigate(link);
  
              }, function (reason: string) {
                ////console.log(reason);
                const message = {
                  'tipo': 'Error',
                  'message': reason,
                  'style': 'alert-danger'
                };
                componente.messagingService.publish(new BusMessage('alerta', message));
              });*/
        }
    };
    RegisterCategoryComponent.prototype.isValidCategory = function () {
        if (!this.categoryRegister.name || this.categoryRegister.name.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el nombre de la Categoría',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    return RegisterCategoryComponent;
}(base_component_1.BaseComponent));
RegisterCategoryComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-register-user',
        templateUrl: './register-category.component.html',
        styleUrls: ['./register-category.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        router_1.ActivatedRoute,
        roles_manager_1.RolesManager,
        messaging_service_1.MessagingService])
], RegisterCategoryComponent);
exports.RegisterCategoryComponent = RegisterCategoryComponent;
//# sourceMappingURL=register-category.component.js.map