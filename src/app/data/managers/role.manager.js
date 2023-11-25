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
var RoleManager = (function () {
    function RoleManager(cuencaVerdeService) {
        this.cuencaVerdeService = cuencaVerdeService;
        this.permisosUser = [];
    }
    RoleManager.prototype.searchRol = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getRoleUser()
                .then(function (response) {
                _this.permisosUser = response.json();
                resolve();
            }, function (reason) {
                reject(reason);
            });
        });
    };
    RoleManager.prototype.comprobarEntidad = function (entidad) {
        var result = false;
        this.permisosUser.forEach(function (rowPermisos) {
            if (entidad === rowPermisos.entity) {
                result = true;
            }
        });
        return result;
    };
    RoleManager.prototype.comprobarPermiso = function (entidad, permiso) {
        var result = false;
        this.permisosUser.forEach(function (rowPermisos) {
            if (entidad === rowPermisos.entity && permiso === rowPermisos.permission) {
                result = true;
            }
        });
        return result;
    };
    RoleManager.prototype.getRol = function () {
        var result;
        if (this.permisosUser.length === 0) {
            result = null;
        }
        else {
            result = this.permisosUser[0].role;
        }
        return result;
    };
    return RoleManager;
}());
RoleManager.COORDINADOR = '3';
RoleManager.EQUIPO_SEGUIMIENTO = '7';
RoleManager.GERENCIA = '8';
RoleManager = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [cuenca_verde_service_1.CuencaVerdeService])
], RoleManager);
exports.RoleManager = RoleManager;
//# sourceMappingURL=role.manager.js.map
