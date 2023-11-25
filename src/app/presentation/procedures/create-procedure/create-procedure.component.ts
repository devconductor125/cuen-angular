import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Procedure} from '../../../data/model/procedure';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Project} from '../../../data/model/project';
import {Activity} from '../../../data/model/activity';
import {Program} from '../../../data/model/program';

@Component({
  selector: 'cuenca-create-procedure',
  templateUrl: './create-procedure.component.html',
  styleUrls: ['./create-procedure.component.css']
})
export class CreateProcedureComponent extends BaseComponent implements OnInit {
  public programs: Array<Program>;
  public prediosReales: Array<any> = [];
  public parentProcedures: Array<any> = [];
  public procedure: Procedure = new Procedure();

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected router: Router,
              public rolesManager: RolesManager,
              protected activatedRoute: ActivatedRoute) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getUserRoles(this);
  }

  protected onGotRoles(): void {
    this.getPrediosReales();
    this.getParentProcedures();
    const component = this;
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.proceduresManager.loadAllObjects()
      .then(function () {
        component.getPrograms()
          .then(() => component.onDataLoaded());
      });

    this.procedure.type_process = '0';
    this.procedure.type_comunication = '0';
  }

  protected getPrograms() {
    return new Promise((resolve, reject) => {
      this.proceduresManager.getPrograms()
        .then(programs => {
          this.programs = programs;
          resolve();
        });
    });
  }

  protected getPrediosReales() {
    this.proceduresManager.getPrediosReales()
      .then(predios => {
        this.prediosReales = predios;
        this.procedure.property = '0';
        if (this.isComunicaciones) {
          this.procedure.property = null;
        }
        this.setPredioFromReferrer();
      });
  }

  private setPredioFromReferrer() {
    const component = this;
    this.activatedRoute.paramMap
      .map((params: ParamMap) => params.get('id') + '')
      .subscribe(id => {
        if (id) {
          this.prediosReales.forEach(function (predioReal) {
            if (predioReal.id + '' === id) {
              component.procedure.property = predioReal.id;
            }
          });
        }
      });
  }

  protected getParentProcedures() {
    this.proceduresManager.getParentProcedures()
      .then(parentProcedures => {
        this.parentProcedures = parentProcedures;
      });
  }

  public getProjects(program: Program) {
    program.selected = !program.selected;
    const component = this;
    if (program.selected) {
      this.proceduresManager.getProgramProjects(program.id)
        .then(projects => {
          component.programs.forEach(function (localProgram: Program) {
            if (localProgram.name === program.name) {
              localProgram.projects = projects;
              component.mapProjectObjects(localProgram.projects);
            }
          });
        });
    } else {
      component.programs.forEach(function (localProgram: Program) {
        if (localProgram.name === program.name) {
          localProgram.projects = null;
        }
      });
    }
  }

  protected mapProjectObjects(projects: Array<Project>) {
  }

  public getActivities(project: Project) {
    const component = this;
    project.selected = !project.selected;
    if (project.selected) {
      this.proceduresManager.getProjectActivities(project.id)
        .then(activities => {
          project.activities = activities;
          component.mapProjectActivities(project.activities);
        });
    } else {
      project.activities = null;
    }
    this.generateProcedureName();
  }

  protected mapProjectActivities(activities: Array<Activity>) {
  }

  protected onDataLoaded(): void {
  }

  protected setObjectActive(activity: Activity) {
    activity.selected = !activity.selected;
  }

  saveProcedure(): void {
    this.setProcedureActivities();
    if (this.isValidProcedure(false)) {
      if (this.isComunicaciones) {
        this.procedure.type_process = 'comunicacion';
      }
      this.proceduresManager.create(this.procedure)
        .then((result: boolean) => {
          if (result) {
            const message = {
              'tipo': 'Registrado',
              'message': 'El procedimiento ha sido registrado satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/procedures'];
            this.router.navigate(link);
          }
        });
    }
  }

  protected setProcedureActivities() {
    const component = this;
    this.procedure.activities = [];
    this.programs.forEach(function (program: Program) {
      if (program.projects) {
        program.projects.forEach(function (project: Project) {
          if (project.activities) {
            project.activities.forEach(function (activity: Activity) {
              if (activity.selected) {
                component.procedure.activities.push(activity);
              }
            });
          }
        });
      }
    });
  }

  protected isValidProcedure(isEdit: boolean): boolean {
    if (!isEdit && this.procedure.property === '0') {

      const message = {
        'tipo': 'Error: ',
        'message': 'Seleccione el predio del Procedimiento',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

      return false;
    }
    if (!this.procedure.name || this.procedure.name.length === 0) {

      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el nombre del Proyecto',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

      return false;
    }
    if (!this.procedure.description) {

      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la Descripción',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

      return false;
    }
    if (this.procedure.activities.length === 0) {

      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona una o más actividades',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

      return false;
    }
    return true;
  }

  public generateProcedureName(): void {
    const component = this;
    this.procedure.name = '';
    this.prediosReales.forEach(function (predio: any) {
      if (predio.id === Number(component.procedure.property)) {
        component.procedure.name = predio.property_name;
      }
    });
    component.programs.forEach(function (program: Program) {
      if (program.projects) {
        program.projects.forEach(function (localProject: Project) {
          if (localProject.selected) {
            component.procedure.name = component.procedure.name + ' - ' + localProject.name;
          }
        });
      }
    });
    if (component.procedure.name.substring(0, 3) === ' - ') {
      component.procedure.name = component.procedure.name.substring(3, component.procedure.name.length);
    }
  }
}
