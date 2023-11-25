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
require("rxjs/add/operator/toPromise");
var cuenca_verde_service_1 = require("../services/cuenca-verde.service");
var RolesManager = (function () {
    function RolesManager(cuencaVerdeService) {
        this.cuencaVerdeService = cuencaVerdeService;
        this.userRoles = [];
    }
    RolesManager.prototype.searchUserRoles = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.userRoles.length > 0) {
                resolve(_this.userRoles);
            }
            else {
                _this.cuencaVerdeService.getRoleUser()
                    .then(function (response) {
                    if (response instanceof Array) {
                        if (response.length > 0 && response[0].role) {
                            _this.userRoles.push(Number(response[0].role));
                            resolve(_this.userRoles);
                        }
                    }
                }, function (reason) {
                    reject(reason);
                });
            }
        });
    };
    RolesManager.prototype.getAllRoles = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.roles != null) {
                resolve(_this.roles);
            }
            else {
                _this.cuencaVerdeService.getRoles()
                    .then(function (response) {
                    if (response instanceof Array) {
                        _this.roles = response;
                        resolve(response);
                    }
                })
                    .catch(reject);
            }
        });
    };
    RolesManager.prototype.getOpenRoles = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.openRoles != null) {
                resolve(_this.openRoles);
            }
            else {
                _this.cuencaVerdeService.getOpenRoles()
                    .then(function (response) {
                    if (response instanceof Array) {
                        _this.openRoles = response;
                        resolve(response);
                    }
                })
                    .catch(reject);
            }
        });
    };
    RolesManager.prototype.getRolesEquipo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.roles != null) {
                resolve(_this.roles);
            }
            else {
                _this.cuencaVerdeService.getRolesEquipo()
                    .then(function (response) {
                    if (response instanceof Array) {
                        _this.roles = response;
                        resolve(response);
                    }
                })
                    .catch(reject);
            }
        });
    };
    return RolesManager;
}());
RolesManager = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [cuenca_verde_service_1.CuencaVerdeService])
], RolesManager);
exports.RolesManager = RolesManager;
//# sourceMappingURL=roles.manager.js.map