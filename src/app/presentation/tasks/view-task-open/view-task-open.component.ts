import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BaseComponent} from '../../base-component/base-component';
import {User} from '../../../data/model/user';
import {MapHelper} from '../../map/MapHelper';
import {BrowserUtils} from '../../../data/utils/browser.utils';
import {GeoJsonService} from '../../../data/services/geo-json.service';
import Documents = documentsInterface.Documents;
import GeoJson = geoJsonInterface.GeoJson;

@Component({
  selector: 'cuenca-view-task-open',
  templateUrl: './view-task-open.component.html',
  styleUrls: ['./view-task-open.component.css']
})
export class ViewTaskOpenComponent extends BaseComponent implements OnInit {
  public task: any;
  public idTask: String;
  public status: String = '';
  public documents: Array<Documents> = [];
  public images: Array<any> = [];
  public possibleSendFinancial: Boolean = false;
  public requiresUserOnSend: Boolean = false;
  public showActorsForm: Boolean = false;
  public canSendTask: Boolean = false;
  public doesntSelectFinancieroUser: Boolean = true;
  public isNotSpecialTask: Boolean = true;
  public canUploadFiles: Boolean = true;
  public taskData: Array<any>;
  public cartaIntencionData: any;
  public dataType: any = {};
  public userFinanciero: Array<any> = [];
  public usersOpenTasks: Array<any> = [];
  public selectedFinanciero: String = '0';
  public selectedUser: String = '0';
  public taskActionButtonText: String = 'Enviar';
  public comentario: string;

  private DATA_TYPE_MAP = 'Mapa';
  private DATA_TYPE_EXCEL = 'Excel';
  private DATA_TYPE_EXCEL_EDITED = 'Excel (editado)';

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              private geoJsonService: GeoJsonService,
              protected cuencaService: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.URL_BASE_FILES = this.cuencaService.API_URL_FILES_WITH_TOKEN;
    this.IMAGES_URL_CUENCA = this.cuencaService.API_URL_IMAGES_WITH_TOKEN;
    this.URL_BASE_IMAGES = this.cuencaService.API_URL_IMAGES;
    this.getUserRoles(this);
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
  }

  protected onGotRoles(): void {
    this.getTask();
  }

  public getTask(): void {

    this.activatedRoute.params.subscribe(params => {
      this.idTask = params.id;

      if (this.idTask) {
        // get detalles de la tarea abierta
        this.tasksManager.getTaskDetailsOpen(String(this.idTask))
          .then(task => {
            this.task = task;
            this.idTask = String(this.idTask);
            this.obtenerArchivos();
            if (String(this.task.task_open_sub_type_id) !== '19') {
              this.getOpenTaskUsers();
              this.getData();
            } else {
              this.doesntSelectFinancieroUser = false;
            }
            this.checkIsNotSpecialTask();
            this.setStatus();
            this.checkForRequiredUserSelection();
            this.checkForCanSendTask();
            this.checkForCanUploadFiles();
            this.checkForActorsForm();
            this.checkActionButtonText();
            this.getComments();
          });
      } else {
        const link = ['/app'];
        this.router.navigate(link);
      }
    });
  }

  private getComments(): void {
    this.tasksManager.getOpenTaskComments(this.task.id)
      .then(comments => {
        this.comments = comments;
      });
  }

  private getData() {
    this.taskData = [];
    switch (this.task.task_open_sub_type_id + '') {
      case this.SUBTYPE_TAREA_HIDRICO_ENVIAR_A_SIG:
      case this.SUBTYPE_TAREA_HIDRICO_EDITAR_MAPA:
      case this.SUBTYPE_TAREA_HIDRICO_POR_FINALIZAR:
      case this.SUBTYPE_TAREA_HIDRICO_FINALIZADA:
      case this.SUBTYPE_TAREA_EROSIVOS_ENVIAR_A_SIG:
      case this.SUBTYPE_TAREA_EROSIVOS_EDITAR_MAPA:
      case this.SUBTYPE_TAREA_EROSIVOS_POR_FINALIZAR:
      case this.SUBTYPE_TAREA_EROSIVOS_FINALIZADA:
      case this.SUBTYPE_TAREA_PSA_EDITAR_SIG:
      case this.SUBTYPE_TAREA_PSA_POR_FINALIZAR:
      case this.SUBTYPE_TAREA_PSA_FINALIZADA:
        this.tasksManager.getGeoJsonFromOpenTaskId(this.task.id)
          .then((geoJson: any) => {
            const taskDataObject: any = {};
            taskDataObject.data = geoJson;
            taskDataObject.type = this.DATA_TYPE_MAP;
            taskDataObject.name = 'Puntos con muestras';
            taskDataObject.route = '/app/open-task-map/';
            this.taskData.push(taskDataObject);
          });
        this.tasksManager.getOpenTaskSamplesExcel(this.task.id)
          .then((excel: any) => {
            if (excel.size && excel.size > 0) {
              const taskDataObject: any = {};
              taskDataObject.data = excel;
              taskDataObject.type = this.DATA_TYPE_EXCEL;
              taskDataObject.name = 'Muestras';
              this.taskData.push(taskDataObject);
            }
          });
        break;
    }
  }

  // checkear la posibilidad de enviar a financiero
  getPossibilitySendFinancial(): void {
    this.tasksManager.getPossibilitySendFinancial(this.task.id)
      .then((response: Boolean) => {
        this.possibleSendFinancial = response;
        if (this.possibleSendFinancial) {
          this.getUserFinanciero();
        }
      });
  }

  public obtenerArchivos() {
    this.images = [];
    this.documents = null;
    this.tasksManager.getAllOpenTaskFiles(this.task)
      .then((files: Array<any>) => {
        files.reverse();
        files.map(file => {
          if (!file.show_name) {
            this.images.push(file);
          }
        });
        files = files.filter(file => file.show_name != null);
        this.documents = files;

        if (String(this.task.task_open_sub_type_id) === '19') {
          this.getPossibilitySendFinancial();
        }
      });
  }

  downloadData(taskDataObject: any) {
    switch (String(this.task.task_open_sub_type_id)) {
      case this.SUBTYPE_TAREA_HIDRICO_ENVIAR_A_SIG:
      case this.SUBTYPE_TAREA_HIDRICO_EDITAR_MAPA:
      case this.SUBTYPE_TAREA_HIDRICO_POR_FINALIZAR:
      case this.SUBTYPE_TAREA_HIDRICO_FINALIZADA:
      case this.SUBTYPE_TAREA_EROSIVOS_ENVIAR_A_SIG:
      case this.SUBTYPE_TAREA_EROSIVOS_EDITAR_MAPA:
      case this.SUBTYPE_TAREA_EROSIVOS_POR_FINALIZAR:
      case this.SUBTYPE_TAREA_EROSIVOS_FINALIZADA:
        switch (taskDataObject.type) {
          case this.DATA_TYPE_MAP:
            this.getOpenTaskMap(taskDataObject);
            break;
          case this.DATA_TYPE_EXCEL:
            this.getOpenTaskExcel();
            break;
        }
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

  // payload al registrar archivo
  refreshFiles($event: any) {
    if ($event.payload === '1') {

      const message = {
        'tipo': 'Registrado',
        'message': 'Archivo Registrado Satisfactoriamente',
        'style': 'alert-success'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

      this.obtenerArchivos();
    } else {

      const message = {
        'tipo': 'Error ',
        'message': 'El archivo no pudo ser cargado',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

    }

  }

  // enviar a financiero
  public sendFinanciero() {

    if (this.isValidSendTask()) {

      const objetoSend = {
        'task_id': this.task.id,
        'user_id': this.selectedFinanciero
      };

      this.tasksManager.sendOpenTaskFinanciero(objetoSend)
        .then((response: any) => {
          if (response.code === 500) {
            const message = {
              'tipo': 'Error',
              'message': response.message,
              'style': 'alert-danger'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
          } else {
            const message = {
              'tipo': 'Registrada',
              'message': 'La tarea ha sido enviada satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/tasks'];
            this.router.navigate(link);
          }
        });
    }
  }

  public sendOpenTask() {
    if (this.isValidSendOpenTask()) {
      const objetoSend: any = {
        'task_id': this.task.id,
        'user_id': this.selectedUser
      };
      if (this.isCoordinadorGuardacuenca) {
        objetoSend.reasign = true;
      }
      this.tasksManager.sendOpenTask(objetoSend)
        .then((response: any) => {
          if (response.code === 500) {
            const message = {
              'tipo': 'Error',
              'message': response.message,
              'style': 'alert-danger'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
          } else {
            const message = {
              'tipo': 'Registrada',
              'message': 'La tarea ha sido enviada satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/tasks'];
            this.router.navigate(link);
          }
        });
    }
  }

  public sendOpenSpecialTask() {
    if (this.isValidSendOpenTask()) {
      const objetoSend: any = {
        'task_id': this.task.id,
        'user_id': this.selectedUser
      };
      if (this.isCoordinadorGuardacuenca) {
        objetoSend.reasign = true;
      }
      this.tasksManager.sendOpenSpecialTask(objetoSend)
        .then((response: any) => {
          if (!response.code || response.code === 500) {
            const message = {
              'tipo': 'Error',
              'message': 'La tarea no ha sido enviada',
              'style': 'alert-danger'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
          } else {
            const message = {
              'tipo': 'Registrada',
              'message': 'La tarea ha sido enviada satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/tasks'];
            this.router.navigate(link);
          }
        });
    }
  }

  getOpenTaskUsers(): void {
    const componente = this;
    this.proceduresManager.getUsers(this.getSendTaskRoleIdTarget())
      .then((users: Array<User>) => {

        if (users.length > 0) {
          componente.usersOpenTasks = users;
          componente.selectedUser = '0';
        } else {
          componente.usersOpenTasks = [];
        }
      });
  }

  private getSendTaskRoleIdTarget(): number {
    let result = 0;
    switch (this.task.task_open_sub_type_id + '') {
      case this.SUBTYPE_TAREA_HIDRICO_ENVIAR_A_SIG:
      case this.SUBTYPE_TAREA_EROSIVOS_ENVIAR_A_SIG:
      case this.SUBTYPE_TAREA_PSA_REASIGNAR_A_SIG:
        result = this.SIG;
        break;
      case this.SUBTYPE_TAREA_COMUNICACION_REASIGNAR_A_GUARDACUENCA_ENCUENTRO:
      case this.SUBTYPE_TAREA_COMUNICACION_REASIGNAR_A_GUARDACUENCA_PLAN:
      case this.SUBTYPE_TAREA_COMUNICACION_REASIGNAR_A_GUARDACUENCA_EXPERIENCIA:
      case this.SUBTYPE_TAREA_EROSIVOS_ENVIAR_A_GUARDACUENCA:
      case this.SUBTYPE_TAREA_PSA_REASIGNAR_A_GUARDACUENCA:
        result = this.GUARDACUENCA;
        break;
    }
    return result;
  }

  // obtener usuarios financieros
  getUserFinanciero(): void {
    const componente = this;
    this.proceduresManager.getUsers(11)
      .then((users: Array<User>) => {

        if (users.length > 0) {
          componente.userFinanciero = users;
          componente.selectedFinanciero = '0';
        } else {
          componente.userFinanciero = [];
        }
      });
  }

  // validar registro
  protected isValidSendTask(): boolean {
    if (Number(this.selectedFinanciero) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un Usuario para reasignar la tarea',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

  protected isValidSendOpenTask(): boolean {
    if (String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_HIDRICO_EDITAR_MAPA ||
      String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_HIDRICO_POR_FINALIZAR ||
      String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_EROSIVOS_EDITAR_MAPA ||
      String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_EROSIVOS_POR_FINALIZAR ||
      String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_PSA_EDITAR_SIG ||
      String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_PSA_POR_FINALIZAR) {
      return true;
    }
    if (this.isNotSpecialTask && Number(this.selectedUser) <= 0 && !this.isGuardaCuenca) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un Usuario para reasignar la tarea',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

  // eliminar documento
  public eliminarDoc(id: string) {
    this.tasksManager.removeFileTaskOpen(id)
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

  // ouput del mensaje de registro de formulario
  messageRegisterForm($event: any) {

    if ($event.payload === '1') {
      const message = {
        'tipo': 'Registrado',
        'message': 'Evento Registrado Satisfactoriamente',
        'style': 'alert-success'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    } else {
      const message = {
        'tipo': 'Error',
        'message': 'Ha ocurrido un error desconocido',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }

  }

  private getOpenTaskMap(taskDataObject: any) {
    const geoJsonArray: any = [];
    const points: any = [];
    const lines: any = [];
    const polygons: any = [];
    taskDataObject.data.features.forEach(function (feature: any) {
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
  }

  private getOpenTaskExcel() {
    this.tasksManager.getOpenTaskSamplesExcel(this.task.id).then(response => {
      BrowserUtils.downloadExcelFromBlobWithName(response, 'Muestreos');
    });
  }

  private checkForRequiredUserSelection() {
    if (String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_HIDRICO_ENVIAR_A_SIG
      || String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_EROSIVOS_ENVIAR_A_GUARDACUENCA
      || String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_EROSIVOS_ENVIAR_A_SIG
      || String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_COMUNICACION_REASIGNAR_A_GUARDACUENCA_ENCUENTRO
      || String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_COMUNICACION_REASIGNAR_A_GUARDACUENCA_PLAN
      || String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_COMUNICACION_REASIGNAR_A_GUARDACUENCA_EXPERIENCIA
      || String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_PSA_REASIGNAR_A_GUARDACUENCA
      || String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_PSA_REASIGNAR_A_SIG) {
      this.requiresUserOnSend = true;
    }
    if (this.isGuardaCuenca) {
      this.requiresUserOnSend = false;
    }
  }

  private checkForCanSendTask() {
    if (this.isNotSpecialTask && (String(this.task.task_open_sub_type_id) !== this.SUBTYPE_TAREA_HIDRICO_FINALIZADA
      && String(this.task.task_open_sub_type_id) !== this.SUBTYPE_TAREA_EROSIVOS_FINALIZADA
      && String(this.task.task_open_sub_type_id) !== this.SUBTYPE_TAREA_COMUNICACION_FINALIZADA
      && String(this.task.task_open_sub_type_id) !== this.SUBTYPE_TAREA_CONTRATISTA_FINALIZADA
      && String(this.task.task_open_sub_type_id) !== this.SUBTYPE_TAREA_PSA_FINALIZADA)) {
      this.canSendTask = true;
    } else if (!this.isNotSpecialTask && String(this.task.task_open_sub_type_id) !== this.SUBTYPE_SPECIAL_LAST_ONE + '') {
      this.canSendTask = true;
    }
    if (this.task.process.type_process !== 'comunicacion' && (this.isGuardaCuenca && this.isNotSpecialTask)) {
      this.canSendTask = false;
    }
    if (this.task.process.type_process === 'psa' &&
      String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_PSA_POR_FINALIZAR &&
      !this.isCoordinador) {
      this.canSendTask = false;
    }
  }

  private checkForCanUploadFiles() {
    if (String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_COMUNICACION_FINALIZADA
      || String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_CONTRATISTA_FINALIZADA) {
      this.canUploadFiles = false;
    }
  }

  private checkForActorsForm() {
    const isCommunication = this.task.process.type_process === 'comunicacion';
    this.showActorsForm = isCommunication && this.isGuardaCuenca || (isCommunication && this.task.task_open_sub_type_id + '' === '5' && this.isComunicaciones);
  }

  private checkActionButtonText() {
    if (String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_HIDRICO_POR_FINALIZAR ||
      String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_EROSIVOS_POR_FINALIZAR ||
      String(this.task.task_open_sub_type_id) === this.SUBTYPE_TAREA_PSA_POR_FINALIZAR) {
      this.taskActionButtonText = 'Finalizar';
    }
  }

  private checkIsNotSpecialTask() {
    const greaterThanOrEqual = Number(this.task.task_open_sub_type_id) >= this.SUBTYPE_SPECIAL_FIRST_ONE;
    const lessThanOrEqual = Number(this.task.task_open_sub_type_id) <= this.SUBTYPE_SPECIAL_LAST_ONE;
    this.isNotSpecialTask = !(greaterThanOrEqual && lessThanOrEqual);
  }

  private setStatus() {
    if (!this.isNotSpecialTask && Number(this.task.task_open_sub_type_id) === this.SUBTYPE_SPECIAL_LAST_ONE) {
      this.status = '- tarea abierta finalizada';
    }
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
    const objeto = {
      'task_id': this.task.id,
      'sub_type': '2',
      'comment': this.comentario
    };
    this.tasksManager.insertCommentOpenTask(objeto)
      .then(response => {
        this.getComments();
        this.comentario = '';
      });
  }
}
