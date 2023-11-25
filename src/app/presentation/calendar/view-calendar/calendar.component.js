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
var messaging_service_1 = require("../../../data/services/messaging.service");
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var contractors_manager_1 = require("../../../data/managers/contractors.manager");
var router_1 = require("@angular/router");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var ng_fullcalendar_1 = require("ng-fullcalendar");
var moment = require("moment");
var mapa_calendar_component_1 = require("../../mapa-calendar/mapa-calendar.component");
var CuencaCalendarComponent = (function (_super) {
    __extends(CuencaCalendarComponent, _super);
    function CuencaCalendarComponent(messagingService, proceduresManager, contractorsManager, router, rolesManager, tasksManager, ref) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.contractorsManager = contractorsManager;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.tasksManager = tasksManager;
        _this.ref = ref;
        _this.fechas = [];
        _this.viewCalendar = true;
        _this.viewForm = false;
        _this.viewFormView = false;
        _this.roles = [];
        _this.users = [];
        _this.procedures = [];
        _this.types_monitoreos = []; // TODO Change for MonitoreoTypes
        //////OBJETO
        _this.monitoreo = {
            id: '',
            title: '',
            start: '',
            end: '',
            comentario: '',
            type: '0',
            usuario: '0',
            procedure: '0',
            hash: '',
            role: '0'
        };
        _this.acciones = [];
        return _this;
    }
    CuencaCalendarComponent.prototype.ngOnInit = function () {
        this.getFechas();
        this.acciones = [];
        this.getUserRoles(this);
    };
    CuencaCalendarComponent.prototype.eventClick = function ($event) {
        //////OBJETO
        this.monitoreo = {
            id: $event.id
        };
        var link = ['/app/selected-calendar/' + this.monitoreo.id];
        this.router.navigate(link);
    };
    CuencaCalendarComponent.prototype.eventDrop = function ($event) {
        ///console.log($event.event);
    };
    CuencaCalendarComponent.prototype.clickInDay = function (date) {
        var link = ['/app/create-calendar/' + moment(date).format()];
        this.router.navigate(link);
    };
    CuencaCalendarComponent.prototype.getFechas = function () {
        var _this = this;
        this.tasksManager.getMonitoreosCalendar()
            .then(function (fechas) {
            _this.fechas = fechas;
            _this.calendarOptions = {
                locale: 'es',
                editable: true,
                eventLimit: false,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                views: {
                    month: { buttonText: 'Mes' },
                    agendaWeek: { buttonText: 'Semana' },
                    agendaDay: { buttonText: 'Día' }
                },
                events: _this.fechas
            };
        });
    };
    return CuencaCalendarComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.ViewChild(ng_fullcalendar_1.CalendarComponent),
    __metadata("design:type", ng_fullcalendar_1.CalendarComponent)
], CuencaCalendarComponent.prototype, "ucCalendar", void 0);
__decorate([
    core_1.ViewChild(mapa_calendar_component_1.MapaCalendarComponent),
    __metadata("design:type", mapa_calendar_component_1.MapaCalendarComponent)
], CuencaCalendarComponent.prototype, "mapaCalendarComponent", void 0);
CuencaCalendarComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-calendar',
        templateUrl: './calendar.component.html',
        styleUrls: ['./calendar.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        contractors_manager_1.ContractorsManager,
        router_1.Router,
        roles_manager_1.RolesManager,
        tasks_manager_1.TasksManager,
        core_1.ChangeDetectorRef])
], CuencaCalendarComponent);
exports.CuencaCalendarComponent = CuencaCalendarComponent;
//# sourceMappingURL=calendar.component.js.map