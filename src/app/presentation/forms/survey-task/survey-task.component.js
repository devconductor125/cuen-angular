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
var base_component_1 = require("../../base-component/base-component");
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var router_1 = require("@angular/router");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var SurveyTaskComponent = (function (_super) {
    __extends(SurveyComponent, _super);
    function SurveyComponent(proceduresManager, tasksManager, router, activatedRoute, rolesManager) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.rolesManager = rolesManager;
        return _this;
    }
    SurveyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.tasksManager.getSurveyFromTaskId(String(id))
                    .then(function (response) {
                    _this.survey = response;
                    if (_this.survey.property_visit_date) {
                        _this.convertirSurveyFecha(_this.survey.property_visit_date.day, _this.survey.property_visit_date.month, _this.survey.property_visit_date.year);
                    }
                });
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    SurveyComponent.prototype.convertirSurveyFecha = function (dia, mes, yy) {
        var fechaFinal = '';
        var stringMes = '';
        /////MES
        switch (mes) {
            case '1':
                stringMes = 'Enero';
                break;
            case '2':
                stringMes = 'Febrero';
                break;
            case '3':
                stringMes = 'Marzo';
                break;
            case '4':
                stringMes = 'Abril';
                break;
            case '5':
                stringMes = 'Mayo';
                break;
            case '6':
                stringMes = 'Junio';
                break;
            case '7':
                stringMes = 'Julio';
                break;
            case '8':
                stringMes = 'Agosto';
                break;
            case '9':
                stringMes = 'Septiembre';
                break;
            case '10':
                stringMes = 'Octubre';
                break;
            case '11':
                stringMes = 'Noviembre';
                break;
            case '12':
                stringMes = 'Diciembre';
                break;
        }
        fechaFinal = dia + ' de ' + stringMes + ' del año ' + yy;
        this.fechaVisita = fechaFinal;
    };
    SurveyComponent.prototype.printDiv = function () {
        var printContents, popupWin;
        printContents = document.getElementById('a-imprimir').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css\" +\n          integrity=\"sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb\" crossorigin=\"anonymous\">\n          <title>M\u00F3dulo de Impresi\u00F3n</title>\n          <style>\n          /*////// Estilos personalizados */\n          @media print {\n            .page-break\t{ display: block; page-break-before: always; }\n            label\t{ font-size: 8px; margin-top: 10px }\n            input::placeholder { font-size: 8px;}\n            p:empty {\n            }\n            p:empty:after {\n              content: \" - \";\n            }\n          }\n          </style>\n        </head>\n    <body onload=\"window.print();window.close()\">\n              " + printContents + "\n              </body>\n      </html>");
        popupWin.document.close();
    };
    return SurveyComponent;
}(base_component_1.BaseComponent));
SurveyTaskComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-survey',
        templateUrl: './survey-task.component.html',
        styleUrls: ['./survey-task.component.css']
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        router_1.ActivatedRoute,
        roles_manager_1.RolesManager])
], SurveyTaskComponent);
exports.SurveyComponent = SurveyTaskComponent;
//# sourceMappingURL=survey-task.component.jsnt.js.map
