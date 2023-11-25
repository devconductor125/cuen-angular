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
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var router_1 = require("@angular/router");
var base_component_1 = require("../../base-component/base-component");
var messaging_service_1 = require("../../../data/services/messaging.service");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var task_1 = require("../../../data/model/task");
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var CreateTaskComponent = (function (_super) {
    __extends(CreateTaskComponent, _super);
    function CreateTaskComponent(messagingService, proceduresManager, tasksManager, router, activatedRoute, cuencaServices, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.cuencaServices = cuencaServices;
        _this.rolesManager = rolesManager;
        _this.procedures = [];
        _this.activities = [];
        _this.roles = [];
        _this.users = [];
        _this.predios = [];
        _this.task = new task_1.Task();
        _this.labelPredio = '';
        _this.existPredio = false;
        _this.noSelect = true;
        _this.showExtraFields = true;
        return _this;
    }
    CreateTaskComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.tasksManager.loadAllObjects();
        this.getPredios();
        this.getProcedures(this)
            .then(this.getRoles);
    };
    CreateTaskComponent.prototype.onGotRoles = function () {
        this.onDataLoaded();
    };
    CreateTaskComponent.prototype.onDataLoaded = function () {
    };
    CreateTaskComponent.prototype.getProcedures = function (component) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.proceduresManager.loadAllObjects()
                .then(function (procedures) {
                if (procedures.length === 0 || procedures[0].id !== 0) {
                    var placeholder = _this.getCustomPlaceholder('Selecciona un procedimiento');
                    procedures.unshift(placeholder);
                }
                _this.procedures = procedures;
                _this.task.procedure = procedures[0];
                resolve(component);
            });
        });
    };
    CreateTaskComponent.prototype.getPredios = function () {
        var _this = this;
        var component = this;
        return new Promise(function (resolve, reject) {
            _this.cuencaServices.getPredios()
                .then(function (p) {
                _this.predios = p;
                resolve(component);
            });
        });
    };
    CreateTaskComponent.prototype.getRolesOnOpenStateChanged = function () {
        if (this.task.open) {
            this.getOpenRoles(this);
        }
        else {
            this.getRoles(this);
        }
    };
    CreateTaskComponent.prototype.getRoles = function (component) {
        return new Promise(function (resolve) {
            component.rolesManager.getAllRoles()
                .then(function (roles) {
                if (roles.length > 0) {
                    if (roles[0].id !== 0) {
                        var placeholder = component.getCustomPlaceholder('Selecciona un rol');
                        roles.unshift(placeholder);
                    }
                    component.roles = roles;
                    component.task.role = roles[0];
                    resolve(component);
                    component.onDataLoaded();
                }
            });
        });
    };
    CreateTaskComponent.prototype.getOpenRoles = function (component) {
        return new Promise(function (resolve) {
            component.rolesManager.getOpenRoles()
                .then(function (roles) {
                if (roles.length > 0) {
                    if (roles[0].id !== 0) {
                        var placeholder = component.getCustomPlaceholder('Selecciona un rol');
                        roles.unshift(placeholder);
                    }
                    component.roles = roles;
                    component.task.role = roles[0];
                    resolve(component);
                    component.onDataLoaded();
                }
            });
        });
    };
    CreateTaskComponent.prototype.getUsers = function () {
        var component = this;
        this.users = [];
        return new Promise(function (resolve) {
            component.proceduresManager.getUsers(component.task.role.id)
                .then(function (users) {
                if (users.length > 0) {
                    var placeholder = component.getCustomPlaceholder('Selecciona un usuario');
                    users.unshift(placeholder);
                    if (!component.task.id) {
                        component.task.user = users[0];
                    }
                    component.users = users;
                    component.users.forEach(function (user) {
                        if (user.id === component.task.user.id) {
                            component.task.user = user;
                        }
                    });
                    resolve();
                }
            });
        });
    };
    CreateTaskComponent.prototype.selectPredio = function (name) {
        this.labelPredio = name;
    };
    CreateTaskComponent.prototype.getActivities = function () {
        var _this = this;
        this.tasksManager.getActivities(this.task.procedure)
            .then(function (activities) {
            if (activities instanceof Array) {
                _this.activities = activities;
            }
        });
    };
    CreateTaskComponent.prototype.getTaskTypes = function () {
        var _this = this;
        var component = this;
        return new Promise(function (resolve, reject) {
            if (Number(component.task.procedure.id) === 0) {
                _this.taskTypes = null;
                reject();
            }
            _this.tasksManager.getTaskTypes(Number(component.task.procedure.id))
                .then(function (taskTypes) {
                if (taskTypes instanceof Array) {
                    _this.taskTypes = taskTypes;
                    if (!component.task.id) {
                        var placeholder = _this.getCustomPlaceholder('Selecciona un tipo de tarea');
                        taskTypes.unshift(placeholder);
                        _this.task.taskType = placeholder;
                    }
                    else {
                        _this.task.taskType = taskTypes[0];
                    }
                }
            });
        });
    };
    CreateTaskComponent.prototype.getProcedurePredios = function () {
        var _this = this;
        var component = this;
        this.cuencaServices.getPrediosProc(Number(component.task.procedure.id))
            .then(function (predios) {
            if (Number(component.task.procedure.id) > 0) {
                if (predios[0].select) {
                    component.existPredio = true;
                    component.task.property = predios[1].id;
                    component.labelPredio = predios[1].property_name;
                    component.noSelect = false;
                }
                else {
                    component.existPredio = false;
                    component.task.property = null;
                    component.noSelect = false;
                    _this.getPredios()
                        .then();
                }
            }
            else {
                component.predios = null;
                component.task.property = null;
                component.existPredio = false;
                component.noSelect = true;
            }
        });
    };
    CreateTaskComponent.prototype.createTask = function () {
        var _this = this;
        if (this.isValidTask()) {
            this.tasksManager.create(this.task)
                .then(function (task) {
                if (task.id) {
                    var message = {
                        'tipo': 'Registrada',
                        'message': 'La tarea ha sido registrada satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/tasks'];
                    _this.router.navigate(link);
                }
            });
        }
    };
    CreateTaskComponent.prototype.isValidTask = function () {
        if (Number(this.task.procedure.id) <= 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona un Procedimiento',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.showExtraFields) {
            if ((!this.task.property || this.task.property.length === 0) && !this.task.open) {
                var message = {
                    'tipo': 'Error: ',
                    'message': 'Selecciona un Predio',
                    'style': 'alert-danger'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                return false;
            }
            if (!this.task.startdate) {
                var message = {
                    'tipo': 'Error: ',
                    'message': 'Selecciona la fecha de inicio',
                    'style': 'alert-danger'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                return false;
            }
            if (!this.task.option_date && !this.task.deadline) {
                var message = {
                    'tipo': 'Error: ',
                    'message': 'Selecciona la fecha de finalización',
                    'style': 'alert-danger'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                return false;
            }
            if (!this.task.description || this.task.description.length === 0) {
                var message = {
                    'tipo': 'Error: ',
                    'message': 'Ingresa la descripción de la tarea',
                    'style': 'alert-danger'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                return false;
            }
        }
        if (!this.task.open) {
            if (this.task.taskType) {
                if (Number(this.task.taskType.id) <= 0) {
                    var message = {
                        'tipo': 'Error: ',
                        'message': 'Selecciona un tipo de tarea',
                        'style': 'alert-danger'
                    };
                    this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    return false;
                }
                this.task.title = this.task.taskType.name;
            }
        }
        if (!this.task.role || Number(this.task.role.id) === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona un rol',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.task.user || Number(this.task.user.id) === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona un usuario',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    return CreateTaskComponent;
}(base_component_1.BaseComponent));
CreateTaskComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-create-task',
        templateUrl: './create-task.component.html',
        styleUrls: ['./create-task.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        router_1.ActivatedRoute,
        cuenca_verde_service_1.CuencaVerdeService,
        roles_manager_1.RolesManager])
], CreateTaskComponent);
exports.CreateTaskComponent = CreateTaskComponent;
//# sourceMappingURL=create-task.component.js.map