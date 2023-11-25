"use strict";
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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var Observable_1 = require("rxjs/Observable");
var session_manager_1 = require("../managers/session.manager");
var environment_1 = require("../../../environments/environment");
var BaseService = (function () {
    function BaseService(http, sessionManager) {
        this.http = http;
        this.sessionManager = sessionManager;
        this.API_HOST = environment_1.environment.API_URL;
        this.CLIENT_SECRET = environment_1.environment.CLIENT_SECRET;
        this.API_URL_FILES = environment_1.environment.API_URL_NO_PORT + environment_1.environment.FILES_URL;
        this.API_URL_IMG = environment_1.environment.IMAGES_URL;
        this.API_IMAGES_URL_CUENCA = environment_1.environment.API_URL_NO_PORT + environment_1.environment.IMAGES_URL_CUENCA;
        this.initToken();
    }
    BaseService.prototype.initToken = function () {
        this.cuencaHeaders = new http_1.Headers({});
        this.cuencaHeadersJson = new http_1.Headers({});
        this.cuencaHeadersUpload = new http_1.Headers({});
        this.auth = this.getSession();
        if (this.auth) {
            this.cuencaHeaders.append('Authorization', this.getAuthToken());
            this.cuencaHeadersJson.append('Authorization', this.getAuthToken());
            this.cuencaHeadersJson.append('Content-Type', 'application/json');
            this.cuencaHeadersUpload.append('Authorization', this.getAuthToken());
        }
    };
    BaseService.prototype.getAuthToken = function () {
        var auth = this.getSession();
        return 'Bearer ' + auth.access_token;
    };
    BaseService.prototype.handleError = function (error) {
        return Observable_1.Observable.empty(error);
    };
    BaseService.prototype.getSession = function () {
        return this.sessionManager.getSession();
    };
    return BaseService;
}());
BaseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, session_manager_1.SessionManager])
], BaseService);
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map