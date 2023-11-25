import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {User} from '../../../data/model/user';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MapaTaskExecutionComponent} from '../../mapa-task-execution/mapa-task-execution.component';
import Comments = commentsInterface.Comments;

@Component({
  selector: 'cuenca-execution-selected',
  templateUrl: './view-selected-ejecucion.component.html',
  styleUrls: ['./view-selected-ejecucion.component.css']
})

export class ViewSelectedEjecucionComponent extends BaseComponent implements OnInit, OnDestroy {
  public taskForExecution: any;
  public idExecution: string;

  public mapGeoJson: any;

  public geoJson: any;

  public map: any = null;
  public acciones: Array<any> = [];
  public selectedHash: Boolean = false;
  public possibleCreateOpenTask: Boolean = false;

  public selectedActions: any;

  public userSeguimiento: Array<any> = [];
  public userContratista: Array<any> = [];
  public userSig: Array<any> = [];

  public comments: Array<Comments> = [];
  public comentario: string;
  public canReassignTask: boolean;
  public canSendTask: boolean;

  @ViewChild(MapaTaskExecutionComponent) mapaTaskExecutionComponent: MapaTaskExecutionComponent;

  constructor(protected cuencaVerdeServices: CuencaVerdeService,
              protected messagingService: MessagingService,
              protected taskManager: TasksManager,
              protected proceduresManager: ProceduresManager,
              public rolesManager: RolesManager,
              protected activatedRoute: ActivatedRoute,
              protected router: Router,
              protected ref: ChangeDetectorRef) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getUserRoles(this);
  }

  protected onGotRoles(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => params.get('id') + '')
      .subscribe(id => {
        if (id) {
          this.idExecution = id;
          this.getExecutionTaskById();
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });
  }

  ngOnDestroy() {
  }

  public insertComment(): void {
    const id: number = Number(this.idExecution);
    const objeto = {
      'task_id': id,
      'type': '1',
      'description': this.comentario
    };
    if (objeto.description !== '' && objeto.description !== undefined) {
      this.taskManager.insertCommentExecutionTask(objeto)
        .then((response: any) => {

          const message = {
            'tipo': 'Comentario Creado: ',
            'message': 'Comentario agregado satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));

          this.getComments();
          this.comentario = '';

        }, (error: any) => {
          const message = {
            'tipo': 'Error: ',
            'message': error,
            'style': 'alert-danger'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
        });
    }
  }

  getExecutionTaskById() {
    this.taskManager.getExecutionTaskById(this.idExecution)
      .then(response => {
        this.taskForExecution = response;
        this.evaluateSectionsVisibility(this);
        this.getComments();
        if (String(this.taskForExecution.sub_type_id) === '14' && this.isCoordinador) {
          this.getUserSeguimiento();
          this.getGeoJson();
          this.taskForExecution.user_id = '0';
        }
        if (String(this.taskForExecution.sub_type_id) === '15' && this.isCoordinador) {
          this.getPossibilityCreateTask();
          this.getUserSeguimiento();
          this.getUserContratista();
          this.taskForExecution.user_id = '0';
          this.getGeoJson();
        }
        if (String(this.taskForExecution.sub_type_id) === '16' && this.isCoordinador) {
          this.getPossibilityCreateTask();
          this.getUserContratista();
          this.getGeoJson();
        }
        if ((String(this.taskForExecution.sub_type_id) === '10' && this.isCoordinador) || this.isSig) {//georgi fix 71
          this.getUserSig();
        }
        if (String(this.taskForExecution.sub_type_id) === '12' && this.isCoordinador) {
          this.getUserSeguimiento();
          this.taskForExecution.user_id = '0';
        }

        /// console.log(this.taskForExecution);
      }).catch(e => {
      console.log(e);
    });
  }

  private evaluateSectionsVisibility(component: any) {
    const hasTaskAndIsSig = component.taskForExecution && component.isSig;
    const hasTaskAndIsCoordinator = component.taskForExecution && component.isSig;
    const taskSubTypeId = component.taskForExecution.sub_type_id;

    component.canReassignTask = (hasTaskAndIsCoordinator && taskSubTypeId + '' === '14');
    component.canSendTask = (hasTaskAndIsSig && taskSubTypeId + '' === '11');
  }

  getUserSeguimiento(): void {
    this.getUsersGuardaCuencas(this)
      .then(users => this.getUsersEquipoSeguimiento(users, this))
      .then(users => this.getUsersCoordinacionGuardaCuenca(users, this))
      .then(users => this.users = users);
  }

  getUserContratista(): void {
    const componente = this;
    this.proceduresManager.getUsers(5)
      .then((users: Array<User>) => {

        if (users.length > 0) {
          componente.userContratista = users;
          componente.taskForExecution.user_id_contractor = '0';
        } else {
          componente.userContratista = [];
        }

      });

  }

  getUserSig(): void {
    const componente = this;
    this.proceduresManager.getUsers(6)
      .then((users: Array<User>) => {

        if (users.length > 0) {
          componente.userSig = users;
          componente.taskForExecution.user_id = '0';
        } else {
          componente.userSig = [];
        }

      });
  }

  getPossibilityCreateTask(): void {
    this.proceduresManager.getPossibilityCreateTask(this.idExecution)
      .then((response: any) => {
        this.possibleCreateOpenTask = response;
      });

  }

  public sendTaskFlowExecution(): void {
    if (confirm('Confirmas la aprobación de la tarea?')) {
      const request = {
        'task_id': this.taskForExecution.id
      };
      this.sendExecutionTask(request);
    }
  }

  public reassignTask(): void {
    if (this.isValidTaskExecution()) {
      if (confirm('Confirmas la reasignación de la tarea?')) {
        const request = {
          'task_id': this.taskForExecution.id,
          'user_id': this.taskForExecution.user_id
        };
        this.sendExecutionTask(request);
      }
    }
  }

  private sendExecutionTask(request: any) {
    this.taskManager.sendTaskFlowExecution(request)
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
            'message': 'La tarea ha sido registrada satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          const link = ['/app/tareas-ejecucion'];
          this.router.navigate(link);
        }
      });
  }

  public createOpenTask(): void {
    const componente = this;
    if (this.isValidOpenTask()) {
      this.taskForExecution.type_process = 'contratista';
      this.taskManager.createOpenTaskFlowExecution(this.taskForExecution)
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
              'message': 'La tarea ha sido registrada satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/tareas-ejecucion'];
            this.router.navigate(link);

          }

        });
    }
  }

  public closeTask(): void {
    this.taskManager.closeTaskFlowExecution(this.idExecution)
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
            'message': 'La tarea ha sido cerrada satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          const link = ['/app/tareas-ejecucion'];
          this.router.navigate(link);
        }
      });
  }

  public getGeoJson(): void {
    const componente = this;
    this.taskManager.getGeoJsonByExecutionTask(this.idExecution)
      .then(response => {
        if (response.features instanceof Array) {
          this.mapGeoJson = response;

          const objeto = this.mapGeoJson;
          const objetoFeatures = objeto.features;

          objetoFeatures.forEach((feat: any) => {

            this.taskManager.getActionHash(feat.properties.hash)
              .then(responseHash => {
                if (responseHash !== null) {
                  if (String(this.taskForExecution.budget_id) === String(responseHash.budget_id)) {

                    componente.acciones = [];
                    componente.acciones.push(responseHash);
                    const arrayFeat: Array<any> = [];
                    arrayFeat.push(feat);
                    const objectFeat = {
                      'features': arrayFeat,
                      'type': 'FeatureCollection'
                    };

                    this.geoJson = objectFeat;
                    this.mapaTaskExecutionComponent.loadGeoJson(objectFeat);
                  }
                } else {

                }
              });
          });
        } else {
          const message = {
            'tipo': 'El Mapa ',
            'message': ' no ha sido cargado',
            'style': 'alert-warning'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
        }
      });
  }

  public clickInMap($event: any): void {
    if ($event.payload.type === '1') {
      if ($event.payload.properties.hash !== undefined && $event.payload.properties.hash !== null) {
        this.taskManager.getActionHash($event.payload.properties.hash)
          .then(response => {
            if (response !== null) {
              // this.acciones = [];
              this.acciones.push(response);
              this.ref.detectChanges();
              document.getElementById('selected').style.border = 'thick solid' + $event.payload.properties.Color;
              document.getElementById('selected').style.fontWeight = 'bold';
            } else {
              document.getElementById('selected').style.border = 'none';
              document.getElementById('selected').style.fontWeight = 'bold';
              this.ref.detectChanges();
            }
          });
        this.ref.detectChanges();
      }
    }

  }

  /////// MAPA

  protected isValidTaskExecution(): boolean {
    if (Number(this.taskForExecution.user_id) <= 0) {
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

  /// open valid task
  protected isValidOpenTask(): boolean {

    if (!this.taskForExecution.startdate) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona la fecha de inicio',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.taskForExecution.option_date && !this.taskForExecution.deadline) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona la fecha de finalización',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.taskForExecution.description || this.taskForExecution.description.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la descripción de la tarea',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (Number(this.taskForExecution.user_id_contractor) <= 0) {
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

  private getComments(): void {
    this.taskManager.getAllCommentsExecutionTask(this.idExecution)
      .then(comments => {
        this.comments = comments;
      });
  }
}
