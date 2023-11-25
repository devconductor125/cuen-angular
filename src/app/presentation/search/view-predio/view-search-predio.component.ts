import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {MapHelper} from '../../map/MapHelper';
import {BrowserUtils} from '../../../data/utils/browser.utils';
import {Task} from '../../../data/model/task';
import {GeoJsonService} from '../../../data/services/geo-json.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BaseComponent} from '../../base-component/base-component';
import {User} from '../../../data/model/user';
import GeoJson = geoJsonInterface.GeoJson;
import Property = propertyInterface.Property;
import Comments = commentsInterface.Comments;
import Documents = documentsInterface.Documents;
import Role = roleInterface.Role;

@Component({
  selector: 'cuenca-view-search-predio',
  templateUrl: './view-search-predio.component.html',
  styleUrls: ['./view-search-predio.component.css']
})
export class ViewSearchPredioComponent extends BaseComponent implements OnInit {
  public task: Task;
  public comments: Array<Comments>;
  public files: any;
  public images: any;
  public documents: Array<Documents>;
  public dataType: any = {};
  public taskData: Array<any>;
  public rolUser: String;
  public roles: Array<Role> = [];
  public hasDocuments: Boolean = false;
  public hasProgramer: Boolean = false;
  public predial: Boolean = false;
  public mapaverif: Boolean = false;
  public conceptoCoor: Boolean = false;
  public budget: any;
  public comentario: string;
  public comentarioRechazo: string;
  public users: Array<User> = [];
  public URL_BASE_FILES: string;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              private geoJsonService: GeoJsonService,
              public rolesManager: RolesManager,
              protected cuencaService: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.URL_BASE_FILES = this.cuencaService.API_URL_FILES;
    this.getUserRoles(this);
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.tasksManager.loadAllObjects();
    this.getTask();
  }

  public getTask(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        if (id > 0) {
          this.tasksManager.getTaskDetails(String(id))
            .then(task => {
              this.task = task;
              this.setDataType();
            }).then(() => {
            this.obtenerArchivos();
            this.getComments();
            this.getData();
            this.getRoles();
          });
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });
  }

  private getComments(): void {
    this.tasksManager.getAllComments(this.task)
      .then(comments => {
        this.comments = comments;
      });
  }

  public insertComment(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        const objeto = {
          'task_id': id,
          'sub_type': this.task.sub_type.id,
          'comment': this.comentario
        };
        if (objeto.comment !== '' && objeto.comment !== undefined) {
          this.tasksManager.insertComment(objeto)
            .then(response => {
              this.getComments();
              this.comentario = '';
            });
        }
      });
  }

  private setDataType() {
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
  }

  private getData() {
    switch (this.task.details.type.id + '') {
      case '1':
        this.tasksManager.getGeoJsonFromTaskId(this.task.id)
          .then((geoJson: GeoJson) => {
            const taskData: Array<GeoJson> = [];
            taskData.push(geoJson);
            this.taskData = taskData;
          });
        break;
      case '3':
        this.tasksManager.getSurveyFromTaskId(this.task.id)
          .then((property: Property) => {
            const taskData: Array<Property> = [];
            taskData.push(property);
            this.taskData = taskData;
          });
        break;
    }
  }

  downloadData(data: any) {
    switch (this.task.taskType.id) {
      case '1':
        const geoJsonArray: any = [];
        const points: any = [];
        const lines: any = [];
        const polygons: any = [];
        data.features.forEach(function (feature: any) {
          switch (feature.geometry.type) {
            case MapHelper.POINT:
              points.push(feature);
              break;
            case MapHelper.LINE:
              lines.push(feature);
              break;
            case MapHelper.POLYGON:
              polygons.push(feature);
              break;
          }
        });
        if (points.length > 0) {
          const geoJson = {
            'type': 'FeatureCollection',
            'features': 0
          };
          geoJson.features = points;
          geoJsonArray.push(geoJson);
        }
        if (lines.length > 0) {
          const geoJson = {
            'type': 'FeatureCollection',
            'features': 0
          };
          geoJson.features = lines;
          geoJsonArray.push(geoJson);
        }
        if (polygons.length > 0) {
          const geoJson = {
            'type': 'FeatureCollection',
            'features': 0
          };
          geoJson.features = polygons;
          geoJsonArray.push(geoJson);
        }
        geoJsonArray.forEach((geoJson: GeoJson) => {
          this.getShapeFile(geoJson);
        });
        break;
    }
  }

  getShapeFile(geoJson: GeoJson): void {
    this.geoJsonService.geoJsonToShape(geoJson, MapHelper.LINE)
      .then(blob => {
        BrowserUtils.downloadZipFromBlob(blob, MapHelper.LINE);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.geoJsonService.geoJsonToShape(geoJson, MapHelper.MULTI_LINE)
      .then(blob => {
        BrowserUtils.downloadZipFromBlob(blob, MapHelper.MULTI_LINE);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.geoJsonService.geoJsonToShape(geoJson, MapHelper.POLYGON)
      .then(blob => {
        BrowserUtils.downloadZipFromBlob(blob, MapHelper.POLYGON);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.geoJsonService.geoJsonToShape(geoJson, MapHelper.POINT)
      .then(blob => {
        BrowserUtils.downloadZipFromBlob(blob, MapHelper.POINT);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  approveTask() {
    const componente = this;
    if (this.isAdministrativo) {
      if (this.hasDocuments) {
        this.predial = false;
        this.documents.forEach(function (documento: any) {
          if (documento.id_sub_type === 5) {/////5 = Ficha Predial
            componente.predial = true;
          }
        });
        if (this.predial) {
          this.tasksManager.approveTask(this.task.id)
            .then(() => {
              this.tasksManager.clearObjects();
              const message = {
                'tipo': 'Tarea Aprobada ',
                'message': ' satisfactoriamente',
                'style': 'alert-success'
              };
              this.messagingService.publish(new BusMessage('alerta', message));
              const link = ['/app/tasks'];
              componente.router.navigate(link);
            });
        } else {
          const message = {
            'tipo': 'Archivo Requerido: ',
            'message': ' Se requiere desde Sig cargar la ficha Predial para aprobar',
            'style': 'alert-warning'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
        }
      } else {
        const message = {
          'tipo': 'Archivo Requerido: ',
          'message': ' Se requiere la ficha Predial para aprobar desde Sig',
          'style': 'alert-warning'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      }
    } else {
      this.tasksManager.approveTask(this.task.id)
        .then(() => {
          this.tasksManager.clearObjects();
          const message = {
            'tipo': 'Tarea Aprobada ',
            'message': ' satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          const link = ['/app/tasks'];
          this.router.navigate(link);
        });
    }
  }

  approveTaskOtros() {
    this.tasksManager.approveTask(this.task.id)
      .then(() => {
        this.tasksManager.clearObjects();
        const message = {
          'tipo': 'Tarea Aprobada ',
          'message': ' satisfactoriamente',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        const link = ['/app/tasks'];
        this.router.navigate(link);
      });
  }

  approveTaskBuenasP() {
    const componente = this;
    if (this.hasDocuments) {
      this.tasksManager.approveTask(this.task.id)
        .then(() => {
          this.tasksManager.clearObjects();
          const message = {
            'tipo': 'Tarea Aprobada ',
            'message': ' satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          const link = ['/app/tasks'];
          componente.router.navigate(link);
        });
    } else {
      const message = {
        'tipo': 'Archivo Requerido: ',
        'message': ' Se requiere mapa de Buenas Prácticas para Aprobar',
        'style': 'alert-warning'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
  }

  approveTaskSigGeneracion() {
    const componente = this;
    if (this.hasDocuments) {
      this.mapaverif = false;
      this.documents.forEach(function (documento: any) {
        if (documento.id_sub_type === 15) { /////15 = Mapa de verificacion y seguimiento
          componente.mapaverif = true;
        }
      });
      if (this.mapaverif) {
        this.tasksManager.approveTask(this.task.id)
          .then(() => {
            this.tasksManager.clearObjects();
            const message = {
              'tipo': 'Tarea Aprobada ',
              'message': ' satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/tasks'];
            componente.router.navigate(link);
          });
      } else {
        const message = {
          'tipo': 'Archivo Requerido: ',
          'message': ' Se requiere la carga del Mapa de verificación y seguimiento',
          'style': 'alert-warning'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      }
    }
  }

  approveTaskConceptoCoordinacion() {
    const componente = this;
    if (this.hasDocuments) {
      this.conceptoCoor = false;
      this.documents.forEach(function (documento: any) {
        if (documento.id_sub_type === 27) { /////27 = Mapa de verificacion y seguimiento
          componente.conceptoCoor = true;
        }
      });
      if (this.conceptoCoor) {
        this.tasksManager.approveTask(this.task.id)
          .then(() => {
            this.tasksManager.clearObjects();
            const message = {
              'tipo': 'Tarea Aprobada ',
              'message': ' satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/tasks'];
            componente.router.navigate(link);
          });
      } else {
        const message = {
          'tipo': 'Archivo Requerido: ',
          'message': ' Se requiere la carga del Concepto de Coordinación',
          'style': 'alert-warning'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      }
    }
  }

  approveTaskConceptoJuridico() {
    const componente = this;
    if (this.hasDocuments) {
      this.conceptoCoor = false;
      this.documents.forEach(function (documento: any) {
        if (documento.id_sub_type === 28) { /////27 = Mapa de verificacion y seguimiento
          componente.conceptoCoor = true;
        }
      });
      if (this.conceptoCoor) {
        this.tasksManager.approveTask(this.task.id)
          .then(() => {
            this.tasksManager.clearObjects();
            const message = {
              'tipo': 'Tarea Aprobada ',
              'message': ' satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/tasks'];
            componente.router.navigate(link);
          });
      } else {
        const message = {
          'tipo': 'Archivo Requerido: ',
          'message': ' Se requiere la carga del Concepto Jurídico',
          'style': 'alert-warning'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      }
    }
  }

  approveTaskMinutaDireccion() {
    const componente = this;
    if (this.hasDocuments) {
      this.conceptoCoor = false;
      this.documents.forEach(function (documento: any) {
        if (documento.id_sub_type === 16) { /////27 = Mapa de verificacion y seguimiento
          componente.conceptoCoor = true;
        }
      });
      if (this.conceptoCoor) {
        this.tasksManager.approveTask(this.task.id)
          .then(() => {
            this.tasksManager.clearObjects();
            const message = {
              'tipo': 'Tarea Aprobada ',
              'message': ' satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/tasks'];
            componente.router.navigate(link);
          });
      } else {
        const message = {
          'tipo': 'Archivo Requerido: ',
          'message': ' Se requiere la carga de la Minuta firmada por Dirección',
          'style': 'alert-warning'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      }
    }
  }

  approvePropietarioFirma() {
    const componente = this;
    if (this.hasDocuments) {
      this.conceptoCoor = false;
      this.documents.forEach(function (documento: any) {
        if (documento.id_sub_type === 32) { /////27 = Mapa de verificacion y seguimiento
          componente.conceptoCoor = true;
        }
      });
      if (this.conceptoCoor) {
        this.tasksManager.approveTask(this.task.id)
          .then(() => {
            this.tasksManager.clearObjects();
            const message = {
              'tipo': 'Tarea Aprobada ',
              'message': ' satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/tasks'];
            componente.router.navigate(link);
          });
      } else {
        const message = {
          'tipo': 'Archivo Requerido: ',
          'message': ' Se requiere la carga de la Minuta firmada por el Propietario',
          'style': 'alert-warning'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      }
    }
  }

  approveTaskProgrammer() {
    const componente = this;
    if (this.hasProgramer) {
      this.tasksManager.approveTask(this.task.id)
        .then(() => {
          this.tasksManager.clearObjects();
          const message = {
            'tipo': 'Programación Enviada ',
            'message': ' satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          const link = ['/app/tasks'];
          componente.router.navigate(link);
        });
    } else {
      const message = {
        'tipo': 'Sin programación: ',
        'message': ' Se requiere registrar al menos un evento',
        'style': 'alert-warning'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
  }

  refreshFiles($event: object) {
    this.obtenerArchivos();
  }

  //////devolver Tarea
  public decline(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        const objeto = {
          'task_id': id,
          'sub_type': this.task.sub_type.id,
          'comment': this.comentarioRechazo
        };
        if (objeto.comment !== '' && objeto.comment !== undefined) {
          this.tasksManager.insertComment(objeto)
            .then(response => {
              this.tasksManager.returnTask(String(id))
                .then(() => {
                  const message = {
                    'tipo': 'Tarea Rechazada ',
                    'message': ' y devuelta',
                    'style': 'alert-success'
                  };
                  this.messagingService.publish(new BusMessage('alerta', message));
                  this.tasksManager.clearObjects();
                  const link = ['/app/tasks'];
                  this.router.navigate(link);
                });
            });
        } else {
          const message = {
            'tipo': 'Error',
            'message': 'Es obligartorio enviar alguna razón de rechazo',
            'style': 'alert-danger'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
        }
      });
  }

  //////devolver Tarea PERSONALIZAR
  public declineOtros(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        const objeto = {
          'task_id': id,
          'sub_type': this.task.sub_type.id,
          'comment': this.comentarioRechazo
        };
        if (objeto.comment !== '' && objeto.comment !== undefined) {
          this.tasksManager.insertComment(objeto)
            .then(response => {
              this.tasksManager.returnTaskFinanciero(String(id))
                .then(() => {
                  const message = {
                    'tipo': 'Tarea Rechazada ',
                    'message': ' y devuelta',
                    'style': 'alert-success'
                  };
                  this.messagingService.publish(new BusMessage('alerta', message));
                  this.tasksManager.clearObjects();
                  const link = ['/app/tasks'];
                  this.router.navigate(link);
                });
            });
        } else {
          const message = {
            'tipo': 'Error',
            'message': 'Es obligartorio enviar alguna razón de rechazo',
            'style': 'alert-danger'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
        }
      });
  }

  public eliminarDoc(id: string, type: string) {
    this.tasksManager.removeFileTask(id, type)
      .then(() => {
        this.obtenerArchivos();
        const message = {
          'tipo': 'Archivo Eliminado ',
          'message': ' satisfactoriamente',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      }, function (reason) {
        const message = {
          'tipo': 'Ha ocurrido un error ',
          'message': ' al intentar eliminar el archivo',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      });
  }

  public obtenerArchivos() {
    this.documents = null;
    this.tasksManager.getAllTaskFiles(this.task)
      .then((files: any) => {
        if (files.images && files.documents) {
          if (files.images.length > 0 || files.documents.length > 0) {
            if (files.images.length > 0) {
              this.images = files.images;
            }
            if (files.documents && files.documents.length > 0) {
              this.documents = files.documents;
            }
            this.hasDocuments = true;
          } else {
            this.hasDocuments = false;
          }
        }
      });
  }

  returnName(nameFile: string) {
    const nombre = nameFile.split('_');
    return nombre[1];
  }

  eventoProgramar($event: any) {
    if ($event.payload.length > 0) {
      this.hasProgramer = true;
    } else {
      this.hasProgramer = false;
    }
  }

  public solicitarCertificado(): void {
    this.tasksManager.crearCertificado(String(this.task.id))
      .then(() => {
        const message = {
          'tipo': 'Solicitud de Certificado de Tradición ',
          'message': ' enviada al GuardaCuenca',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        this.tasksManager.clearObjects();
        const link = ['/app/tasks'];
        this.router.navigate(link);
      });
  }

///////Enviar certificado a Jurídico
  public enviarCertificado(): void {
    const component = this;
    if (component.hasDocuments) {
      component.tasksManager.enviarCertificado(String(this.task.id))
        .then(() => {
          const message = {
            'tipo': 'Certificado de Tradición ',
            'message': ' enviado a Jurídico para su revisión',
            'style': 'alert-success'
          };
          component.messagingService.publish(new BusMessage('alerta', message));
          component.tasksManager.clearObjects();
          const link = ['/app/tasks'];
          component.router.navigate(link);
        });
    } else {
      const message = {
        'tipo': 'Certificado de Tradición ',
        'message': ' requerido',
        'style': 'alert-danger'
      };
      component.messagingService.publish(new BusMessage('alerta', message));
    }
  }

  public cancelarTarea(): void {
    if (confirm('Confirmas la cancelación de la tarea?')) {
      const component = this;
      component.tasksManager.cancelarTask(String(this.task.id))
        .then(() => {
          const message = {
            'tipo': 'Tarea Cancelada ',
            'message': ' la tarea ha sido cancelada',
            'style': 'alert-success'
          };
          component.messagingService.publish(new BusMessage('alerta', message));
          component.tasksManager.clearObjects();
          const link = ['/app/tasks'];
          component.router.navigate(link);
        });
    }
  }

  getRoles(): Promise<any> {
    const component = this;
    return new Promise((resolve) => {
      component.rolesManager.getRolesEquipo()
        .then((roles: Array<Role>) => {
          if (roles.length > 0) {
            if (roles[0].id !== 0) {
              const placeholder = component.getCustomPlaceholder('Selecciona un rol');
              roles.unshift(placeholder);
            }
            component.task.role = roles[0];
            component.roles = roles;
            resolve(component);
          }
        });
    });
  }

  getUsers(): Promise<any> {
    const component = this;
    this.users = [];
    return new Promise((resolve) => {
      component.proceduresManager.getUsers(component.task.role.id)
        .then((users: Array<User>) => {
          if (users.length > 0) {
            if (users[0].id !== '0') {
              const placeholder = component.getCustomPlaceholder('Selecciona un usuario');
              users.unshift(placeholder);
            }
            if (component.task.id) {
              component.task.user = users[0];
            }
            component.users = users;
            component.users.forEach(function (user: User) {
              if (user.id === component.task.user.id) {
                component.task.user = user;
              }
            });
            resolve();
          }
        });
    });
  }

  enviarTareaCoordinadorA(): void {
    if (this.task.role.id !== 0 && this.task.role.id !== undefined && this.task.user.id + '' !== '0' && this.task.user.id !== undefined) {
      this.tasksManager.aproveTaskCooA(String(this.task.id), String(this.task.user.id))
        .then(() => {
          const message = {
            'tipo': 'Tarea Asignada ',
            'message': ' la tarea ha sido asignada satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          this.tasksManager.clearObjects();
          const link = ['/app/tasks'];
          this.router.navigate(link);
        });
    } else {
      const message = {
        'tipo': 'Selecciona el Usuario: ',
        'message': ' Guarda Cuenca o de Equipo de Seguimiento',
        'style': 'alert-warning'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
  }
}
