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
var messaging_service_1 = require("../../../data/services/messaging.service");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var create_pool_of_contracts_component_1 = require("../create-pool-of-contracts/create-pool-of-contracts.component");
var pool_of_contracts_manager_1 = require("../../../data/managers/pool-of-contracts.manager");
var pool_of_contracts_1 = require("../../../data/model/pool-of-contracts");
var mapping_utils_1 = require("../../../data/utils/mapping.utils");
var asignarContratistaBolsa_1 = require("../../../data/model/asignarContratistaBolsa");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var EditPoolOfContractsComponent = (function (_super) {
    __extends(EditPoolOfContractsComponent, _super);
    function EditPoolOfContractsComponent(messagingService, proceduresManager, poolOfContractsManager, router, tasksManager, rolesManager, activatedRoute) {
        var _this = _super.call(this, messagingService, proceduresManager, poolOfContractsManager, router, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.poolOfContractsManager = poolOfContractsManager;
        _this.router = router;
        _this.tasksManager = tasksManager;
        _this.rolesManager = rolesManager;
        _this.activatedRoute = activatedRoute;
        _this.contratistas = [];
        _this.objetoAsignacionesCompleto = new asignarContratistaBolsa_1.AsignarContratistaBolsa();
        _this.accionesAsignadas = [];
        _this.characters = [];
        _this.selectedContratista = [];
        _this.response = false;
        _this.poolOfContracts = new pool_of_contracts_1.PoolOfContracts();
        _this.listTask = [];
        return _this;
    }
    EditPoolOfContractsComponent.prototype.onDataLoaded = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            _this.id_pool = idString;
            if (id > 0) {
                _this.poolOfContractsManager.getObjectForEdit(String(id))
                    .then(function (object) {
                    _this.poolOfContracts = object;
                    _this.mapPoolObjects();
                    ////console.log(this.poolOfContracts);
                    _this.getContratistas();
                });
            }
            else {
                var link = ['/app/pools-of-contracts'];
                _this.router.navigate(link);
            }
        });
        this.getTaskForExecution();
    };
    EditPoolOfContractsComponent.prototype.getContratistas = function () {
        var componente = this;
        this.proceduresManager.getUsers(5)
            .then(function (users) {
            if (users.length > 0) {
                componente.contratistas = [];
                users.forEach(function (user) {
                    componente.contratistas.push(componente.mappingContratistastoSelect(user));
                    componente.selectedContratista.push('0');
                });
            }
        });
    };
    EditPoolOfContractsComponent.prototype.mappingContratistastoSelect = function (user) {
        var objeto = { value: String(user.id), label: user.name };
        return objeto;
    };
    EditPoolOfContractsComponent.prototype.changeChekedUnique = function (idBudget, booleanSelected, id_procedure) {
        if (!booleanSelected) {
            var index = this.accionesAsignadas.findIndex(function (procedimiento) { return procedimiento.id_procedure === id_procedure; });
            var index2 = this.accionesAsignadas[index].data.findIndex(function (budget) { return budget.id_budget === String(idBudget); });
            var indexElement = this.accionesAsignadas[index].data[index2].id_budget;
            this.selectedContratista[indexElement] = '0';
        }
        else {
            var index3 = this.procedures.findIndex(function (process) { return process.id === id_procedure; });
            this.procedures[index3].selected = true;
        }
    };
    EditPoolOfContractsComponent.prototype.changeChekedAll = function (id_procedure, booleanSelected, procedure) {
        var componente = this;
        if (!booleanSelected) {
            var index2 = this.procedures.findIndex(function (process) { return process.id === procedure.id; });
            this.procedures[index2].budget.forEach(function (process) {
                process.selected = false;
            });
            var index = this.accionesAsignadas.findIndex(function (procedimiento) { return procedimiento.id_procedure === id_procedure; });
            this.accionesAsignadas[index].data.forEach(function (budget) {
                componente.selectedContratista[budget.id_budget] = '0';
            });
            this.accionesAsignadas.splice(index, 1);
            ///// console.log(this.accionesAsignadas);
        }
    };
    EditPoolOfContractsComponent.prototype.onSelectedContr = function (option, idBudget, id_procedure) {
        //// console.log(`Contratista IDUSER: ${option.value} - Acción IDBUDGET: ${idBudget}`);
        var index = this.accionesAsignadas.findIndex(function (procedimiento) { return procedimiento.id_procedure === id_procedure; });
        var objeto = { id_procedure: id_procedure, data: [] };
        // console.log(index); bien
        if (index === -1) {
            this.accionesAsignadas.push(objeto);
        }
        /// console.log(this.accionesAsignadas); bien
        var index2 = this.accionesAsignadas.findIndex(function (procedimiento) { return procedimiento.id_procedure === id_procedure; });
        /// console.log(this.accionesAsignadas[index2]);
        var index3 = this.accionesAsignadas[index2].data.findIndex(function (budget) { return budget.id_budget === String(idBudget); });
        var objeto2 = { id_user: option.value, id_budget: String(idBudget) };
        if (index3 === -1) {
            this.accionesAsignadas[index2].data.push(objeto2);
        }
        else {
            this.accionesAsignadas[index2].data.splice(index3, 1);
            this.accionesAsignadas[index2].data.push(objeto2);
        }
        // console.log(this.accionesAsignadas);
        this.objetoAsignacionesCompleto = {
            id_pool: this.id_pool,
            data: this.accionesAsignadas
        };
        ///// console.log(JSON.stringify(this.objetoAsignacionesCompleto));
    };
    EditPoolOfContractsComponent.prototype.mapPoolObjects = function () {
        var component = this;
        if (this.poolOfContracts.pool_by_process) {
            this.poolOfContracts.pool_by_process.forEach(function (procedure) {
                component.procedures.forEach(function (componentProcedure) {
                    if (componentProcedure.id === procedure.process_id) {
                        componentProcedure.selected = true;
                        componentProcedure.budget.push(mapping_utils_1.MappingUtils.mapPoolOfContractsActionToBudget(procedure));
                    }
                });
            });
        }
    };
    ///// POBLAR SELECTS
    EditPoolOfContractsComponent.prototype.getTaskForExecution = function () {
        var _this = this;
        var componente = this;
        this.tasksManager.getTaskForExecution()
            .then(function (response) {
            _this.listTask = response;
            _this.listTask.forEach(function (list) {
                componente.selectedContratista[list.pool_process.budget_id] = list.user_id;
            });
        });
    };
    EditPoolOfContractsComponent.prototype.updatePoolOfContracts = function () {
        var _this = this;
        var componente = this;
        this.isValidAsi();
        /// console.log(this.response);
        this.setPoolProcedures();
        if (this.isValidPool() && this.response) {
            /////console.log(this.objetoAsignacionesCompleto);
            this.poolOfContractsManager.update(this.poolOfContracts, this.objetoAsignacionesCompleto)
                .then(function () {
                var message = {
                    'tipo': 'Registrado',
                    'message': 'La bolsa presupuestal ha sido actualizada satisfactoriamente',
                    'style': 'alert-success'
                };
                componente.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                var link = ['/app/pools-of-contracts'];
                _this.router.navigate(link);
            }, function () {
                var message = {
                    'tipo': 'Error',
                    'message': 'La bolsa presupuestal no ha sido actualizada',
                    'style': 'alert-danger'
                };
                componente.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            });
        }
    };
    EditPoolOfContractsComponent.prototype.isValidPool = function () {
        ////const objetoSelected = this.procedures.budget.filter(process => process.id === String(this.idMonitor));
        if (!this.poolOfContracts.name || this.poolOfContracts.name.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el nombre de la bolsa presupuestal',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.accionesAsignadas.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona una o más acciones',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    EditPoolOfContractsComponent.prototype.isValidAsi = function () {
        var _this = this;
        var componente = this;
        this.procedures.forEach(function (item) {
            if (item.selected) {
                if (Object.keys(componente.objetoAsignacionesCompleto).length !== 0 && componente.objetoAsignacionesCompleto.constructor !== asignarContratistaBolsa_1.AsignarContratistaBolsa) {
                    var objetoSelected_1 = componente.objetoAsignacionesCompleto
                        .data.filter(function (seleccion) { return String(seleccion.id_procedure) === String(item.id); });
                    if (objetoSelected_1) {
                        item.budget.forEach(function (budget) {
                            if (budget.selected) {
                                if (objetoSelected_1.length > 0) {
                                    var budgetSelected = objetoSelected_1[0].data.filter(function (budgetS) { return String(budgetS.id_budget) === String(budget.id); });
                                    if (budgetSelected.length === 0) {
                                        var message = {
                                            'tipo': 'Error: ',
                                            'message': 'Faltan datos',
                                            'style': 'alert-danger'
                                        };
                                        _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                                        componente.response = false;
                                    }
                                    else {
                                        componente.response = true;
                                    }
                                }
                                else {
                                    var message = {
                                        'tipo': 'Error: ',
                                        'message': 'Faltan datos',
                                        'style': 'alert-danger'
                                    };
                                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                                    componente.response = false;
                                }
                            }
                        });
                    }
                    else {
                        var message = {
                            'tipo': 'Error: ',
                            'message': 'Faltan datos',
                            'style': 'alert-danger'
                        };
                        _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                        componente.response = false;
                    }
                }
                else {
                    ///console.log('Sin Procedimiento no acciones');
                    var message = {
                        'tipo': 'Error: ',
                        'message': 'Faltan datos',
                        'style': 'alert-danger'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    componente.response = false;
                }
            }
        });
    };
    return EditPoolOfContractsComponent;
}(create_pool_of_contracts_component_1.CreatePoolOfContractsComponent));
EditPoolOfContractsComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-edit-pools-of-contracts',
        templateUrl: './edit-pool-of-contracts.component.html',
        styleUrls: ['./edit-pool-of-contracts.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        pool_of_contracts_manager_1.PoolOfContractsManager,
        router_1.Router,
        tasks_manager_1.TasksManager,
        roles_manager_1.RolesManager,
        router_1.ActivatedRoute])
], EditPoolOfContractsComponent);
exports.EditPoolOfContractsComponent = EditPoolOfContractsComponent;
//# sourceMappingURL=edit-pool-of-contracts.component.js.map