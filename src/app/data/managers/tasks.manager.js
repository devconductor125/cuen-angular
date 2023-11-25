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
var ErrorObservable_1 = require("rxjs/observable/ErrorObservable");
var subtype_1 = require("../model/subtype");
var TasksManager = (function (_super) {
    __extends(TasksManager, _super);
    function TasksManager(cuencaVerdeService) {
        var _this = _super.call(this) || this;
        _this.cuencaVerdeService = cuencaVerdeService;
        return _this;
    }
    TasksManager.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getAllTasks()
                .subscribe(resolve, reject);
        });
    };
    TasksManager.prototype.getAllTaskFiles = function (task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getFiles(task)
                .then(function (tasks) { return resolve(tasks); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getTotalForCordinations = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getTotalForCordinations()
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getAllAssociated = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getAllAssociated()
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.deleteProject = function (idProject) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.deleteProject(idProject)
                .then(function (response) {
                if (response.response_code === 500) {
                    reject(response.message);
                }
                else {
                    resolve();
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.deleteActivity = function (idActivity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.deleteProject(idActivity)
                .then(function (response) {
                if (response.response_code === 500) {
                    reject(response.message);
                }
                else {
                    resolve();
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.insertProject = function (project, idProgram) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.insertProject(project, idProgram)
                .then(function (response) {
                if (response.response_code === 500) {
                    reject(response.message);
                }
                else {
                    resolve();
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.insertActivityByProject = function (activity, idProject) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.insertActivityByProject(activity, idProject)
                .then(function (response) {
                if (response.response_code === 500) {
                    reject(response.message);
                }
                else {
                    resolve();
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.insertAssociated = function (aporte) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.insertAssociated(aporte)
                .then(function (response) {
                if (response.response_code === 500) {
                    reject(response.message);
                }
                else {
                    resolve();
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.updateAssociated = function (aporte) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.updateAporte(aporte)
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.traslateAporte = function (objeto) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.traslateAporte(objeto)
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getAllAportes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getAllAportes()
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getAllMetas = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getAllMetas()
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getAportesEspecies = function (idAporte) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getAportesEspecie(idAporte)
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getAporteForId = function (idAporte) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getAporteForId(idAporte)
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getModalityC = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getContractModality()
                .then(function (contractModality) { return resolve(contractModality); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getActionsAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getActionsAll()
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getMaterials = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getMaterials()
                .then(function (contractModality) { return resolve(contractModality); })
                .catch(reject);
        });
    };
    TasksManager.prototype.servOneSignal = function (ID_OneSignal) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.servOneSignal(ID_OneSignal)
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getContractorsCategorias = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getContractorsCategorias()
                .then(function (contractModality) { return resolve(contractModality); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getContractType = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getContractType()
                .then(function (ContractType) { return resolve(ContractType); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getTaskForExecution = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getTaskForExecution()
                .then(function (ContractType) { return resolve(ContractType); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getGuarantee = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getGuarantee()
                .then(function (guarantee) { return resolve(guarantee); })
                .catch(reject);
        });
    };
    TasksManager.prototype.removeFileTask = function (id, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.removeFile(id, type)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getTaskTypes = function (procedureId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getTaskTypes(procedureId)
                .then(function (taskTypes) {
                resolve(taskTypes);
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.aproveTaskCooA = function (task_id, user_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.aproveTaskCooA(task_id, user_id)
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getTaskTypesEdit = function (procedureId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getTaskTypesEdit(procedureId)
                .then(function (taskTypes) {
                resolve(taskTypes);
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.addAll = function (objects) {
        var component = this;
        this.clearObjects();
        objects.forEach(function (task) {
            component.retrieveInstance(String(task.route), task);
        });
    };
    TasksManager.prototype.getGeoJsonFromTaskId = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getGeoJson(taskId)
                .then(function (geoJson) {
                if (!(geoJson instanceof ErrorObservable_1.ErrorObservable)) {
                    if (Number(taskId) > 0) {
                        resolve(geoJson);
                    }
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.load = function (objectId) {
        var _this = this;
        if (objectId.includes('carta')) {
            return new Promise(function (resolve, reject) {
                _this.cuencaVerdeService.getCartaIntencionForEdit(objectId)
                    .then(function (task) {
                    task.startdate = task.startdate ? task.startdate.split(' ')[0] : '';
                    task.deadline = task.deadline ? task.deadline.split(' ')[0] : '';
                    var subType = new subtype_1.Subtype();
                    subType.name = 'Carta de intención';
                    task.sub_type = subType;
                    task.route = task.id + '_carta';
                    _this.retrieveInstance(String(task.route), task);
                    resolve(task);
                })
                    .catch(reject);
            });
        }
        else if (objectId.includes('open')) {
            return new Promise(function (resolve, reject) {
                _this.cuencaVerdeService.getOpenTaskForEdit(objectId)
                    .then(function (task) {
                    task.startdate = task.startdate ? task.startdate.split(' ')[0] : '';
                    task.deadline = task.deadline ? task.deadline.split(' ')[0] : '';
                    var subType = new subtype_1.Subtype();
                    subType.name = 'Tarea abierta';
                    task.sub_type = subType;
                    task.route = task.id + '_open';
                    _this.retrieveInstance(String(task.route), task);
                    resolve(task);
                })
                    .catch(reject);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.cuencaVerdeService.getTask(objectId)
                    .then(function (task) {
                    task.startdate = task.startdate ? task.startdate.split(' ')[0] : '';
                    task.deadline = task.deadline ? task.deadline.split(' ')[0] : '';
                    if (task.date_start) {
                        task.startdate = task.date_start.split(' ')[0];
                    }
                    if (task.date_end) {
                        task.deadline = task.date_end.split(' ')[0];
                    }
                    task.route = task.id;
                    _this.retrieveInstance(String(task.route), task);
                    resolve(task);
                })
                    .catch(reject);
            });
        }
    };
    TasksManager.prototype.create = function (task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.createTask(task)
                .then(function (response) {
                task.id = response.object_id;
                task.sub_type = new subtype_1.Subtype();
                task.sub_type.id = response.sub_type_id;
                task.sub_type.name = response.sub_type_name;
                var key;
                if (task.taskType) {
                    key = Number(task.taskType.id) === 5 ? String(task.id) + '_carta' : String(task.id);
                }
                else {
                    key = task.open ? String(task.id) + '_open' : String(task.id);
                }
                _this.pool = {};
                resolve(task);
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.update = function (task) {
        var _this = this;
        if (String(task.taskType.id) === '5') {
            return new Promise(function (resolve, reject) {
                _this.cuencaVerdeService.updateCartaIntencion(task)
                    .then(function (success) {
                    _this.clearObjects();
                    _this.loadAllObjects()
                        .then(function () {
                        var subType = new subtype_1.Subtype();
                        subType.name = 'Carta de intención';
                        task.sub_type = subType;
                        task.route = task.id + '_carta';
                        _this.pool = {};
                        resolve(success);
                    });
                })
                    .catch(reject);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.cuencaVerdeService.updateTask(task)
                    .then(function (success) {
                    _this.clearObjects();
                    _this.loadAllObjects()
                        .then(function () {
                        _this.retrieveInstance(String(task.route), task);
                        resolve(success);
                    });
                })
                    .catch(reject);
            });
        }
    };
    TasksManager.prototype.asignarAsociados = function (objeto) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.asignarAsociados(objeto)
                .then(function (response) {
                resolve(response);
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.deleteObject = function (task) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    TasksManager.prototype.filterAporte = function (objeto) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.filterAporte(objeto)
                .then(function (objetoFilter) { return resolve(objetoFilter); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getTaskDetails = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getTaskDetails(taskId)
                .then(function (task) { return resolve(task); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getTaskHistory = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getTaskHistory()
                .then(function (task) { return resolve(task); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getGeoJsonByProcedure = function (procedure) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getGeoJsonByProcedure(procedure)
                .then(function (geoJson) { return resolve(geoJson); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getActionHash = function (hash) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getActionHash(hash)
                .then(function (action) { return resolve(action); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getMonitoreosCalendar = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getMonitoreosCalendar()
                .then(function (task) { return resolve(task); })
                .catch(reject);
        });
    };
    TasksManager.prototype.crearCertificado = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.crearCertificado(taskId)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.enviarCertificado = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.enviarCertificado(taskId)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.cancelarTask = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.cancelarTask(taskId)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.returnTask = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.returnTask(taskId)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.returnTaskFinanciero = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.returnTaskFinanciero(taskId)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getAllComments = function (task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getCommentbyIdTask(task)
                .then(function (comments) { return resolve(comments); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getAllMonitoreoComments = function (monitoreoDetail) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getCommentByMonitoreoId(monitoreoDetail)
                .then(function (comments) { return resolve(comments); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getTypeMonitor = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getTypeMonitor()
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.insertComment = function (comment) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.insertCommentsTask(comment)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.insertMonitoreoComment = function (comment) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.insertMonitoreoComment(comment)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.insertCommentMonitoreoCalendar = function (comment) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.insertCommentMonitoreoCalendar(comment)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getObjectForEdit = function (objectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var task = _this.search(objectId);
            if (task && task.user) {
                resolve(task);
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
    TasksManager.prototype.getSurveyFromTaskId = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getSurvey(taskId)
                .then(function (property) { return resolve(property); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getBudgetFromTaskId = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getBudget(taskId)
                .then(function (budget) {
                if (budget instanceof Array) {
                    resolve(budget);
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.getAllBudgets = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getAllBudgets()
                .then(function (budgets) {
                if (budgets instanceof Array) {
                    resolve(budgets);
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.approveTask = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.approveTask(String(taskId))
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.crearMonitor = function (monitor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.crearMonitor(monitor)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.crearMetas = function (meta) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.crearMetas(meta)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.crearMonitorCalendar = function (monitor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.crearMonitorCalendar(monitor)
                .then(function (response) {
                if (response.response_code === 200) {
                    resolve();
                }
                else {
                    reject(response.message);
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.crearExecutionTask = function (objeto) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.crearExecutionTask(objeto)
                .then(function (response) {
                if (response.code === 200) {
                    resolve();
                }
                else {
                    reject(response.message);
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.getExecutionTask = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getExecutionTask()
                .then(function (response) {
                if (response.length > 0) {
                    resolve(response);
                }
                else {
                    reject();
                }
            })
                .catch(reject);
        });
    };
    ///////// Proyectos get list ALL
    TasksManager.prototype.getListProjectsAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getListProjectsAll()
                .then(function (response) {
                if (response.length > 0) {
                    resolve(response);
                }
                else {
                    reject();
                }
            })
                .catch(reject);
        });
    };
    ///////// Proyectos get list by IDPROGRAM
    TasksManager.prototype.getListProjects = function (idProgram) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getListProjects(idProgram)
                .then(function (response) {
                if (response.length > 0) {
                    resolve(response);
                }
                else {
                    reject();
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.getListUsers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getListUsers()
                .then(function (response) {
                if (response.length > 0) {
                    resolve(response);
                }
                else {
                    reject();
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.getListPrograms = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getListPrograms()
                .then(function (response) {
                if (response.length > 0) {
                    resolve(response);
                }
                else {
                    reject();
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.getExecutionTaskById = function (idExecution) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getExecutionTaskById(idExecution)
                .then(function (response) {
                resolve(response);
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.getMonitorFromId = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getMonitorFromId(id)
                .then(function (monitor) { return resolve(monitor); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getMonitorFromIdCalendar = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getMonitorFromIdCalendar(id)
                .then(function (monitor) { return resolve(monitor); })
                .catch(reject);
        });
    };
    TasksManager.prototype.updateMonitorCalendar = function (monitor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.updateMonitorCalendar(monitor)
                .then(function (response) {
                if (response.response_code === 200) {
                    resolve();
                }
                else {
                    reject(response.message);
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.getMonitoreos = function (task_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getMonitoreos(task_id)
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getTaskOvercome = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getTaskOvercome()
                .then(function (response) {
                if (response instanceof Array) {
                    resolve(response);
                }
                else {
                    reject();
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.getMonitoreoDetail = function (monitoreoId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getMonitoreoDetail(monitoreoId)
                .then(function (response) { return resolve(response); })
                .catch(reject);
        });
    };
    TasksManager.prototype.deleteMonitoreos = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.deleteMonitoreos(id)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.deleteMetas = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.deleteMetas(id)
                .then(function () { return resolve(); })
                .catch(reject);
        });
    };
    TasksManager.prototype.getCartaIntencion = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getCartaIntencion(taskId)
                .then(function (response) {
                if (response.code === 500) {
                    reject(response.message);
                }
                else {
                    resolve(response);
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.getCartaStard = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getCartaStard(taskId)
                .then(function (response) {
                if (response.code === 500) {
                    reject(response.message);
                }
                else {
                    resolve(response);
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.getMinuta = function (taskId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getMinuta(taskId)
                .then(function (response) {
                if (response.code === 500) {
                    reject(response.message);
                }
                else {
                    resolve(response);
                }
            })
                .catch(reject);
        });
    };
    TasksManager.prototype.getActivities = function (procedure) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaVerdeService.getActivities(procedure.id)
                .then(function (activities) {
                resolve(activities);
            })
                .catch(reject);
        });
    };
    return TasksManager;
}(base_manager_1.BaseManager));
TasksManager = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [cuenca_verde_service_1.CuencaVerdeService])
], TasksManager);
exports.TasksManager = TasksManager;
//# sourceMappingURL=tasks.manager.js.map