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
var base_manager_1 = require("./base.manager");
var cuenca_verde_service_1 = require("../services/cuenca-verde.service");
var PoolOfContractsManager = (function (_super) {
    __extends(PoolOfContractsManager, _super);
    function PoolOfContractsManager(cuencaVerdeService) {
        var _this = _super.call(this) || this;
        _this.cuencaVerdeService = cuencaVerdeService;
        return _this;
    }
    PoolOfContractsManager.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getPoolsOfContracts()
                .then(function (poolsOfContracts) {
                resolve(poolsOfContracts);
            })
                .catch(reject);
        });
    };
    PoolOfContractsManager.prototype.addAll = function (objects) {
        var component = this;
        this.clearObjects();
        objects.forEach(function (poolOfContracts) {
            component.retrieveInstance(poolOfContracts.id, poolOfContracts);
        });
    };
    PoolOfContractsManager.prototype.load = function (objectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getPoolOfContracts(objectId)
                .then(function (poolOfContracts) {
                _this.retrieveInstance(String(poolOfContracts.id), poolOfContracts);
                resolve(poolOfContracts);
            })
                .catch(reject);
        });
    };
    PoolOfContractsManager.prototype.create = function (poolOfContracts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.createPoolOfContracts(poolOfContracts)
                .then(function (response) {
                if (response.response_code === 200) {
                    _this.clearObjects();
                    _this.loadAllObjects()
                        .then(function () {
                        resolve(true);
                    });
                }
            })
                .catch(reject);
        });
    };
    PoolOfContractsManager.prototype.update = function (poolOfContracts, objeto) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.updatePoolOfContracts(objeto)
                .then(function (response) {
                if (response.response_code === 200) {
                    _this.clearObjects();
                    _this.loadAllObjects()
                        .then(function () {
                        _this.retrieveInstance(String(poolOfContracts.id), poolOfContracts);
                        resolve();
                    });
                }
                else {
                    reject();
                }
            })
                .catch(reject);
        });
    };
    PoolOfContractsManager.prototype.deleteObject = function (poolOfContracts) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    PoolOfContractsManager.prototype.getObjectForEdit = function (objectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var poolOfContracts = _this.search(objectId);
            if (poolOfContracts) {
                resolve(poolOfContracts);
            }
            else {
                _this.load(objectId)
                    .then(function (returnedObject) {
                    resolve(returnedObject);
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
        });
    };
    return PoolOfContractsManager;
}(base_manager_1.BaseManager));
PoolOfContractsManager = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [cuenca_verde_service_1.CuencaVerdeService])
], PoolOfContractsManager);
exports.PoolOfContractsManager = PoolOfContractsManager;
//# sourceMappingURL=pool-of-contracts.manager.js.map