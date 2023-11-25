import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {AuthService} from '../../../data/services/auth.service';
import {SessionManager} from '../../../data/managers/session.manager';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Project} from '../../../data/model/project';
import {Activity} from '../../../data/model/activity';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {RoleClass} from '../../../data/model/RoleClass';

declare var $: any;


@Component({
  selector: 'cuenca-activity-to-project',
  templateUrl: './activity-to-project-component.html',
  styleUrls: ['./activity-to-project-component.css']
})
export class ActivityToProjectComponent extends BaseComponent implements OnInit {

  @Input() public projectId: string;
  @Input() public projectName: string;
  public listActivities: Array<Activity> = [];

  public activity: Activity = new Activity();
  public listRols: Array<RoleClass> = [];
  public idRol: string;

  constructor(protected proceduresManager: ProceduresManager,
              private cuencaVerdeService: CuencaVerdeService,
              private taskManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
    this.idRol = '0';
  }

  ngOnInit(): void {

    console.log('esta es la data;', this.projectId);
    this.getRols();
    this.getDetailProject();
  }

  private getDetailProject() {
    this.activity = new Activity();
    this.idRol = '0';
    this.cuencaVerdeService.getProjectDetail(this.projectId).then(
      (response) => {
        this.listActivities = response.project_actities;
      }, (error) => {
        console.log('error', error);
      }
    );
  }

  regActivity(): void {

    if (this.validarRegistro()) {
      this.insertActivityByProject();
    }
  }

  protected validarRegistro(): boolean {
    if (this.idRol === '0') {
      this.setAlert('Error', 'Seleccione un rol', 'alert-danger');
      return false;
    }
    if (!this.activity.name || this.activity.name.length === 0) {
      this.setAlert('Error', 'Ingresa el nombre de la actividad', 'alert-danger');
      return false;
    }
    return true;
  }

  private insertActivityByProject() {
    this.cuencaVerdeService.addActivity(this.activity.name, this.idRol, this.projectId).then(
      (response) => {
        this.setAlert('Registro: ', 'La actividad se agregó satisfactoriamente', 'alert-success');
        this.getDetailProject();
      }, (error) => {
        this.setAlert('Error: : ', error.statusText, 'alert-danger');
      }
    );
  }

  private getRols() {
    this.cuencaVerdeService.getRols().then(
      (response: Array<RoleClass>) => {
        this.listRols = response;
      }
    );
  }

  private setAlert(type: string, strMessage: string, style: string) {
    const message = {
      'tipo': type,
      'message': strMessage,
      'style': style
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }
}
