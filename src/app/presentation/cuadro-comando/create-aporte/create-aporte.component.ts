import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Procedure} from '../../../data/model/procedure';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Asociado} from '../../../data/model/asociado';
import {Aporte} from '../../../data/model/aporte';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {Activity} from '../../../data/model/activity';
import {Project} from '../../../data/model/project';
import {Program} from '../../../data/model/program';

@Component({
  selector: 'cuenca-create-aporte',
  templateUrl: './create-aporte.component.html',
  styleUrls: ['./create-aporte.component.css']
})
export class CreateAporteComponent extends BaseComponent implements OnInit {
  public programs: Array<Program> = [];
  public projects: Array<Project>;
  public activities: Array<Activity>;
  public procedure: Procedure = new Procedure();
  public aporte: Aporte = new Aporte();
  public asociado: Array<Asociado> = [];
  public arrYear: Array<any> =  [
    {
      name: '2018',
      value: 2018
    },
    {
      name: '2019',
      value: 2019
    },
    {
      name: '2020',
      value: 2020
    },
    {
      name: '2021',
      value: 2021
    },
    {
      name: '2022',
      value: 2022
    },
    {
      name: '2023',
      value: 2023
    },
    {
      name: '2024',
      value: 2024
    },
    {
      name: '2025',
      value: 2025
    },
    {
      name: '2026',
      value: 2026
    },
    {
      name: '2027',
      value: 2027
    },
    {
      name: '2028',
      value: '2028'
    },
    {
      name: '2029',
      value: 2029
    },
    {
      name: '2030',
      value: 2030
    },
    {
      name: '2031',
      value: 2031
    },
    {
      name: '2032',
      value: 2032
    },
    {
      name: '2033',
      value: 2033
    },
    {
      name: '2034',
      value: 2034
    },
    {
      name: '2035',
      value: 2035
    },
    {
      name: '2036',
      value: 2036
    },
    {
      name: '2036',
      value: 2036
    },
    {
      name: '2037',
      value: 2037
    },
    {
      name: '2038',
      value: 2038
    },
    {
      name: '2039',
      value: 2039
    },
    {
      name: '2040',
      value: 2040
    },
    {
      name: '2041',
      value: 2041
    },
    {
      name: '2042',
      value: 2042
    },
    {
      name: '2043',
      value: 2043
    },
    {
      name: '2044',
      value: 2044
    },
    {
      name: '2045',
      value: 2045
    },
    {
      name: '2046',
      value: 2046
    },
    {
      name: '2046',
      value: 2046
    },
    {
      name: '2047',
      value: 2047
    },
    {
      name: '2048',
      value: 2048
    },
    {
      name: '2049',
      value: 2049
    },
    {
      name: '2050',
      value: 2050
    },
    {
      name: '2051',
      value: 2051
    },
    {
      name: '2052',
      value: 2052
    },
    {
      name: '2053',
      value: 2053
    },
    {
      name: '2054',
      value: 2054
    },
    {
      name: '2055',
      value: 2055
    },
    {
      name: '2056',
      value: 2056
    },
    {
      name: '2056',
      value: 2056
    },
    {
      name: '2057',
      value: 2057
    },
    {
      name: '2058',
      value: 2058
    },
    {
      name: '2059',
      value: 2059
    },
    {
      name: '2060',
      value: 2060
    }
  ];
  public yearNow: any = new Date().getFullYear();

  public tipoAporte: Array<any> = [{'id': '1', 'name': 'Dinero'}, {'id': '2', 'name': 'Especies'}, {'id': '3', 'name': 'Ambos'}];

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected router: Router,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getPrograms();
    this.aporte.asociado_id = '0';
    this.aporte.type = '0';
    this.aporte.year = 0;
    this.getAsociados();
    this.filterDataYear();
  }
  private filterDataYear() {
    this.arrYear = this.arrYear.filter( year => year.value >= this.yearNow);
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

  public getAsociados() {
    return new Promise((resolve, reject) => {
      this.tasksManager.getAllAssociated()
        .then(assosiated => {
          this.asociado = assosiated;
          resolve();
        });
    });
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

  formatSpecific(data: string, id: number) {
    const result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    if (id === 1) {
      $('#aporteAsociado').val(result);
    }
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

  protected onDataLoaded(): void {
  }

  protected setObjectActive(activity: Activity) {
    this.aporte.activity_id = activity.id + '';
  }

  saveAporte(): void {
    const componente = this;
    if (this.isValidProcedure()) {
      if (this.aporte.type === '1') {
        this.aporte.budget_species = '0';
      }
      if (this.aporte.type === '2') {
        this.aporte.aporte = '0';
      }
      this.tasksManager.insertAssociated(this.aporte)
        .then(result => {
          const message = {
            'tipo': 'Registrado',
            'message': 'El aporte ha sido registrado satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          const link = ['/app/comando'];
          this.router.navigate(link);
        }, function (reason: string) {
          ////console.log(reason);
          const message = {
            'tipo': 'Error',
            'message': reason,
            'style': 'alert-danger'
          };
          componente.messagingService.publish(new BusMessage('alerta', message));
        });
    }
  }

  getArrayEspecies($event: any) {
    this.aporte.budget_species = $event.payload.total;
    this.aporte.species_contribution = $event.payload.listado;
  }

  protected isValidProcedure(): boolean {
    if (this.aporte.activity_id === '' || this.aporte.activity_id === null || this.aporte.activity_id === undefined) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona la actividad',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (Number(this.aporte.asociado_id) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un asociado',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (Number(this.aporte.year) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un año',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.aporte.type === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona el tipo de aporte que se le asignará a la actividad',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.aporte.type === '1' && this.aporte.aporte === '' || this.aporte.type === '1' && this.aporte.aporte === null ||
      this.aporte.type === '1' && this.aporte.aporte === undefined) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el aporte que se le asignará a la actividad',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.aporte.type === '2' && this.aporte.budget_species === '' || this.aporte.type === '2' && this.aporte.budget_species === null ||
      this.aporte.type === '2' && this.aporte.budget_species === undefined) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el aporte en especies que se le asignará a la actividad',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.aporte.type === '3') {
      if (this.aporte.aporte === '' || this.aporte.aporte === null || this.aporte.aporte === undefined) {

        const message = {
          'tipo': 'Error: ',
          'message': 'Ingresa el aporte en dinero que se le asignará a la actividad',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;

      }
      if (this.aporte.budget_species === '' || this.aporte.budget_species === null || this.aporte.budget_species === undefined) {

        const message = {
          'tipo': 'Error: ',
          'message': 'Ingresa el aporte en especies que se le asignará a la actividad',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }
    }
    return true;
  }
}
