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
var predio_info_1 = require("../model/predio-info");
var ProceduresManager = (function (_super) {
    __extends(ProceduresManager, _super);
    function ProceduresManager(cuencaVerdeService) {
        var _this = _super.call(this) || this;
        _this.cuencaVerdeService = cuencaVerdeService;
        _this.geoJsonList = [];
        return _this;
    }
    ProceduresManager.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getProcedures()
                .then(function (procedures) { return resolve(procedures); })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.getPrograms = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.programs != null) {
                resolve(_this.programs);
            }
            else {
                _this.cuencaVerdeService.getPrograms()
                    .then(function (programs) {
                    if (programs instanceof Array) {
                        _this.programs = programs;
                        resolve(programs);
                    }
                })
                    .catch(reject);
            }
        });
    };
    ProceduresManager.prototype.addAll = function (objects) {
        var component = this;
        this.clearObjects();
        objects.forEach(function (procedure) {
            procedure.setProgressBarAnimationValues();
            component.retrieveInstance(String(procedure.id), procedure);
        });
    };
    ProceduresManager.prototype.getObjectCount = function () {
        return this.getObjectsFromCache().length;
    };
    ProceduresManager.prototype.clearGeoJsonCache = function () {
        this.geoJsonList = [];
    };
    ProceduresManager.prototype.addToCurrentGeoJsonList = function (geoJson) {
        this.geoJsonList.push(geoJson);
    };
    ProceduresManager.prototype.getCurrentGeoJsonList = function () {
        return this.geoJsonList;
    };
    ProceduresManager.prototype.getProcedureTasks = function (projectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var resultProject = _this.fetchObject(projectId);
            if (resultProject.hasGotTasks()) {
                resolve(resultProject.getTasks());
            }
            else {
                _this.cuencaVerdeService.getProjectTasks(projectId)
                    .then(function (response) {
                    if (response instanceof Array) {
                        resultProject.tasks = response;
                        _this.addObject(String(resultProject.id), resultProject);
                        resolve(response);
                    }
                })
                    .catch(reject);
            }
        });
    };
    ProceduresManager.prototype.getProcedureAllTasks = function (projectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getProjectAllTasks(projectId)
                .then(function (response) {
                resolve(response);
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.getObjectForEdit = function (objectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var procedure = _this.search(objectId);
            if (procedure && procedure.program && procedure.project && procedure.activities) {
                resolve(procedure);
            }
            else {
                if (procedure) {
                    _this.load(objectId)
                        .then(function (returnedProcedure) {
                        returnedProcedure.subTypeStep = procedure.subTypeStep;
                        returnedProcedure.subTypeTotal = procedure.subTypeTotal + 1;
                        returnedProcedure.animationDelay = procedure.animationDelay;
                        returnedProcedure.animationDuration = procedure.animationDuration;
                        _this.retrieveInstance(String(returnedProcedure.id), returnedProcedure);
                        resolve(returnedProcedure);
                    })
                        .catch(function (error) {
                        reject(error);
                    });
                }
            }
        });
    };
    ProceduresManager.prototype.load = function (objectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getProcedure(objectId)
                .then(function (procedure) {
                _this.retrieveInstance(String(procedure.id), procedure);
                resolve(procedure);
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.create = function (procedure) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.createProcedure(procedure)
                .then(function (response) {
                if (response.object_id) {
                    _this.pool = {};
                    _this.loadAllObjects();
                    resolve(procedure);
                }
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.update = function (procedure) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.updateProcedure(procedure)
                .then(function (success) {
                _this.retrieveInstance(String(procedure.id), procedure);
                resolve(success);
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.deleteObject = function (procedure) {
        return new Promise(function (resolve, reject) {
            resolve();
            /*this.cuencaVerdeService.deleteProcedure(String(procedure.id))
             .then(success => {
             if (success) {
             this.removeObject(String(procedure.id));
             }
             resolve(success);
             })
             .catch(reject);*/
        });
    };
    ProceduresManager.prototype.getUsers = function (rolId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getUsers(rolId)
                .then(function (response) {
                if (response instanceof Array) {
                    resolve(response);
                }
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.getProcedureTasksAndPredio = function (idProcess) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getProcedureTasksAndPredio(idProcess)
                .then(function (response) {
                resolve(response);
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.bugdetByProcess = function (idProcess) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.bugdetByProcess(idProcess)
                .then(function (response) {
                resolve(response);
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.getInterventionProcess = function (idProcess) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getInterventionProcess(idProcess)
                .then(function (response) {
                resolve(response);
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.getProgramProjects = function (programId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getProgramProjects(programId)
                .then(function (response) {
                if (response instanceof Array) {
                    resolve(response);
                }
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.getProjectActivities = function (projectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getProjectActivities(projectId)
                .then(function (response) {
                if (response instanceof Array) {
                    resolve(response);
                }
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.getPredioById = function (predioId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getPredioById(predioId)
                .then(function (response) {
                if (response instanceof predio_info_1.PredioInfo) {
                    resolve(response);
                }
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.getPoolOfContractsProcedures = function (poolId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getPoolOfContractsProcedures(poolId)
                .then(function (response) {
                if (response instanceof Array) {
                    resolve(response);
                }
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.getProceduresWithActionsForPool = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getProceduresWithActionsForPool()
                .then(function (response) {
                if (response instanceof Array) {
                    resolve(response);
                }
            })
                .catch(reject);
        });
    };
    ProceduresManager.prototype.getPercentageData = function (procedureId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getPercentageData(procedureId)
                .then(resolve)
                .catch(reject);
        });
    };
    return ProceduresManager;
}(base_manager_1.BaseManager));
ProceduresManager = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [cuenca_verde_service_1.CuencaVerdeService])
], ProceduresManager);
exports.ProceduresManager = ProceduresManager;
//# sourceMappingURL=procedures.manager.js.map