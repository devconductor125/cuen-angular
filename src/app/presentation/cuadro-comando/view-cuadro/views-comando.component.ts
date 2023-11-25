import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {Task} from '../../../data/model/task';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Router} from '@angular/router';
import {AporteList} from '../../../data/model/aporteList';
import {Asociado} from '../../../data/model/asociado';
import {Procedure} from '../../../data/model/procedure';
import {Project} from '../../../data/model/project';
import {Activity} from '../../../data/model/activity';
import {Program} from '../../../data/model/program';
import {BrowserUtils} from '../../../data/utils/browser.utils';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';

@Component({
  selector: 'cuenca-comando',
  templateUrl: './views-comando.component.html',
  styleUrls: ['./views-comando.component.css']
})
export class ViewsComandoComponent extends BaseComponent implements OnInit {
  public tasks: Array<Task>;
  public aportes: Array<AporteList> = [];
  public filter: String = '0';
  public asociadoModel: String = '0';
  public asociado: Array<Asociado> = [];

  public programs: Array<Program> = [];
  public projects: Array<Project>;
  public activities: Array<Activity>;
  public procedure: Procedure = new Procedure();
  public activity_id: String = '0';
  public yearNow: any = new Date().getFullYear();
  public yearFilter: number;

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

  constructor(protected proceduresManager: ProceduresManager,
              private messagingService: MessagingService,
              protected tasksManager: TasksManager,
              protected router: Router,
              public rolesManager: RolesManager,
              protected cuencaServices: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
    this.yearFilter = 0;
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getUserRoles(this);
    this.getAportes();
    this.getAsociados();
    this.getPrograms();
    this.filterDataYear();
  }
  private filterDataYear() {
    this.arrYear = this.arrYear.filter( year => year.value >= this.yearNow);
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

  deleteTask(task: Task): void {
    const component = this;
    this.shouldDelete(function () {
      component.tasksManager.deleteObject(task)
        .then((success: boolean) => {
          if (success) {
            let i = component.tasks.length;
            while (i--) {
              if (component.tasks[i].id === task.id) {
                component.tasks.splice(i, 1);
              }
            }
          }
        });
    });
  }

  public getAportes(): void {
    this.tasksManager.getAllAportes()
      .then(aportes => {
        aportes.reverse();
        this.aportes = aportes;
      });
  }

  public routerLink(id: string) {
    const link = ['/app/edit-aporte/' + id];
    this.router.navigate(link);
  }

  public routerLinkAporte(id: string) {
    const link = ['/app/traslate-aporte/' + id];
    this.router.navigate(link);
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

  protected setObjectActive(activity: Activity) {
    this.activity_id = activity.id + '';
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

  public changeFilter() {
    this.asociadoModel = '0';
    this.activity_id = '0';
  }

  public getFilterAportes(): void {
    if (this.isValidFilter()) {
      const objeto = {
        'directive_filter': this.filter,
        'id_objeto': (this.filter === '1') ? this.asociadoModel : (this.filter === '2') ? this.activity_id : '',
        'year': this.yearFilter
      };

      this.tasksManager.filterAporte(objeto)
        .then(objetoFilter => {
          this.aportes = objetoFilter.detail;
        });

      //// console.log(objeto);
    }
  }

  protected isValidFilter(): boolean {
    if (this.filter === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona el tipo de Filtro',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.filter === '1' && this.asociadoModel === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un asociado para filtar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.filter === '2' && this.activity_id === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona una actividad para filtrar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

  public getPercent(total: number, cantidad: number): String {
    let percent;
    if (cantidad === null) {
      cantidad = 0;
    }
    if (total === null || Number(total) === 0) {
      return 0 + '%';
    } else {
      percent = (Number(cantidad) * 100) / Number(total);
      return percent.toFixed(2) + '%';
    }
  }

  public getSustract(maximo: number, minimum: number, paid: number): Number {
    let result;
    result = (Number(maximo) - Number(minimum)) - Number(paid);
    return result;
  }

  public getSum(maximo: number, minimum: number): Number {
    let result;
    result = Number(maximo) + Number(minimum);
    return result;
  }

  getExcel(): void {
    this.cuencaServices.getExcelFromUrl('commandand/report')
      .then(response => {
        BrowserUtils.downloadExcelFromBlob(response);
      });
  }
}
