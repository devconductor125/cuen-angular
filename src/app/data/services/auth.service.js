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
require("rxjs/add/operator/toPromise");
var base_service_1 = require("./base.service");
var angular2_jwt_1 = require("angular2-jwt");
var session_manager_1 = require("../managers/session.manager");
var http_1 = require("@angular/http");
var cuenca_verde_service_object_mapper_1 = require("./cuenca-verde-service-object-mapper");
var q_1 = require("q");
var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService(http, sessionManager) {
        var _this = _super.call(this, http, sessionManager) || this;
        _this.http = http;
        _this.sessionManager = sessionManager;
        _this.CLIENT_ID = '2';
        return _this;
    }
    AuthService.prototype.getSession = function () {
        return this.sessionManager.getSession();
    };
    AuthService.prototype.logIn = function (logIn) {
        var formData = new FormData();
        formData.append('client_id', this.CLIENT_ID);
        formData.append('client_secret', this.CLIENT_SECRET);
        formData.append('grant_type', 'password');
        formData.append('username', logIn.username);
        formData.append('password', logIn.password);
        var url = this.API_HOST + "/oauth/token";
        return this.http
            .post(url, formData)
            .toPromise()
            .then(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapResponseToToken)
            .then(this.sessionManager.setSession)
            .catch(q_1.reject);
    };
    AuthService.prototype.isAuthenticated = function () {
        var token = this.sessionManager.getSession();
        return angular2_jwt_1.tokenNotExpired(null, token != null ? token.access_token : '');
    };
    AuthService.prototype.logOut = function () {
        this.sessionManager.deleteSession();
        var formData = new FormData();
        var url = this.API_HOST + "/logout";
        return this.http
            .get(url, this.cuencaHeaders)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    return AuthService;
}(base_service_1.BaseService));
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, session_manager_1.SessionManager])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map