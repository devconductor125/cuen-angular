import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {AuthService} from '../../../data/services/auth.service';
import {SessionManager} from '../../../data/managers/session.manager';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Project} from '../../../data/model/project';
import {ObjectActions} from '../../../data/model/actions';
declare var $: any;

@Component({
  selector: 'cuenca-add-good-practices-budget',
  templateUrl: './add-good-practices-budget.component.html',
  styleUrls: ['./add-good-practices-budget.component.css']
})
export class AddGoodPracticesBudgetComponent extends BaseComponent implements OnInit {

  @Input() public idTask: string;

  public listProjects: Array<Project> = [];
  public project: Project = new Project();

  @Output() notify: EventEmitter<object> = new EventEmitter<object>();

  public addAction: ObjectActions = new ObjectActions();
  public listActionsGoodPractices: Array<ObjectActions> = [];

  constructor(protected proceduresManager: ProceduresManager,
              private taskManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {

    // console.log(this.idTask);

    this.getActionsGoodPractices();

  }

  addActionValid(): void {

    if (this.validarRegistro()) {
      this.insertAction();
    }
  }

  protected validarRegistro(): boolean {

    if (Number(this.addAction.id) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona una actividad para agregarla',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }

    if (!this.addAction.length || this.addAction.length.length === 0 || Number(this.addAction.length) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'No se puede enviar sin cantidad',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }

    return true;
  }

  protected getActionsGoodPractices() {
    this.taskManager.getActionsGoodPractices().then((response: Array<any>) => {
      if (response instanceof Array) {
        this.listActionsGoodPractices = response;
        this.addAction.id = 0;
        this.addAction.length = '0';
      } else {
        this.listActionsGoodPractices = [];
      }
    });
  }

  private  insertAction() {

    const objetoSend = {
      'length': String(this.addAction.length),
      'action_id': Number(this.addAction.id),
      'task_id': Number(this.idTask)
    };

    this.taskManager.insertActionGoodPracticesBudget(objetoSend)
      .then(response => {
            const message = {
              'tipo': 'Registro: ',
              'message': 'La acción se agregó satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));

            this.addAction = new ObjectActions();
            this.addAction.id = 0;
            this.addAction.length = '0';

        this.notify.emit({payload: '1'});

      }, function (reason: string) {

            const message = {
              'tipo': 'Error: ',
              'message': 'El proyecto no se pudo agregar',
              'style': 'alert-danger'
            };
            this.messagingService.publish(new BusMessage('alerta', message));

        this.notify.emit({payload: '2'});

      });

  }

}
