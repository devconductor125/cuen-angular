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
var create_contractors_component_1 = require("../create-contractor/create-contractors.component");
var contractors_manager_1 = require("../../../data/managers/contractors.manager");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var contractor_1 = require("../../../data/model/contractor");
var EditContractorComponent = (function (_super) {
    __extends(EditContractorComponent, _super);
    function EditContractorComponent(messagingService, proceduresManager, contractorsManager, router, rolesManager, activatedRoute, tasksManager) {
        var _this = _super.call(this, messagingService, proceduresManager, contractorsManager, router, rolesManager, tasksManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.contractorsManager = contractorsManager;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.activatedRoute = activatedRoute;
        _this.tasksManager = tasksManager;
        _this.contractor = new contractor_1.Contractor();
        _this.typePerson = [{ 'id': '1', 'type': 'Natural' }, { 'id': '2', 'type': 'Jurídico' }];
        _this.repeatpass = '';
        _this.hasDocuments = false;
        _this.categories = [];
        return _this;
    }
    EditContractorComponent.prototype.onDataLoaded = function () {
        var _this = this;
        this.getContractorsCategorias();
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.contractorsManager.getObjectForEdit(String(id))
                    .then(function (object) {
                    _this.contractor = object;
                    console.log(_this.contractor);
                });
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    /////categorías contratista
    EditContractorComponent.prototype.getContractorsCategorias = function () {
        var componente = this;
        this.tasksManager.getContractorsCategorias()
            .then(function (categorias) {
            var listcategories = categorias;
            ///console.log(listcategories);
            componente.categories = [];
            listcategories.forEach(function (item) {
                componente.categories.push({ value: String(item.id), label: String(item.name) });
            });
        });
    };
    EditContractorComponent.prototype.updateContractor = function () {
        var _this = this;
        var componente = this;
        if (this.isValidContractorUp()) {
            this.contractorsManager.update(this.contractor)
                .then(function (result) {
                var message = {
                    'tipo': 'Registrado',
                    'message': 'El contratista ha sido actualizado satisfactoriamente',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                var link = ['/app/contractors'];
                _this.router.navigate(link);
            }, function (reason) {
                var message = {
                    'tipo': 'Error',
                    'message': reason,
                    'style': 'alert-danger'
                };
                componente.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            });
        }
    };
    /////Modalidad de contrato
    EditContractorComponent.prototype.getModalityC = function () {
        var _this = this;
        this.tasksManager.getModalityC()
            .then(function (modalities) {
            _this.contractormodality = modalities;
        });
    };
    EditContractorComponent.prototype.getContractType = function () {
        var _this = this;
        this.tasksManager.getContractType()
            .then(function (typeContract) {
            _this.contractType = typeContract;
        });
    };
    EditContractorComponent.prototype.isValidContractorUp = function () {
        ////console.log(this.contractor);
        /*  console.log(this.contractor.contract_number);
          console.log(this.contractor.contractor_name);
          console.log(this.contractor.contract_modality);
          console.log(this.contractor.type_person);
          console.log(this
          .contractor.number_identity);
          console.log(this.contractor.object);
          console.log(this.contractor.type_contract);
          console.log(this.contractor.total_value);
          console.log(this.contractor.way_to_pay);
          console.log(this.contractor.monthly_value);
          console.log(this.contractor.place_of_execution);
          console.log(this.contractor.initial_term);
          console.log(this.contractor.final_term);
          console.log(this.contractor.start_date);
          console.log(this.contractor.termination_date);
          console.log(this.contractor.guarantee);*/
        if (!this.contractor.user.email || this.contractor.user.email.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el Email del nuevo usuario',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.user.names || this.contractor.user.names.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el nombre del contratista',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.user.last_names || this.contractor.user.last_names.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el apellido del contratista',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.contractor.contract_modality === '0') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la modalidad del contrato',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.contractor.type_person === '0') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el tipo de persona',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.number_identity || this.contractor.number_identity.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el Número de Identidad',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.object || this.contractor.object.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el Objeto',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.contractor.type_contract === '0') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el tipo de contrato',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.total_value || this.contractor.total_value.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el Monto Total',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.way_to_pay || this.contractor.way_to_pay.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la forma de pago',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.monthly_value || this.contractor.monthly_value.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el monto mensual',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.place_of_execution || this.contractor.place_of_execution.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el lugar de ejecución',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.initial_term) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el Plazo Inicial',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.final_term) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el Plazo Final',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.start_date) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la Fecha de Inicio',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.contractor.termination_date) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la Fecha de Terminación',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.contractor.guarantee === '0') {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la Garantía',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.contractor.categories.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Selecciona al menos una categoría para el contratista',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    return EditContractorComponent;
}(create_contractors_component_1.CreateContractorComponent));
EditContractorComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-edit-contractors',
        templateUrl: './edit-contractors.component.html',
        styleUrls: ['./edit-contractors.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        contractors_manager_1.ContractorsManager,
        router_1.Router,
        roles_manager_1.RolesManager,
        router_1.ActivatedRoute,
        tasks_manager_1.TasksManager])
], EditContractorComponent);
exports.EditContractorComponent = EditContractorComponent;
//# sourceMappingURL=edit-contractors.component.js.map