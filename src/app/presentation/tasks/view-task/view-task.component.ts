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
import {Http} from '@angular/http';
import GeoJson = geoJsonInterface.GeoJson;
import Comments = commentsInterface.Comments;
import Documents = documentsInterface.Documents;
import Role = roleInterface.Role;
import Anexo = anexoInterface.Anexo;

declare var $: any;

@Component({
  selector: 'cuenca-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent extends BaseComponent implements OnInit {
  public task: Task;
  public files: any = [];
  public images: any = [];
  public documents: Array<Documents>;
  public anexos: Array<Anexo>;
  public selectedDocument: Documents;
  public dataType: any = {};
  public taskData: Array<any> = [];
  public listDocuments: any;
  public rolUser: String;
  public idTask: String;
  public roles: Array<Role> = [];
  public hasDocuments: Boolean = false;
  public hasProgramer: Boolean = false;
  public predial: Boolean = false;
  public mapaverif: Boolean = false;
  public conceptoCoor: Boolean = false;
  public isBudgetContratista: Boolean = false;
  public isBudget: Boolean = false;
  public hasMinuta: Boolean = false;
  public isBudgetExecution: Boolean = false;
  public hasStardForm: Boolean = false;
  public canAssignTask: Boolean = false;

  public budget: any;
  public comentario: string;
  public comentarioRechazo: string;

  public selectNameAnexo: string;
  public subirAnexo: string = null;

  public cartaIntencionData: any;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              private geoJsonService: GeoJsonService,
              public rolesManager: RolesManager,
              protected cuencaService: CuencaVerdeService,
              public http: Http) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.URL_BASE_FILES = this.cuencaService.API_URL_FILES_WITH_TOKEN;
    this.IMAGES_URL_CUENCA = this.cuencaService.API_IMAGES_URL_CUENCA;
    this.getUserRoles(this); // get roles
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.tasksManager.loadAllObjects();
    this.getTask(); // obtener tarea
  }

  public getTask(): void {


    this.activatedRoute.params.subscribe(params => {
      this.idTask = params.id;

      if (this.idTask) {

        const tipoTask = this.idTask.split('_');
        const tipoTaskLabel = tipoTask[1];

        switch (tipoTaskLabel) {
          case '':
            this.tasksManager.getTaskDetails(String(this.idTask))
              .then(task => {
                this.task = task;
                this.getTaskRelatedData();
                if (this.isCoordinadorGuardacuenca && this.task.sub_type.id + '' === '4') {
                  this.canAssignTask = true;
                }
              });
            break;
          default:
            this.tasksManager.getTaskDetails(String(this.idTask))
              .then(task => {
                this.task = task;
                this.getTaskRelatedData();
                if (this.isCoordinadorGuardacuenca && this.task.sub_type.id + '' === '4') {
                  this.canAssignTask = true;
                }
              });
        }
      } else {
        const link = ['/app'];
        this.router.navigate(link);
      }
    });
  }

// obtener comentarios de la tarea
  private getComments(): void {
    this.tasksManager.getAllComments(this.task)
      .then(comments => {
        this.comments = comments;
      });
  }

  private isBudgetContractor(): void {
    this.tasksManager.isBudgetContractor(this.task.procedure.id)
      .then((response: any) => {
        this.isBudgetContratista = response.verified === 'true';
      });
  }

  private bugdetsByProcess() {
    this.tasksManager.getBudgetFromProcess(Number(this.task.procedure.id))
      .then((budgets: any) => {
          this.isBudget = budgets.agreement_total + '' !== '0';
        }
      );
  }

  private getMinuta() {
    this.tasksManager.getMinuta(this.task.id)
      .then((minuta: Array<any>) => {
          this.hasMinuta = minuta.length > 0;
        }
      );
  }

  private isStardForm(): void {
    this.tasksManager.hasStardForm(this.task.id)
      .then((response: any) => {
        this.hasStardForm = response.code && response.code + '' !== '500';
      });
  }

  private isBudgetFinal(): void {
    this.tasksManager.isBudgetFinal(this.task.procedure.id)
      .then((response: any) => {
        this.isBudgetExecution = response.verified === 'true';
      });
  }

  public insertComment(): void {
    if (!this.comentario || this.comentario.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': ' Escribe el comentario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
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

  private selectAnexoFile(document: Documents, name: string): void {
    this.selectNameAnexo = name;
    this.subirAnexo = document.id + '';
    this.selectedDocument = document;
    this.getDocumentAttachment(document);
  }

  private cancelAnexoFile(): void {
    this.selectNameAnexo = null;
    this.subirAnexo = null;
    this.anexos = null;
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

  messageUploadFile($event: any) {
    let message;
    if ($event.payload.code === 200) {
      message = {
        'tipo': 'Respuesta:',
        'message': $event.payload.message,
        'style': 'alert-success'
      };
      if (this.selectedDocument) {
        this.anexos = null;
        this.getDocumentAttachment(this.selectedDocument);
      }
    } else {
      message = {
        'tipo': 'Respuesta:',
        'message': $event.payload.message,
        'style': 'alert-danger'
      };
    }

    this.messagingService.publish(new BusMessage('alerta', message));
  }

  private getTaskMap() {
    this.tasksManager.getGeoJsonFromTaskId(this.task.id)
      .then((geoJson: GeoJson) => {
        if (geoJson && geoJson.features && geoJson.features.length > 0) {
          this.taskData.push(geoJson);
        }
      });
  }

  downloadData(data: any) {
    switch (String(this.task.type.id)) {
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
    if (confirm('Confirmas la aprobación de la tarea?')) {
      const componente = this;
      if (this.isAdministrativo) {
        if (this.hasDocuments) {
          this.predial = false;

          ///  No solicitar Ficha predial en ADMINISTRATIVO ENCUESTA
          if (String(this.task.sub_type.id) === '2' || String(this.task.sub_type.id) === '10') {
            componente.predial = true;
          } else {
            this.documents.forEach(function (documento: any) {
              if (Number(documento.id_sub_type) === 5) {/////5 = Ficha Predial
                componente.predial = true;
              }
            });
          }

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
              }, errorMessage => {
                const message = {
                  'tipo': 'Error: ',
                  'message': ' ' + errorMessage,
                  'style': 'alert-danger'
                };
                this.messagingService.publish(new BusMessage('alerta', message));
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
          }, errorMessage => {
            const message = {
              'tipo': 'Error: ',
              'message': ' ' + errorMessage,
              'style': 'alert-danger'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
          });
      }
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
        if (Number(documento.id_sub_type) === 15) { /////15 = Mapa de verificacion y seguimiento
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
        if (Number(documento.id_sub_type) === 27) { /////27 = Mapa de verificacion y seguimiento
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
        if (Number(documento.id_sub_type) === 28) { /////27 = Mapa de verificacion y seguimiento
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
        if (Number(documento.id_sub_type) === 16) { /////27 = Mapa de verificacion y seguimiento
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
        if (Number(documento.id_sub_type) === 32) { /////27 = Mapa de verificacion y seguimiento
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
        if (files.images.length > 0 || files.documents.length > 0) {
          const imagesAsDocuments = [];
          const images = [];
          if (files.images.length > 0) {
            files.images.forEach(function (image: any) {
              if (image.id_sub_type === 32) { // Minuta firmada
                image.isImage = true;
                imagesAsDocuments.push(image);
              } else {
                images.push(image);
              }
            });
            this.images = images;
          }
          if (files.documents && files.documents.length > 0) {
            this.documents = files.documents;
          }
          this.documents = this.documents.concat(imagesAsDocuments);
          this.hasDocuments = true;
        } else {
          this.hasDocuments = false;
        }
      });
  }

  public getDocumentAttachment(document: Documents) {
    this.anexos = null;
    this.tasksManager.getDocumentAttachment(document)
      .then((anexos: any) => {
        if (anexos.length > 0) {
          this.selectedDocument = document;
          this.anexos = anexos.reverse();
        }
      });
  }

  public deleteAttachedFile(anexo: Anexo) {
    if (confirm('Confirmas eliminar el anexo?')) {
      this.tasksManager.deleteAttachedFile(anexo)
        .then(() => {
          this.obtenerArchivos();
          const message = {
            'tipo': 'Archivo Eliminado ',
            'message': ' satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          this.anexos = null;
          this.getDocumentAttachment(this.selectedDocument);
        }, function (reason) {
          const message = {
            'tipo': 'Ha ocurrido un error ',
            'message': ' al intentar eliminar el archivo',
            'style': 'alert-danger'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
        });
    }
  }

  public getDataDocumentTaskPredio() {
    this.documents = null;
    this.tasksManager.getDataDocumentTaskPredio(this.task.process.id)
      .then((files: any) => {
        this.listDocuments = files;
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

  protected onGotRoles(): void {
    if (this.task && this.isCoordinadorGuardacuenca && this.task.sub_type.id + '' === '4') {
      this.canAssignTask = true;
    }
  }

  getRoles(): Promise<any> {
    const component = this;
    return new Promise((resolve) => {
      component.rolesManager.getRolesEquipo()
        .then((roles: Array<Role>) => {
          const filteredRoles = roles.slice();
          if (filteredRoles.length > 0) {
            if (filteredRoles[0].id !== 0) {
              const placeholder = component.getCustomPlaceholder('Selecciona un rol');
              filteredRoles.unshift(placeholder);
            }
            component.roles = filteredRoles;
            if (Number(component.task.sub_type.id) === 4) {
              component.task.role = filteredRoles[1];
              component.getUsersGuardaCuencas(component)
                .then(users => component.getUsersEquipoSeguimiento(users, component))
                .then(users => component.getUsersCoordinacionGuardaCuenca(users, component))
                .then(users => this.users = users);
            } else {
              component.task.role = filteredRoles[0];
            }
            resolve(component);
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

  public checkCartaIntencion(): void {
    this.tasksManager.getCartaIntencion(this.task.id)
      .then((response: any) => {
        this.cartaIntencionData = response;
      }).catch(error => console.log(error));
  }

  public updateTask(): void {
    if (this.usuariosTareaList.length === 0) {
      const message = {
        'tipo': 'Error:',
        'message': ' Selecciona los usuarios por asignar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    } else {
      const users = this.usuariosTareaList.filter(Number);
      this.tasksManager.update(this.task, users)
        .then(success => {
          if (success) {
            const message = {
              'tipo': 'Actualizada',
              'message': 'La tarea ha sido actualizada satisfactoriamente',
              'style': 'alert-success'
            };

            $('#cModal').modal('toggle');
            this.messagingService.publish(new BusMessage('alerta', message));

            const link = ['/app/tasks'];
            this.router.navigate(link);
          }
        });
    }
  }

  private getTaskRelatedData() {
    this.checkCartaIntencion();
    this.setDataType();
    this.obtenerArchivos();
    this.getComments();
    this.getTaskMap();
    this.getRoles();
    this.getDataDocumentTaskPredio();
    this.isBudgetContractor();
    this.isBudgetFinal();
    this.isStardForm();
    this.bugdetsByProcess();
    this.getMinuta();
  }
}
