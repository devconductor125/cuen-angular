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
var cuenca_verde_service_object_mapper_1 = require("../services/cuenca-verde-service-object-mapper");
var ContractorsManager = (function (_super) {
    __extends(ContractorsManager, _super);
    function ContractorsManager(cuencaVerdeService) {
        var _this = _super.call(this) || this;
        _this.cuencaVerdeService = cuencaVerdeService;
        return _this;
    }
    ContractorsManager.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getContractors()
                .then(function (contractors) {
                resolve(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapContractsListToRequest(contractors));
            })
                .catch(reject);
        });
    };
    ContractorsManager.prototype.addAll = function (objects) {
        var component = this;
        this.clearObjects();
        objects.forEach(function (poolOfContracts) {
            component.retrieveInstance(poolOfContracts.id, poolOfContracts);
        });
    };
    ContractorsManager.prototype.load = function (objectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getContractor(objectId)
                .then(function (contractor) {
                resolve(cuenca_verde_service_object_mapper_1.CuencaVerdeServiceObjectMapper.mapContractorObjects(contractor));
            })
                .catch(reject);
        });
    };
    ContractorsManager.prototype.create = function (contractor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.createContratista(contractor)
                .then(function (response) {
                if (response.response_code === 200) {
                    contractor.id = response.object_id;
                    _this.pool = _this.unShiftPool(String(contractor.id), contractor, _this.pool);
                    resolve(contractor);
                }
                else {
                    reject(response.errors[0][0]);
                }
            })
                .catch(reject);
        });
    };
    ContractorsManager.prototype.update = function (contractor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.updateContractor(contractor)
                .then(function (response) {
                if (response.response_code === 200) {
                    _this.clearObjects();
                    _this.loadAllObjects()
                        .then(function () {
                        _this.retrieveInstance(String(contractor.id), contractor);
                        resolve(response);
                    });
                }
                else {
                    reject(response.errors[0][0]);
                }
            })
                .catch(reject);
        });
    };
    ContractorsManager.prototype.deleteObject = function (contractor) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    ContractorsManager.prototype.getObjectForEdit = function (objectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var contractor = _this.search(objectId);
            if (contractor && contractor.id) {
                resolve(contractor);
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
    ContractorsManager.prototype.getContractorDetails = function (contract_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getContractorDetails(contract_id)
                .then(function (contract) { return resolve(contract); })
                .catch(reject);
        });
    };
    ContractorsManager.prototype.getAllContractorFiles = function (contractor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getFilesContractor(contractor)
                .then(function (contractorFile) { return resolve(contractorFile); })
                .catch(reject);
        });
    };
    return ContractorsManager;
}(base_manager_1.BaseManager));
ContractorsManager = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [cuenca_verde_service_1.CuencaVerdeService])
], ContractorsManager);
exports.ContractorsManager = ContractorsManager;
//# sourceMappingURL=contractors.manager.js.map