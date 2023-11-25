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
var router_1 = require("@angular/router");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var mapa_calendar_component_1 = require("../../mapa-calendar/mapa-calendar.component");
var geo_json_service_1 = require("../../../data/services/geo-json.service");
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var SelectedCalendarComponent = (function (_super) {
    __extends(SelectedCalendarComponent, _super);
    function SelectedCalendarComponent(messagingService, proceduresManager, tasksManager, router, activatedRoute, geoJsonService, rolesManager, cuencaService, ref) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.geoJsonService = geoJsonService;
        _this.rolesManager = rolesManager;
        _this.cuencaService = cuencaService;
        _this.ref = ref;
        _this.roles = [];
        _this.users = [];
        _this.procedures = [];
        _this.showGrid = false;
        _this.fechas = [];
        _this.pointsData = []; ///Puntos registrados en los monitoreos
        _this.types_monitoreos = []; // TODO Change for MonitoreoTypes
        _this.acciones = [];
        return _this;
    }
    SelectedCalendarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.URL_BASE_FILES = this.cuencaService.API_URL_FILES;
        this.getUserRoles(this);
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.idMonitor = String(id);
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
        this.getTypeMonitoreos();
        this.getRoles(this);
        this.getProcedures(this);
        this.getFechas();
        //////MAS DATA DEL MONITOREO -- FOTOGRAFIAS
        this.getMoreDataMonitoreo();
    };
    SelectedCalendarComponent.prototype.getTypeMonitoreos = function () {
        var _this = this;
        this.tasksManager.getTypeMonitor()
            .then(function (typeMonitor) {
            _this.types_monitoreos = typeMonitor;
        });
    };
    SelectedCalendarComponent.prototype.getUsers = function () {
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
    SelectedCalendarComponent.prototype.getRoles = function (component) {
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
    SelectedCalendarComponent.prototype.getProcedures = function (component) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.proceduresManager.loadAllObjects()
                .then(function (procedures) {
                _this.procedures = procedures;
                resolve(component);
            });
        });
    };
    SelectedCalendarComponent.prototype.getFechas = function () {
        var _this = this;
        this.tasksManager.getMonitoreosCalendar()
            .then(function (fechas) {
            _this.fechas = fechas;
            var objetoSelected = _this.fechas.filter(function (fecha) { return String(fecha.id) === String(_this.idMonitor); });
            //// console.log(objetoSelected[0]);
            //////OBJETO
            _this.monitoreo = {
                id: objetoSelected[0].id,
                title: objetoSelected[0].title,
                start: objetoSelected[0].start,
                end: objetoSelected[0].end,
                comentario: '',
                acciones: [],
                type: '1',
                procedure: '1',
                hash: objetoSelected[0].hash_map,
                role: objetoSelected[0].role_id,
                usuario: objetoSelected[0].user_id
            };
            _this.comments = objetoSelected[0].comment_by_monitoring;
            /// console.log(this.monitoreo.procedure);
            _this.getUsers();
            _this.getGeoJsonView();
        });
    };
    SelectedCalendarComponent.prototype.insertComment = function () {
        var _this = this;
        var objeto = {
            'monitoring_id': this.monitoreo.id,
            'comment': this.comentario
        };
        if (objeto.comment !== '' && objeto.comment !== undefined) {
            this.tasksManager.insertCommentMonitoreoCalendar(objeto)
                .then(function (response) {
                _this.comentario = '';
                var message = {
                    'tipo': 'Comentario Agregado ',
                    'message': ' satisfactoriamente.',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                location.reload();
            });
        }
    };
    /////// MAPA
    SelectedCalendarComponent.prototype.getGeoJsonView = function () {
        var _this = this;
        this.monitoreo.acciones = [];
        var componente = this;
        if (this.monitoreo.procedure !== undefined && this.monitoreo.procedure !== '0') {
            this.tasksManager.getGeoJsonByProcedure(this.monitoreo.procedure)
                .then(function (response) {
                if (response instanceof Array) {
                    _this.mapGeoJson = response[0].geojson;
                    _this.mapaCalendarComponent.loadGeoJson(JSON.parse(_this.mapGeoJson));
                    ////acciones
                    if (_this.monitoreo.hash !== undefined && _this.monitoreo.hash !== null) {
                        _this.tasksManager.getActionHash(_this.monitoreo.hash)
                            .then(function (responseHash) {
                            if (responseHash !== null) {
                                _this.acciones = [];
                                _this.acciones.push(responseHash);
                                _this.ref.detectChanges();
                                document.getElementById('selected').style.border = 'thick solid' + responseHash.color;
                                document.getElementById('selected').style.fontWeight = 'bold';
                            }
                            else {
                                document.getElementById('selected').style.border = 'none';
                                document.getElementById('selected').style.fontWeight = 'normal';
                            }
                        });
                    }
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
    SelectedCalendarComponent.prototype.clickInMap = function ($event) {
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
        ////// click in MARKER
        if ($event.payload.type === '2') {
            var selected = this.pointsData.filter(function (point) { return String(point.id) === String($event.payload.properties); });
            this.pointSelected = selected[0];
            this.showGrid = true;
        }
    };
    SelectedCalendarComponent.prototype.backGrilla = function () {
        this.showGrid = false;
        this.getFechas();
        //////MAS DATA DEL MONITOREO -- FOTOGRAFIAS
        this.getMoreDataMonitoreo();
    };
    //// MORE DATA
    SelectedCalendarComponent.prototype.getMoreDataMonitoreo = function () {
        var _this = this;
        this.tasksManager.getMonitorFromId(this.idMonitor)
            .then(function (data) {
            _this.pointsData = data.points;
            /// console.log(this.pointsData);
            if (_this.pointsData.length > 0) {
                _this.pointsData.forEach(function (item) {
                    var coordenada = item.coordinate.split(',');
                    var lat = coordenada[0];
                    var lng = coordenada[1];
                    var id = item.id;
                    _this.mapaCalendarComponent.crearMarcador(lat, lng, id);
                });
            }
        });
    };
    ///// ACTUALIZAR
    SelectedCalendarComponent.prototype.updateMonitor = function () {
        var _this = this;
        var componente = this;
        if (this.isValidMonitoreo()) {
            ////console.log(this.monitoreo);
            this.tasksManager.updateMonitorCalendar(this.monitoreo)
                .then(function () {
                var message = {
                    'tipo': 'Monitoreo Actualizado ',
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
    SelectedCalendarComponent.prototype.isValidMonitoreo = function () {
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
    return SelectedCalendarComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.ViewChild(mapa_calendar_component_1.MapaCalendarComponent),
    __metadata("design:type", mapa_calendar_component_1.MapaCalendarComponent)
], SelectedCalendarComponent.prototype, "mapaCalendarComponent", void 0);
SelectedCalendarComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-calendar-selected',
        templateUrl: './selected-calendar.component.html',
        styleUrls: ['./selected-calendar.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        router_1.ActivatedRoute,
        geo_json_service_1.GeoJsonService,
        roles_manager_1.RolesManager,
        cuenca_verde_service_1.CuencaVerdeService,
        core_1.ChangeDetectorRef])
], SelectedCalendarComponent);
exports.SelectedCalendarComponent = SelectedCalendarComponent;
//# sourceMappingURL=selected-calendar.component.js.map