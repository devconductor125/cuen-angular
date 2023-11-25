import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Procedure} from '../../../data/model/procedure';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Aporte} from '../../../data/model/aporte';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {AporteList} from '../../../data/model/aporteList';
import {Project} from '../../../data/model/project';
import {Activity} from '../../../data/model/activity';
import {Program} from '../../../data/model/program';

@Component({
  selector: 'cuenca-traslate-aporte',
  templateUrl: './traslate-aporte.component.html',
  styleUrls: ['./traslate-aporte.component.css']
})
export class TraslateAporteComponent extends BaseComponent implements OnInit {

  public aporte: AporteList;
  public aporteTemp: number;
  public programs: Array<Program> = [];
  public projects: Array<Project>;
  public activities: Array<Activity>;
  public procedure: Procedure = new Procedure();
  public aporteTraslado: Aporte = new Aporte();

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getAporte();
    this.getPrograms();
  }

  protected getAporte(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        if (id > 0) {
          this.tasksManager.getAporteForId(String(id))
            .then(object => {
              this.aporte = object;
              this.aporteTemp = Number(this.aporte.budget);
            });
        } else {
          const link = ['/app/comando'];
          this.router.navigate(link);
        }
      });
  }

  traslateAporte(): void {
    if (this.isValidTraslate()) {
      const objeto = {
        'id': this.aporte.id, 'budget_traslate': this.aporteTraslado.aporte,
        'activity_traslate': this.aporteTraslado.activity_id
      };
      ////console.log(objeto);
      this.tasksManager.traslateAporte(objeto)
        .then((result: boolean) => {
          if (result) {
            const message = {
              'tipo': 'Traslado Exitoso',
              'message': 'El aporte ha sido trasladado satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/comando'];
            this.router.navigate(link);
          }
        });
    }
  }

  public getProgramProjects(program: Program) {
    const component = this;
    if (program.id === '0') {
      this.projects = null;
      this.activities = null;
      return;
    }
    this.proceduresManager.getProgramProjects(program.id)
      .then(projects => {
        const placeholder = this.getCustomPlaceholder('Selecciona un proyecto');
        projects.unshift(placeholder);
        this.projects = projects;
        if (!this.procedure.id) {
          this.procedure.project = placeholder;
        }
        this.projects.forEach(function (project: Project) {
          if (project.id === component.procedure.project.id) {
            component.procedure.project = project;
            component.getProjectActivities(project);
          }
        });
      });
  }

  protected getProjectActivities(project: Project) {
    const component = this;
    if (project.id === 0) {
      this.activities = null;
      return;
    }
    this.proceduresManager.getProjectActivities(project.id)
      .then(activities => {
        if (component.procedure.activities) {
          activities.forEach(function (activity: Activity) {
            component.procedure.activities.forEach(function (procedureActivity: any) {
              if (activity.id === Number(procedureActivity.id)) {
                activity.selected = true;
              }
            });
          });
        }
        component.activities = activities;
        component.procedure.activities = null;
      });
  }

  protected getPrograms() {
    return new Promise((resolve, reject) => {
      this.proceduresManager.getPrograms()
        .then(programs => {
          if (programs[0].id !== 0) {
            const placeholder = this.getCustomPlaceholder('Selecciona un programa');
            programs.unshift(placeholder);
          }
          this.programs = programs;
          this.procedure.program = programs[0];
          resolve();
        });
    });
  }

  protected onChange(aporteValue: string) {
    this.aporteTemp = Number(this.aporte.budget) - Number(this.aporteTraslado.aporte);
  }

  protected setObjectActive(activity: Activity) {
    this.aporteTraslado.activity_id = activity.id + '';
  }

  protected isValidTraslate(): boolean {
    if (this.aporteTraslado.aporte === '' || this.aporteTraslado.aporte === null || this.aporteTraslado.aporte === undefined ||
      Number(this.aporteTraslado.aporte) === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el aporte que se le trasladará a la actividad seleccionada',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (Number(this.aporteTraslado.aporte) > Number(this.aporte.budget)) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Nop cuenta con dicha cantidad para transferir',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.aporteTraslado.activity_id === '' || this.aporteTraslado.activity_id === null
      || this.aporteTraslado.activity_id === undefined) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona la actividad',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }
}
