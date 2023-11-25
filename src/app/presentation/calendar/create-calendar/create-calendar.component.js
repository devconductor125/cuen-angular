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
var mapa_calendar_component_1 = require("../../mapa-calendar/mapa-calendar.component");
var monitoreoObject_1 = require("../../../data/model/monitoreoObject");
var CreateCalendarComponent = (function (_super) {
    __extends(CreateCalendarComponent, _super);
    function CreateCalendarComponent(messagingService, proceduresManager, contractorsManager, router, rolesManager, tasksManager, activatedRoute, ref) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.contractorsManager = contractorsManager;
        _this.router = router;
        _this.rolesManager = rolesManager;
        _this.tasksManager = tasksManager;
        _this.activatedRoute = activatedRoute;
        _this.ref = ref;
        _this.roles = [];
        _this.users = [];
        _this.procedures = [];
        _this.types_monitoreos = []; // TODO Change for MonitoreoTypes
        //////OBJETO
        _this.monitoreo = new monitoreoObject_1.MonitoreoObject();
        _this.acciones = [];
        _this.selectedHash = false;
        return _this;
    }
    CreateCalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTypeMonitoreos();
        this.getRoles(this);
        this.getProcedures(this);
        //////OBJETO
        this.monitoreo.type = '0';
        this.monitoreo.usuario = '0';
        this.monitoreo.role = '0';
        this.activatedRoute.paramMap
            .map(function (params) { return params.get('fecha'); })
            .subscribe(function (fecha) {
            if (fecha !== null) {
                _this.monitoreo.start = fecha;
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    CreateCalendarComponent.prototype.getTypeMonitoreos = function () {
        var _this = this;
        this.tasksManager.getTypeMonitor()
            .then(function (typeMonitor) {
            _this.types_monitoreos = typeMonitor;
        });
    };
    CreateCalendarComponent.prototype.getRoles = function (component) {
        return new Promise(function (resolve) {
            component.rolesManager.getAllRoles()
                .then(function (roles) {
                if (roles.length > 0) {
                    component.roles = roles;
                    ////console.log(component.roles);
                    resolve(component);
                }
            });
        });
    };
    CreateCalendarComponent.prototype.getProcedures = function (component) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.proceduresManager.loadAllObjects()
                .then(function (procedures) {
                _this.procedures = procedures;
                ////console.log(this.procedures);
                _this.monitoreo.procedure = '0';
                resolve(component);
            });
        });
    };
    CreateCalendarComponent.prototype.getUsers = function () {
        var component = this;
        this.users = [];
        return new Promise(function (resolve) {
            component.proceduresManager.getUsers(Number(component.monitoreo.role))
                .then(function (users) {
                if (users.length > 0) {
                    component.users = users;
                    resolve();
                }
            });
        });
    };
    CreateCalendarComponent.prototype.isValidMonitoreo = function () {
        if (!this.monitoreo.title || this.monitoreo.title.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa el Título',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.monitoreo.type + '' === '0' || this.monitoreo.type === undefined || this.monitoreo.type === null) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Seleccione tipo: Monitoreo o Mantenimiento',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.monitoreo.procedure + '' === '0' || this.monitoreo.procedure === undefined || this.monitoreo.procedure === null) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Seleccione un Procedimiento',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.monitoreo.usuario + '' === '0' || this.monitoreo.usuario === undefined || this.monitoreo.usuario === null) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Seleccione un Usuario a quien asignar la acción',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.monitoreo.start) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la Fecha de Inicio',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.monitoreo.end) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa la Fecha de Terminación',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (!this.monitoreo.comentario || this.monitoreo.comentario.length === 0) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Ingresa algún Comentario',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        if (this.monitoreo.hash + '' === '' || this.monitoreo.hash === undefined || this.monitoreo.hash === null) {
            var message = {
                'tipo': 'Error: ',
                'message': 'Seleccione la actividad a la que se le realizará el mantenimiento',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            return false;
        }
        return true;
    };
    CreateCalendarComponent.prototype.guardar = function () {
        var _this = this;
        var componente = this;
        if (this.isValidMonitoreo()) {
            ////console.log(this.monitoreo);
            this.tasksManager.crearMonitorCalendar(this.monitoreo)
                .then(function () {
                var message = {
                    'tipo': 'Monitoreo Registrado ',
                    'message': ' satisfactoriamente. Espere mientras recargamos el calendario.',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                var link = ['/app/calendar'];
                _this.router.navigate(link);
            }, function (reason) {
                ////console.log(reason);
                var message = {
                    'tipo': 'Error',
                    'message': reason,
                    'style': 'alert-danger'
                };
                componente.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            });
        }
    };
    /////// MAPA
    CreateCalendarComponent.prototype.getGeoJson = function () {
        var _this = this;
        var componente = this;
        if (this.monitoreo.procedure !== undefined && this.monitoreo.procedure !== '0') {
            this.tasksManager.getGeoJsonByProcedure(this.monitoreo.procedure)
                .then(function (response) {
                if (response instanceof Array) {
                    _this.mapGeoJson = response[0].geojson;
                    var contador_1 = 0;
                    response.forEach(function (item) {
                        if (contador_1 !== 0) {
                            componente.acciones.push(item);
                        }
                        contador_1++;
                    });
                    /////console.log(componente.acciones);
                    _this.mapaCalendarComponent.loadGeoJson(JSON.parse(_this.mapGeoJson));
                }
                else {
                    var message = {
                        'tipo': 'El Mapa ',
                        'message': ' no ha sido cargado',
                        'style': 'alert-warning'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                }
            });
        }
    };
    CreateCalendarComponent.prototype.clickInMap = function ($event) {
        var _this = this;
        ////// click in HASH
        if ($event.payload.type === '1') {
            if ($event.payload.properties.hash !== undefined && $event.payload.properties.hash !== null) {
                this.tasksManager.getActionHash($event.payload.properties.hash)
                    .then(function (response) {
                    if (response !== null) {
                        _this.acciones = [];
                        _this.acciones.push(response);
                        _this.ref.detectChanges();
                        document.getElementById('selected').style.border = 'thick solid' + $event.payload.properties.Color;
                        document.getElementById('selected').style.fontWeight = 'bold';
                        _this.monitoreo.hash = $event.payload.properties.hash;
                    }
                    else {
                        document.getElementById('selected').style.border = 'none';
                        document.getElementById('selected').style.fontWeight = 'bold';
                        _this.monitoreo.hash = '';
                    }
                });
                this.ref.detectChanges();
            }
        }
    };
    return CreateCalendarComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.ViewChild(ng_fullcalendar_1.CalendarComponent),
    __metadata("design:type", ng_fullcalendar_1.CalendarComponent)
], CreateCalendarComponent.prototype, "ucCalendar", void 0);
__decorate([
    core_1.ViewChild(mapa_calendar_component_1.MapaCalendarComponent),
    __metadata("design:type", mapa_calendar_component_1.MapaCalendarComponent)
], CreateCalendarComponent.prototype, "mapaCalendarComponent", void 0);
CreateCalendarComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-calendar-create',
        templateUrl: './create-calendar.component.html',
        styleUrls: ['./create-calendar.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        contractors_manager_1.ContractorsManager,
        router_1.Router,
        roles_manager_1.RolesManager,
        tasks_manager_1.TasksManager,
        router_1.ActivatedRoute,
        core_1.ChangeDetectorRef])
], CreateCalendarComponent);
exports.CreateCalendarComponent = CreateCalendarComponent;
//# sourceMappingURL=create-calendar.component.js.map