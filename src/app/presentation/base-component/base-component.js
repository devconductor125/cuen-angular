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
var procedures_manager_1 = require("../../data/managers/procedures.manager");
var roles_manager_1 = require("../../data/managers/roles.manager");
var BaseComponent = (function () {
    function BaseComponent(proceduresManager, rolesManager) {
        this.proceduresManager = proceduresManager;
        this.rolesManager = rolesManager;
        this.SUPER_ADMINISTRATIVO = 1;
        this.ADMINISTRATIVO = 2;
        this.COORDINADOR = 3; /// COORDINACIÓN DE GUARDACUENCA
        this.COORDINADOR_RESTAURACION = 9;
        this.COORDINADOR_RECURSO_HIDRICO = 10;
        this.GUARDACUENCA = 4;
        this.SIG = 6;
        this.EQUIPO_SEGUIMIENTO = 7;
        this.GERENCIA = 10; ////concretar
        this.JURIDICO = 8;
        this.DIRECCION = 12;
        this.FINANCIERO = 11;
        this.COMUNICACIONES = 13;
        this.userRoles = [];
        this.placeholder = {};
        this.placeholder.id = 0;
        this.placeholder.name = 'Selecciona una opción';
    }
    BaseComponent.prototype.getUserRoles = function (component) {
        component.rolesManager.searchUserRoles()
            .then(function (roles) {
            component.userRoles = roles;
            component.isCoordinador = component.isRole(component.COORDINADOR_RECURSO_HIDRICO)
                || component.isRole(component.COORDINADOR_RESTAURACION);
            component.isCoordinadorGuardacuenca = component.isRole(component.COORDINADOR);
            component.isSig = component.isRole(component.SIG);
            component.isSeguimiento = component.isRole(component.EQUIPO_SEGUIMIENTO);
            component.isGerencia = component.isRole(component.GERENCIA);
            component.isSuperAdmin = component.isRole(component.SUPER_ADMINISTRATIVO);
            component.isAdministrativo = component.isRole(component.ADMINISTRATIVO);
            component.isGuardaCuenca = component.isRole(component.GUARDACUENCA);
            component.isJuridico = component.isRole(component.JURIDICO);
            component.isDireccion = component.isRole(component.DIRECCION);
            component.isFinanciero = component.isRole(component.FINANCIERO);
            component.isComunicaciones = component.isRole(component.COMUNICACIONES);
            component.onGotRoles(component.userRoles);
        });
    };
    BaseComponent.prototype.onGotRoles = function () {
    };
    BaseComponent.prototype.getId = function () {
        return this.componentId;
    };
    BaseComponent.prototype.shouldDelete = function (callback) {
        var shouldDelete;
        shouldDelete = confirm('Deseas borrar el elemento?');
        if (shouldDelete) {
            callback();
        }
    };
    BaseComponent.prototype.getCustomPlaceholder = function (customMessage) {
        var placeholder = {};
        placeholder.id = 0;
        placeholder.name = customMessage;
        return placeholder;
    };
    BaseComponent.prototype.isRole = function (role) {
        return this.userRoles.indexOf(role) >= 0;
    };
    BaseComponent.prototype.convertirFecha = function (date) {
        var fecha = date.split(' ');
        var datos = fecha[0].split('-');
        var dia = datos[2];
        var mes = datos[1];
        var yy = datos[0];
        var fechaFinal = '';
        var stringMes = '';
        /////MES
        switch (mes) {
            case '01':
                stringMes = 'Enero';
                break;
            case '02':
                stringMes = 'Febrero';
                break;
            case '03':
                stringMes = 'Marzo';
                break;
            case '04':
                stringMes = 'Abril';
                break;
            case '05':
                stringMes = 'Mayo';
                break;
            case '06':
                stringMes = 'Junio';
                break;
            case '07':
                stringMes = 'Julio';
                break;
            case '08':
                stringMes = 'Agosto';
                break;
            case '09':
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
        fechaFinal = dia + ' de ' + stringMes + ' del año ' + yy + ' Hora: ' + fecha[1];
        return fechaFinal;
    };
    BaseComponent.prototype.convertirFechaD = function (date) {
        var fecha = date.split(' ');
        var datos = fecha[0].split('-');
        var dia = datos[2];
        var mes = datos[1];
        var yy = datos[0];
        var fechaFinal = dia + '-' + mes + '-' + yy;
        return fechaFinal;
    };
    return BaseComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BaseComponent.prototype, "componentId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BaseComponent.prototype, "subTypeTask_id", void 0);
BaseComponent = __decorate([
    core_1.Component({
        selector: 'app-base-component',
        templateUrl: './base-component.html'
    }),
    __metadata("design:paramtypes", [procedures_manager_1.ProceduresManager,
        roles_manager_1.RolesManager])
], BaseComponent);
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base-component.js.map