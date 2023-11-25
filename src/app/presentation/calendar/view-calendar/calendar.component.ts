import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {MessagingService} from '../../../data/services/messaging.service';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ContractorsManager} from '../../../data/managers/contractors.manager';
import {Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import * as moment from 'moment';
import {User} from '../../../data/model/user';
import {Procedure} from '../../../data/model/procedure';
import {MapaCalendarComponent} from '../../mapa-calendar/mapa-calendar.component';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {Predio} from '../../../data/model/predio';
import Role = roleInterface.Role;
import Comments = commentsInterface.Comments;

declare let google: any;


@Component({
  selector: 'cuenca-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CuencaCalendarComponent extends BaseComponent implements OnInit {
  calendarOptions: Options;
  fechas: Array<any> = [];
  viewCalendar: Boolean = true;
  viewForm: Boolean = false;
  viewFormView: Boolean = false;
  public roles: Array<Role> = [];
  public users: Array<User> = [];
  public procedures: Array<Procedure> = [];
  public predios: Array<any> = [];
  types_monitoreos: Array<any> = []; // TODO Change for MonitoreoTypes
  public comments: Array<Comments>;
  public comentario: string;

  public rolesList: Array<Role> = [];
  public roleFilter: string;
  public selectedFilter: String = '0';
  public selectedProcedure: String = '0';
  public selectedPredio: String = '0';
  public filterActive: Boolean = false;

  public filters: Array<any> = [
    {
      'id': '0',
      'name': 'Seleccione el Filtro'
    },
    {
      'id': '1',
      'name': 'Procedimiento'
    },
    {
      'id': '2',
      'name': 'Predio'
    }
  ];


  //////OBJETO
  monitoreo: any = {
    id: '',
    title: '',
    start: '',
    end: '',
    comentario: '',
    type: '0',
    usuario: '0',
    procedure: '0',
    hash: '',
    role: '0'
  };
  public mapGeoJson: any;
  public map: any = null;
  public acciones: Array<any> = [];

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  @ViewChild(MapaCalendarComponent) mapaCalendarComponent: MapaCalendarComponent;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected contractorsManager: ContractorsManager,
              protected router: Router,
              protected cuencaServices: CuencaVerdeService,
              public rolesManager: RolesManager,
              protected tasksManager: TasksManager,
              protected ref: ChangeDetectorRef) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.selectedFilter = '0';
    this.selectedProcedure = '0';
    this.selectedPredio = '0';

    this.getFechas();

    this.acciones = [];

    this.getUserRoles(this);
    this.getProcedures(); // listado de procedimientos
    this.getPrediosPotenciales(); // listado de predios potenciales
  }

  // event click en calendario ver monitoreo creado
  eventClick($event: any): void {
    //////OBJETO
    this.monitoreo = {
      id: $event.id
    };

    const link = ['/app/selected-calendar/' + this.monitoreo.id];
    this.router.navigate(link);

  }

  // event drop no se usa
  public eventDrop($event: any): void {
    ///console.log($event.event);
  }

  // evento para crear monitoreo en fecha clickeada
  public clickInDay(date: any): void {

    const link = ['/app/create-calendar/' + moment(date).format()];
    this.router.navigate(link);

  }

  filterTasksByRole(selectedRole: Role): void {
  }

  private getProcedures(): void {
    this.tasksManager.getProcedures()
      .then(procedures => {
        this.procedures = procedures;
      });
  }

  getPrediosPotenciales(): void {
    this.cuencaServices.getPredios()
      .then((predios: Array<any>) => {
        this.predios = predios;
      });
  }

  private getRoles(component: any): Promise<any> {
    return new Promise((resolve) => {
      component.rolesManager.getAllRoles()
        .then((roles: Array<Role>) => {
          if (roles.length > 0) {
            if (roles[0].id !== 0) {
              const placeholder = component.getCustomPlaceholder('Selecciona un rol');
              roles.unshift(placeholder);
            }
            component.roles = roles;
            component.task.role = roles[0];
            resolve(component);
            component.onDataLoaded();
          }
        });
    });
  }

  // poblar calendario
  public getFechas(): void {
    this.tasksManager.getMonitoreosCalendar()
      .then(fechas => {
        this.fechas = fechas;
        this.calendarOptions = {
          locale: 'es',
          editable: true,
          eventLimit: false,
          header: {
            left: 'prev,next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          views: {
            month: {buttonText: 'Mes'},
            agendaWeek: {buttonText: 'Semana'},
            agendaDay: {buttonText: 'Día'}
          },
          events: this.fechas
        };
      });
  }
}
