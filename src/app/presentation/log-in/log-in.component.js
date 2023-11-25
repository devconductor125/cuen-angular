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
var base_component_1 = require("../base-component/base-component");
var log_in_1 = require("../../data/model/log-in");
var router_1 = require("@angular/router");
var procedures_manager_1 = require("../../data/managers/procedures.manager");
var auth_service_1 = require("../../data/services/auth.service");
var cuenca_verde_service_1 = require("../../data/services/cuenca-verde.service");
var roles_manager_1 = require("../../data/managers/roles.manager");
var messaging_service_1 = require("../../data/services/messaging.service");
var LogInComponent = (function (_super) {
    __extends(LogInComponent, _super);
    function LogInComponent(authService, cuencaVerdeService, proceduresManager, router, rolesManager, messagingService) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.authService = authService;
        _this.cuencaVerdeService = cuencaVerdeService;
        _this.proceduresManager = proceduresManager;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.messagingService = messagingService;
        return _this;
    }
    LogInComponent.prototype.ngOnInit = function () {
        this.logIn = new log_in_1.LogIn();
        this.logIn.username = '';
        this.logIn.password = '';
    };
    LogInComponent.prototype.logInClick = function () {
        var _this = this;
        var component = this;
        if (!this.logIn.username || this.logIn.username.length === 0) {
            var message = {
                'tipo': 'Error',
                'message': 'No puede enviar el campo "Correo Electrónico" vacío',
                'style': 'alert-warning'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.logIn.password || this.logIn.password.length === 0) {
            var message = {
                'tipo': 'Error',
                'message': 'No puede enviar el campo "Clave" vacío',
                'style': 'alert-warning'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        this.authService.logIn(this.logIn)
            .then(function () {
            _this.authService.initToken();
            _this.cuencaVerdeService.initToken();
            _this.goToDashboard();
        }, function (reason) {
            var message = {
                'tipo': 'Error',
                'message': 'Correo Electrónico o Clave incorrecta',
                'style': 'alert-danger'
            };
            component.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        });
    };
    LogInComponent.prototype.goToDashboard = function () {
        var link = ['/app'];
        this.router.navigate(link);
    };
    return LogInComponent;
}(base_component_1.BaseComponent));
LogInComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-log-in',
        templateUrl: './log-in.component.html',
        styleUrls: ['./log-in.component.css']
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        cuenca_verde_service_1.CuencaVerdeService,
        procedures_manager_1.ProceduresManager,
        router_1.Router,
        roles_manager_1.RolesManager,
        messaging_service_1.MessagingService])
], LogInComponent);
exports.LogInComponent = LogInComponent;
//# sourceMappingURL=log-in.component.js.map