import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ContractorsManager} from '../../../data/managers/contractors.manager';
import {ActivatedRoute, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {User} from '../../../data/model/user';

@Component({
  selector: 'cuenca-create-ejecucion',
  templateUrl: './create-tarea-ejecucion.component.html',
  styleUrls: ['./create-tarea-ejecucion.component.css']
})
export class CreateTareaEjecucionComponent extends BaseComponent implements OnInit {

  public task: any;
  public listTask: Array<any> = [];
  public users: Array<User> = [];

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected contractorsManager: ContractorsManager,
              protected router: Router,
              public rolesManager: RolesManager,
              protected tasksManager: TasksManager,
              protected activatedRoute: ActivatedRoute,
              protected ref: ChangeDetectorRef) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getTaskForExecution();
    this.task = {
      title: '',
      description: '',
      startdate: '',
      deadline: '',
      pool_contractor_id: ''
    };
    this.getUsersGuardaCuencas(this)
      .then(users => this.getUsersEquipoSeguimiento(users, this))
      .then(users => this.getUsersCoordinacionGuardaCuenca(users, this))
      .then(users => this.users = users);
  }

  protected isValidMonitoreo(): boolean {
    return false;
  }

  public getTaskForExecution(): void {
    this.tasksManager.getTaskForExecution()
      .then((response: any) => {
        this.listTask = response;
      });
  }

  public guardar(): void {
    const componente = this;
    if (this.isValidTask()) {
      this.task.users = this.usuariosTareaList.filter(Number);
      this.tasksManager.crearExecutionTask(this.task)
        .then(() => {
          const message = {
            'tipo': 'Tarea de Ejecución Registrada ',
            'message': ' satisfactoriamente.',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));

          const link = ['/app/tareas-ejecucion'];
          this.router.navigate(link);

        }, function (reason: string) {
          const message = {
            'tipo': 'Error',
            'message': reason,
            'style': 'alert-danger'
          };
          componente.messagingService.publish(new BusMessage('alerta', message));
        });
    }
  }

  protected isValidTask(): boolean {
    if (!this.task.title || this.task.title.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el título de la tarea',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.task.description || this.task.description.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la descripción de la tarea',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.task.startdate === '') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingrese la fecha de Inicio',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.task.deadline === '') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingrese la fecha de Culminación',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.task.pool_contractor_id === '') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Seleccione una acción a Ejecutar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (Number(this.task.user) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Seleccione un usuario del equipo de seguimiento',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
    return true;
  }
}
