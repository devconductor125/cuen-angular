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
var router_1 = require("@angular/router");
var messaging_service_1 = require("../../../data/services/messaging.service");
var tasks_manager_1 = require("../../../data/managers/tasks.manager");
var procedures_manager_1 = require("../../../data/managers/procedures.manager");
var MapHelper_1 = require("../../map/MapHelper");
var browser_utils_1 = require("../../../data/utils/browser.utils");
var geo_json_service_1 = require("../../../data/services/geo-json.service");
var roles_manager_1 = require("../../../data/managers/roles.manager");
var cuenca_verde_service_1 = require("../../../data/services/cuenca-verde.service");
var base_component_1 = require("../../base-component/base-component");
var ViewTaskComponent = (function (_super) {
    __extends(ViewTaskComponent, _super);
    function ViewTaskComponent(messagingService, proceduresManager, tasksManager, router, activatedRoute, geoJsonService, rolesManager, cuencaService) {
        var _this = _super.call(this, proceduresManager, rolesManager) || this;
        _this.messagingService = messagingService;
        _this.proceduresManager = proceduresManager;
        _this.tasksManager = tasksManager;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.geoJsonService = geoJsonService;
        _this.rolesManager = rolesManager;
        _this.cuencaService = cuencaService;
        _this.files = [];
        _this.images = [];
        _this.dataType = {};
        _this.roles = [];
        _this.hasDocuments = false;
        _this.hasProgramer = false;
        _this.predial = false;
        _this.mapaverif = false;
        _this.conceptoCoor = false;
        _this.users = [];
        return _this;
    }
    ViewTaskComponent.prototype.ngOnInit = function () {
        this.URL_BASE_FILES = this.cuencaService.API_URL_FILES;
        this.getUserRoles(this);
        this.messagingService.publish(new messaging_service_1.BusMessage('onRouteChanged', null));
        this.tasksManager.loadAllObjects();
        this.getTask();
    };
    ViewTaskComponent.prototype.getTask = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            if (id > 0) {
                _this.tasksManager.getTaskDetails(String(id))
                    .then(function (task) {
                    _this.task = task;
                    _this.checkCartaIntencion();
                    _this.setDataType();
                }).then(function () {
                    _this.obtenerArchivos();
                    _this.getComments();
                    _this.getData();
                    _this.getRoles();
                });
            }
            else {
                var link = ['/app'];
                _this.router.navigate(link);
            }
        });
    };
    ViewTaskComponent.prototype.getComments = function () {
        var _this = this;
        this.tasksManager.getAllComments(this.task)
            .then(function (comments) {
            _this.comments = comments;
        });
    };
    ViewTaskComponent.prototype.insertComment = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            var objeto = {
                'task_id': id,
                'sub_type': _this.task.sub_type.id,
                'comment': _this.comentario
            };
            if (objeto.comment !== '' && objeto.comment !== undefined) {
                _this.tasksManager.insertComment(objeto)
                    .then(function (response) {
                    _this.getComments();
                    _this.comentario = '';
                });
            }
        });
    };
    ViewTaskComponent.prototype.setDataType = function () {
        switch (this.task.details.type.id + '') {
            case '1':
                this.dataType.type = 'Mapa';
                this.dataType.name = 'Medición de predio';
                this.dataType.route = '/app/map/';
                break;
            case '3':
                this.dataType.type = 'Documento';
                this.dataType.name = 'Encuesta';
                this.dataType.route = '/app/survey/';
                break;
        }
    };
    ViewTaskComponent.prototype.getData = function () {
        var _this = this;
        switch (this.task.details.type.id + '') {
            case '1':
                this.tasksManager.getGeoJsonFromTaskId(this.task.id)
                    .then(function (geoJson) {
                    var taskData = [];
                    taskData.push(geoJson);
                    _this.taskData = taskData;
                });
                break;
            case '3':
                this.tasksManager.getSurveyFromTaskId(this.task.id)
                    .then(function (property) {
                    var taskData = [];
                    taskData.push(property);
                    _this.taskData = taskData;
                });
                break;
        }
    };
    ViewTaskComponent.prototype.downloadData = function (data) {
        var _this = this;
        switch (String(this.task.type.id)) {
            case '1':
                var geoJsonArray = [];
                var points_1 = [];
                var lines_1 = [];
                var polygons_1 = [];
                data.features.forEach(function (feature) {
                    switch (feature.geometry.type) {
                        case MapHelper_1.MapHelper.POINT:
                            points_1.push(feature);
                            break;
                        case MapHelper_1.MapHelper.LINE:
                            lines_1.push(feature);
                            break;
                        case MapHelper_1.MapHelper.POLYGON:
                            polygons_1.push(feature);
                            break;
                    }
                });
                if (points_1.length > 0) {
                    var geoJson = {
                        'type': 'FeatureCollection',
                        'features': 0
                    };
                    geoJson.features = points_1;
                    geoJsonArray.push(geoJson);
                }
                if (lines_1.length > 0) {
                    var geoJson = {
                        'type': 'FeatureCollection',
                        'features': 0
                    };
                    geoJson.features = lines_1;
                    geoJsonArray.push(geoJson);
                }
                if (polygons_1.length > 0) {
                    var geoJson = {
                        'type': 'FeatureCollection',
                        'features': 0
                    };
                    geoJson.features = polygons_1;
                    geoJsonArray.push(geoJson);
                }
                geoJsonArray.forEach(function (geoJson) {
                    _this.getShapeFile(geoJson);
                });
                break;
        }
    };
    ViewTaskComponent.prototype.getShapeFile = function (geoJson) {
        this.geoJsonService.geoJsonToShape(geoJson, MapHelper_1.MapHelper.LINE)
            .then(function (blob) {
            browser_utils_1.BrowserUtils.downloadZipFromBlob(blob, MapHelper_1.MapHelper.LINE);
        })
            .catch(function (error) {
            console.log(error);
        });
        this.geoJsonService.geoJsonToShape(geoJson, MapHelper_1.MapHelper.MULTI_LINE)
            .then(function (blob) {
            browser_utils_1.BrowserUtils.downloadZipFromBlob(blob, MapHelper_1.MapHelper.MULTI_LINE);
        })
            .catch(function (error) {
            console.log(error);
        });
        this.geoJsonService.geoJsonToShape(geoJson, MapHelper_1.MapHelper.POLYGON)
            .then(function (blob) {
            browser_utils_1.BrowserUtils.downloadZipFromBlob(blob, MapHelper_1.MapHelper.POLYGON);
        })
            .catch(function (error) {
            console.log(error);
        });
        this.geoJsonService.geoJsonToShape(geoJson, MapHelper_1.MapHelper.POINT)
            .then(function (blob) {
            browser_utils_1.BrowserUtils.downloadZipFromBlob(blob, MapHelper_1.MapHelper.POINT);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ViewTaskComponent.prototype.approveTask = function () {
        var _this = this;
        var componente = this;
        if (this.isAdministrativo) {
            if (this.hasDocuments) {
                this.predial = false;
                this.documents.forEach(function (documento) {
                    if (Number(documento.id_sub_type) === 5) {
                        componente.predial = true;
                    }
                });
                if (this.predial) {
                    this.tasksManager.approveTask(this.task.id)
                        .then(function () {
                        _this.tasksManager.clearObjects();
                        var message = {
                            'tipo': 'Tarea Aprobada ',
                            'message': ' satisfactoriamente',
                            'style': 'alert-success'
                        };
                        _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                        var link = ['/app/tasks'];
                        componente.router.navigate(link);
                    });
                }
                else {
                    var message = {
                        'tipo': 'Archivo Requerido: ',
                        'message': ' Se requiere desde Sig cargar la ficha Predial para aprobar',
                        'style': 'alert-warning'
                    };
                    this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                }
            }
            else {
                var message = {
                    'tipo': 'Archivo Requerido: ',
                    'message': ' Se requiere la ficha Predial para aprobar desde Sig',
                    'style': 'alert-warning'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            }
        }
        else {
            this.tasksManager.approveTask(this.task.id)
                .then(function () {
                _this.tasksManager.clearObjects();
                var message = {
                    'tipo': 'Tarea Aprobada ',
                    'message': ' satisfactoriamente',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                var link = ['/app/tasks'];
                _this.router.navigate(link);
            });
        }
    };
    ViewTaskComponent.prototype.approveTaskOtros = function () {
        var _this = this;
        this.tasksManager.approveTask(this.task.id)
            .then(function () {
            _this.tasksManager.clearObjects();
            var message = {
                'tipo': 'Tarea Aprobada ',
                'message': ' satisfactoriamente',
                'style': 'alert-success'
            };
            _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            var link = ['/app/tasks'];
            _this.router.navigate(link);
        });
    };
    ViewTaskComponent.prototype.approveTaskBuenasP = function () {
        var _this = this;
        var componente = this;
        if (this.hasDocuments) {
            this.tasksManager.approveTask(this.task.id)
                .then(function () {
                _this.tasksManager.clearObjects();
                var message = {
                    'tipo': 'Tarea Aprobada ',
                    'message': ' satisfactoriamente',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                var link = ['/app/tasks'];
                componente.router.navigate(link);
            });
        }
        else {
            var message = {
                'tipo': 'Archivo Requerido: ',
                'message': ' Se requiere mapa de Buenas Prácticas para Aprobar',
                'style': 'alert-warning'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        }
    };
    ViewTaskComponent.prototype.approveTaskSigGeneracion = function () {
        var _this = this;
        var componente = this;
        if (this.hasDocuments) {
            this.mapaverif = false;
            this.documents.forEach(function (documento) {
                if (Number(documento.id_sub_type) === 15) {
                    componente.mapaverif = true;
                }
            });
            if (this.mapaverif) {
                this.tasksManager.approveTask(this.task.id)
                    .then(function () {
                    _this.tasksManager.clearObjects();
                    var message = {
                        'tipo': 'Tarea Aprobada ',
                        'message': ' satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/tasks'];
                    componente.router.navigate(link);
                });
            }
            else {
                var message = {
                    'tipo': 'Archivo Requerido: ',
                    'message': ' Se requiere la carga del Mapa de verificación y seguimiento',
                    'style': 'alert-warning'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            }
        }
    };
    ViewTaskComponent.prototype.approveTaskConceptoCoordinacion = function () {
        var _this = this;
        var componente = this;
        if (this.hasDocuments) {
            this.conceptoCoor = false;
            this.documents.forEach(function (documento) {
                if (Number(documento.id_sub_type) === 27) {
                    componente.conceptoCoor = true;
                }
            });
            if (this.conceptoCoor) {
                this.tasksManager.approveTask(this.task.id)
                    .then(function () {
                    _this.tasksManager.clearObjects();
                    var message = {
                        'tipo': 'Tarea Aprobada ',
                        'message': ' satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/tasks'];
                    componente.router.navigate(link);
                });
            }
            else {
                var message = {
                    'tipo': 'Archivo Requerido: ',
                    'message': ' Se requiere la carga del Concepto de Coordinación',
                    'style': 'alert-warning'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            }
        }
    };
    ViewTaskComponent.prototype.approveTaskConceptoJuridico = function () {
        var _this = this;
        var componente = this;
        if (this.hasDocuments) {
            this.conceptoCoor = false;
            this.documents.forEach(function (documento) {
                if (Number(documento.id_sub_type) === 28) {
                    componente.conceptoCoor = true;
                }
            });
            if (this.conceptoCoor) {
                this.tasksManager.approveTask(this.task.id)
                    .then(function () {
                    _this.tasksManager.clearObjects();
                    var message = {
                        'tipo': 'Tarea Aprobada ',
                        'message': ' satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/tasks'];
                    componente.router.navigate(link);
                });
            }
            else {
                var message = {
                    'tipo': 'Archivo Requerido: ',
                    'message': ' Se requiere la carga del Concepto Jurídico',
                    'style': 'alert-warning'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            }
        }
    };
    ViewTaskComponent.prototype.approveTaskMinutaDireccion = function () {
        var _this = this;
        var componente = this;
        if (this.hasDocuments) {
            this.conceptoCoor = false;
            this.documents.forEach(function (documento) {
                if (Number(documento.id_sub_type) === 16) {
                    componente.conceptoCoor = true;
                }
            });
            if (this.conceptoCoor) {
                this.tasksManager.approveTask(this.task.id)
                    .then(function () {
                    _this.tasksManager.clearObjects();
                    var message = {
                        'tipo': 'Tarea Aprobada ',
                        'message': ' satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/tasks'];
                    componente.router.navigate(link);
                });
            }
            else {
                var message = {
                    'tipo': 'Archivo Requerido: ',
                    'message': ' Se requiere la carga de la Minuta firmada por Dirección',
                    'style': 'alert-warning'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            }
        }
    };
    ViewTaskComponent.prototype.approvePropietarioFirma = function () {
        var _this = this;
        var componente = this;
        if (this.hasDocuments) {
            this.conceptoCoor = false;
            this.documents.forEach(function (documento) {
                if (Number(documento.id_sub_type) === 32) {
                    componente.conceptoCoor = true;
                }
            });
            if (this.conceptoCoor) {
                this.tasksManager.approveTask(this.task.id)
                    .then(function () {
                    _this.tasksManager.clearObjects();
                    var message = {
                        'tipo': 'Tarea Aprobada ',
                        'message': ' satisfactoriamente',
                        'style': 'alert-success'
                    };
                    _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                    var link = ['/app/tasks'];
                    componente.router.navigate(link);
                });
            }
            else {
                var message = {
                    'tipo': 'Archivo Requerido: ',
                    'message': ' Se requiere la carga de la Minuta firmada por el Propietario',
                    'style': 'alert-warning'
                };
                this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            }
        }
    };
    ViewTaskComponent.prototype.approveTaskProgrammer = function () {
        var _this = this;
        var componente = this;
        if (this.hasProgramer) {
            this.tasksManager.approveTask(this.task.id)
                .then(function () {
                _this.tasksManager.clearObjects();
                var message = {
                    'tipo': 'Programación Enviada ',
                    'message': ' satisfactoriamente',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                var link = ['/app/tasks'];
                componente.router.navigate(link);
            });
        }
        else {
            var message = {
                'tipo': 'Sin programación: ',
                'message': ' Se requiere registrar al menos un evento',
                'style': 'alert-warning'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        }
    };
    ViewTaskComponent.prototype.refreshFiles = function ($event) {
        this.obtenerArchivos();
    };
    //////devolver Tarea
    ViewTaskComponent.prototype.decline = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            var objeto = {
                'task_id': id,
                'sub_type': _this.task.sub_type.id,
                'comment': _this.comentarioRechazo
            };
            if (objeto.comment !== '' && objeto.comment !== undefined) {
                _this.tasksManager.insertComment(objeto)
                    .then(function (response) {
                    _this.tasksManager.returnTask(String(id))
                        .then(function () {
                        var message = {
                            'tipo': 'Tarea Rechazada ',
                            'message': ' y devuelta',
                            'style': 'alert-success'
                        };
                        _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                        _this.tasksManager.clearObjects();
                        var link = ['/app/tasks'];
                        _this.router.navigate(link);
                    });
                });
            }
            else {
                var message = {
                    'tipo': 'Error',
                    'message': 'Es obligartorio enviar alguna razón de rechazo',
                    'style': 'alert-danger'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            }
        });
    };
    //////devolver Tarea PERSONALIZAR
    ViewTaskComponent.prototype.declineOtros = function () {
        var _this = this;
        this.activatedRoute.paramMap
            .map(function (params) { return +params.get('id') + ''; })
            .subscribe(function (idString) {
            var id = Number(idString);
            var objeto = {
                'task_id': id,
                'sub_type': _this.task.sub_type.id,
                'comment': _this.comentarioRechazo
            };
            if (objeto.comment !== '' && objeto.comment !== undefined) {
                _this.tasksManager.insertComment(objeto)
                    .then(function (response) {
                    _this.tasksManager.returnTaskFinanciero(String(id))
                        .then(function () {
                        var message = {
                            'tipo': 'Tarea Rechazada ',
                            'message': ' y devuelta',
                            'style': 'alert-success'
                        };
                        _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                        _this.tasksManager.clearObjects();
                        var link = ['/app/tasks'];
                        _this.router.navigate(link);
                    });
                });
            }
            else {
                var message = {
                    'tipo': 'Error',
                    'message': 'Es obligartorio enviar alguna razón de rechazo',
                    'style': 'alert-danger'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            }
        });
    };
    ViewTaskComponent.prototype.eliminarDoc = function (id, type) {
        var _this = this;
        this.tasksManager.removeFileTask(id, type)
            .then(function () {
            _this.obtenerArchivos();
            var message = {
                'tipo': 'Archivo Eliminado ',
                'message': ' satisfactoriamente',
                'style': 'alert-success'
            };
            _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        }, function (reason) {
            var message = {
                'tipo': 'Ha ocurrido un error ',
                'message': ' al intentar eliminar el archivo',
                'style': 'alert-danger'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        });
    };
    ViewTaskComponent.prototype.obtenerArchivos = function () {
        var _this = this;
        this.documents = null;
        this.tasksManager.getAllTaskFiles(this.task)
            .then(function (files) {
            if (files.images && files.documents) {
                if (files.images.length > 0 || files.documents.length > 0) {
                    if (files.images.length > 0) {
                        _this.images = files.images;
                    }
                    if (files.documents && files.documents.length > 0) {
                        _this.documents = files.documents;
                    }
                    _this.hasDocuments = true;
                }
                else {
                    _this.hasDocuments = false;
                }
            }
        });
    };
    ViewTaskComponent.prototype.returnName = function (nameFile) {
        var nombre = nameFile.split('_');
        return nombre[1];
    };
    ViewTaskComponent.prototype.eventoProgramar = function ($event) {
        if ($event.payload.length > 0) {
            this.hasProgramer = true;
        }
        else {
            this.hasProgramer = false;
        }
    };
    ViewTaskComponent.prototype.solicitarCertificado = function () {
        var _this = this;
        this.tasksManager.crearCertificado(String(this.task.id))
            .then(function () {
            var message = {
                'tipo': 'Solicitud de Certificado de Tradición ',
                'message': ' enviada al GuardaCuenca',
                'style': 'alert-success'
            };
            _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
            _this.tasksManager.clearObjects();
            var link = ['/app/tasks'];
            _this.router.navigate(link);
        });
    };
    ///////Enviar certificado a Jurídico
    ViewTaskComponent.prototype.enviarCertificado = function () {
        var component = this;
        if (component.hasDocuments) {
            component.tasksManager.enviarCertificado(String(this.task.id))
                .then(function () {
                var message = {
                    'tipo': 'Certificado de Tradición ',
                    'message': ' enviado a Jurídico para su revisión',
                    'style': 'alert-success'
                };
                component.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                component.tasksManager.clearObjects();
                var link = ['/app/tasks'];
                component.router.navigate(link);
            });
        }
        else {
            var message = {
                'tipo': 'Certificado de Tradición ',
                'message': ' requerido',
                'style': 'alert-danger'
            };
            component.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        }
    };
    ViewTaskComponent.prototype.cancelarTarea = function () {
        if (confirm('Confirmas la cancelación de la tarea?')) {
            var component_1 = this;
            component_1.tasksManager.cancelarTask(String(this.task.id))
                .then(function () {
                var message = {
                    'tipo': 'Tarea Cancelada ',
                    'message': ' la tarea ha sido cancelada',
                    'style': 'alert-success'
                };
                component_1.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                component_1.tasksManager.clearObjects();
                var link = ['/app/tasks'];
                component_1.router.navigate(link);
            });
        }
    };
    ViewTaskComponent.prototype.getRoles = function () {
        var component = this;
        return new Promise(function (resolve) {
            component.rolesManager.getRolesEquipo()
                .then(function (roles) {
                if (roles.length > 0) {
                    if (roles[0].id !== 0) {
                        var placeholder = component.getCustomPlaceholder('Selecciona un rol');
                        roles.unshift(placeholder);
                    }
                    component.task.role = roles[0];
                    component.roles = roles;
                    resolve(component);
                }
            });
        });
    };
    ViewTaskComponent.prototype.getUsers = function () {
        var component = this;
        this.users = [];
        return new Promise(function (resolve) {
            component.proceduresManager.getUsers(component.task.role.id)
                .then(function (users) {
                if (users.length > 0) {
                    if (users[0].id !== '0') {
                        var placeholder = component.getCustomPlaceholder('Selecciona un usuario');
                        users.unshift(placeholder);
                    }
                    if (component.task.id) {
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
    ViewTaskComponent.prototype.enviarTareaCoordinadorA = function () {
        var _this = this;
        if (this.task.role.id !== 0 && this.task.role.id !== undefined && this.task.user.id + '' !== '0' && this.task.user.id !== undefined) {
            this.tasksManager.aproveTaskCooA(String(this.task.id), String(this.task.user.id))
                .then(function () {
                var message = {
                    'tipo': 'Tarea Asignada ',
                    'message': ' la tarea ha sido asignada satisfactoriamente',
                    'style': 'alert-success'
                };
                _this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
                _this.tasksManager.clearObjects();
                var link = ['/app/tasks'];
                _this.router.navigate(link);
            });
        }
        else {
            var message = {
                'tipo': 'Selecciona el Usuario: ',
                'message': ' Guarda Cuenca o de Equipo de Seguimiento',
                'style': 'alert-warning'
            };
            this.messagingService.publish(new messaging_service_1.BusMessage('alerta', message));
        }
    };
    ViewTaskComponent.prototype.checkCartaIntencion = function () {
        var _this = this;
        this.tasksManager.getCartaIntencion(this.task.id)
            .then(function (response) {
            _this.cartaIntencionData = response;
        });
    };
    return ViewTaskComponent;
}(base_component_1.BaseComponent));
ViewTaskComponent = __decorate([
    core_1.Component({
        selector: 'cuenca-view-task',
        templateUrl: './view-task.component.html',
        styleUrls: ['./view-task.component.css']
    }),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        procedures_manager_1.ProceduresManager,
        tasks_manager_1.TasksManager,
        router_1.Router,
        router_1.ActivatedRoute,
        geo_json_service_1.GeoJsonService,
        roles_manager_1.RolesManager,
        cuenca_verde_service_1.CuencaVerdeService])
], ViewTaskComponent);
exports.ViewTaskComponent = ViewTaskComponent;
//# sourceMappingURL=view-task.component.js.map