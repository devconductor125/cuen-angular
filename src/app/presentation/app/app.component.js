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
var messaging_service_1 = require("../../data/services/messaging.service");
var tasks_manager_1 = require("../../data/managers/tasks.manager");
var procedures_manager_1 = require("../../data/managers/procedures.manager");
var roles_manager_1 = require("../../data/managers/roles.manager");
var base_component_1 = require("../base-component/base-component");
var router_1 = require("@angular/router");
var AppComponent = (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent(proceduresManager, mensaje, router, tasksManager, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.mensaje = mensaje;
        _this.router = router;
        _this.tasksManager = tasksManager;
        _this.rolesManager = rolesManager;
        _this.alertaClase = 'alertNone';
        _this.message = {
            'title': '',
            'msg': '',
            'style': ''
        };
        return _this;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messagingServiceSubscription = this.mensaje.getObservable().subscribe(function (message) {
            switch (message.getChannel()) {
                case 'alerta':
                    var data = message.getData();
                    _this.message.title = data.tipo;
                    _this.message.msg = data.message;
                    _this.message.style = data.style;
                    _this.tAlerta(_this.message.style);
                    break;
            }
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.messagingServiceSubscription.unsubscribe();
    };
    AppComponent.prototype.tAlerta = function (tipo) {
        this.alertaClase = 'showAlert alert ' + tipo + '';
        var component = this;
        setTimeout(function () {
            component.alertaClase = 'notShowAlert alert ' + tipo;
        }, 5000);
    };
    AppComponent.prototype.dismissAlert = function () {
        this.alertaClase = 'notShowAlert alert ' + this.message.style;
    };
    return AppComponent;
}(base_component_1.BaseComponent));
AppComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        messaging_service_1.MessagingService,
        router_1.Router,
        tasks_manager_1.TasksManager,
        roles_manager_1.RolesManager])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map