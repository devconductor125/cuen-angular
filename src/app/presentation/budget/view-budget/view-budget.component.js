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
var base_component_1 = require("../../base-component/base-component");
var procedure_1 = require("../../../data/model/procedure");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var ViewBudgetComponent = (function (_super) {
    __extends(ViewBudgetComponent, _super);
    function ViewBudgetComponent(messagingService, proceduresManager, router, tasksManager, rolesManager, activatedRoute) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.router = router;
        _this.tasksManager = tasksManager;
        _this.rolesManager = rolesManager;
        _this.activatedRoute = activatedRoute;
        _this.procedureTypes = [];
        _this.procedure = new procedure_1.Procedure();
        _this.subTotalAgreement = 0;
        _this.modelAsociados = [];
        return _this;
    }
    ViewBudgetComponent.prototype.ngOnInit = function () {
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.loadProject();
    };
    ViewBudgetComponent.prototype.loadProject = function () {
        var _this = this;
        var component = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            component.task_id = idString;
            _this.tasksManager.getBudgetFromTaskId(id)
                .then(function (budget) {
                if (budget.length > 0) {
                    component.budgets = budget;
                    component.budgets.forEach(function (pre) {
                        component.subTotalAgreement += parseFloat(pre.value);
                        var Default = {
                            'id_associated': '0',
                            'id_budget': pre.id,
                            'id_task': component.task_id
                        };
                        component.modelAsociados.push(Default);
                    }, component);
                }
            });
        });
    };
    ViewBudgetComponent.prototype.getPercent = function (percent, quantity) {
        return (quantity * percent) / 100;
    };
    ViewBudgetComponent.prototype.printDiv = function () {
        var printContents, popupWin;
        printContents = document.getElementById('a-imprimir').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css\" +\n          integrity=\"sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb\" crossorigin=\"anonymous\">\n          <title>M\u00F3dulo de Impresi\u00F3n</title>\n          <style>\n          /*////// Estilos personalizados */\n          @media print {\n            .page-break\t{ page-break-before: always; }\n            .imprimir{\n              padding: 0px 40px;\n            }\n            .title-header {\n              font-weight: bold;\n              font-size: 14px;\n              margin-top: 10px;\n              margin-bottom: 10px;\n            }\n            .parag{\n              margin-bottom: 10px;\n              text-align: justify;\n              text-justify: inter-word;\n            }\n            table{\n            padding: 50px;\n            margin-top: 20px;\n            margin-bottom: 20px;\n            }\n            th{\n            text-align: center;\n            font-weight: bold;\n            border: solid 2px black;\n            }\n            td{\n            text-align: left;\n            border: solid 1px black;\n            }\n            .center{\n            text-align: center;\n            }\n            .noborder td{\n            border: solid 1px white;\n            }\n            .vertical-align {\n              display: flex;\n              align-items: center;\n              horiz-align: center;\n              text-align: center;\n              margin-bottom: 15px;\n            }\n            .title_form{\n              font-size: 10px;\n              font-weight: bold;\n              padding: 2px 4px;\n              background-color: #c1d0dd;\n            }\n            .title_form_label{\n              font-size: 8px;\n              font-weight: bold;\n              padding: 2px 4px;\n              color: #585858;\n            }\n            .bordertable {\n              border: solid 1px #000;\n            }\n            .table-inner{\n              margin: 0px 0px;\n            }\n            .rightalign{\n              text-align: right;\n              font-size: 10px;\n            }\n            .title_form_d{\n              font-size: 8px;\n              font-weight: bold;\n              padding: 2px 4px;\n            }\n            .title_form_notback{\n              font-size: 12px;\n              font-weight: bold;\n              padding: 2px 4px;\n            }\n            div {\n            font-size: 10px;\n            }\n            .Mostrar{\n              display: none;\n            }\n            .title-bud {\n              font-size: 12px;\n              font-weight: bold;\n            }\n            .content-bud {\n              font-size: 12px;\n              font-weight: bold;\n            }\n            .content-bud-normal {\n              font-size: 12px;\n            }\n            .content-bud-foot {\n               font-size: 12px;\n               font-weight: bold;\n             }\n            .total-foot {\n              font-size: 14px;\n              font-weight: bold;\n            }\n          </style>\n        </head>\n    <body onload=\"window.print();window.close()\">\n              " + printContents + "\n              </body>\n      </html>");
        popupWin.document.close();
    };
    ViewBudgetComponent.prototype.asignarAsociados = function () {
        var _this = this;
        if (this.isValidSend()) {
            this.tasksManager.asignarAsociados(this.modelAsociados)
                .then(function (response) {
                var message = {
                    'tipo': 'Acciones Asignadas',
                    'message': 'satisfactoriamente',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            });
        }
    };
    ViewBudgetComponent.prototype.isValidSend = function () {
        var continuar = true;
        this.modelAsociados.forEach(function (modelo) {
            if (continuar) {
                if (modelo.id_associated === '0') {
                    continuar = false;
                }
            }
        });
        if (!continuar) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Faltó asignar un asociado a alguna acción',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    return ViewBudgetComponent;
}(base_component_1.BaseComponent));
ViewBudgetComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-view-budget',
        templateUrl: './view-budget.component.html',
        styleUrls: ['./view-budget.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        router_1.Router,
        tasks_manager_1.TasksManager,
        roles_manager_1.RolesManager,
        router_1.ActivatedRoute])
], ViewBudgetComponent);
exports.ViewBudgetComponent = ViewBudgetComponent;
//# sourceMappingURL=view-budget-final.component.js.mapnent.js.map
