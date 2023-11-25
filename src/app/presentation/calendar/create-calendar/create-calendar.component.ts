import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ContractorsManager} from '../../../data/managers/contractors.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {CalendarComponent} from 'ng-fullcalendar';
import {User} from '../../../data/model/user';
import {Procedure} from '../../../data/model/procedure';
import {MapaCalendarComponent} from '../../mapa-calendar/mapa-calendar.component';
import {MonitoreoObject} from '../../../data/model/monitoreoObject';
import Role = roleInterface.Role;
import Comments = commentsInterface.Comments;

declare let google: any;


@Component({
  selector: 'cuenca-calendar-create',
  templateUrl: './create-calendar.component.html',
  styleUrls: ['./create-calendar.component.css']
})
export class CreateCalendarComponent extends BaseComponent implements OnInit {

  public roles: Array<Role> = [];
  public users: Array<User> = [];
  public procedures: Array<Procedure> = [];
  types_monitoreos: Array<any> = []; // TODO Change for MonitoreoTypes
  public comments: Array<Comments>;
  public comentario: string;

  //////OBJETO
  public monitoreo: MonitoreoObject = new MonitoreoObject();

  public mapGeoJson: any;
  public map: any = null;
  public acciones: Array<any> = [];
  public selectedHash: Boolean = false;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  @ViewChild(MapaCalendarComponent) mapaCalendarComponent: MapaCalendarComponent;

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
    this.getTypeMonitoreos();
    this.getRoles(this);
    this.getProcedures(this);

    //////OBJETO
    this.monitoreo.type = '0';
    this.monitoreo.usuario = '0';
    this.monitoreo.role = '0';

    this.activatedRoute.paramMap
      .map((params: ParamMap) => params.get('fecha'))
      .subscribe(fecha => {
        if (fecha !== null) {
          this.monitoreo.start = fecha;
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });
  }

  /// get tipos de monitoreos
  private getTypeMonitoreos(): void {
    this.tasksManager.getTypeMonitor()
      .then(typeMonitor => {
        this.types_monitoreos = typeMonitor;
      });
  }

  /// get todos los roles
  getRoles(component: any): Promise<any> {
    return new Promise((resolve) => {
      component.rolesManager.getAllRoles()
        .then((roles: Array<Role>) => {
          if (roles.length > 0) {
            component.roles = roles;
            ////console.log(component.roles);
            resolve(component);
          }
        });
    });
  }

  /// get lista de procedimientos
  private getProcedures(component: any): void {
    this.monitoreo.procedure = '0';
    this.proceduresManager.getAllForMonitoringCalendar()
      .then(procedures => {
        this.procedures = procedures;
      });
  }

  /// get usuarios segun el rol de monitoreo
  getUsers(): Promise<any> {
    const component = this;
    this.users = [];
    return new Promise((resolve) => {
      component.proceduresManager.getUsers(Number(component.monitoreo.role))
        .then((users: Array<User>) => {
          if (users.length > 0) {
            component.users = users;
            resolve();
          }
        });
    });
  }

  // validar el monitoreo antes de registrar
  protected isValidMonitoreo(): boolean {
    if (!this.monitoreo.title || this.monitoreo.title.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el Título',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.monitoreo.type + '' === '0' || this.monitoreo.type === undefined || this.monitoreo.type === null) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Seleccione tipo: Monitoreo o Mantenimiento',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.monitoreo.procedure + '' === '0' || this.monitoreo.procedure === undefined || this.monitoreo.procedure === null) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Seleccione un Procedimiento',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.monitoreo.usuario + '' === '0' || this.monitoreo.usuario === undefined || this.monitoreo.usuario === null) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Seleccione un Usuario a quien asignar la acción',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.monitoreo.start) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la Fecha de Inicio',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.monitoreo.end) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la Fecha de Terminación',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.monitoreo.comentario || this.monitoreo.comentario.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa algún Comentario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.monitoreo.hash + '' === '' || this.monitoreo.hash === undefined || this.monitoreo.hash === null) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Seleccione la actividad a la que se le realizará el mantenimiento',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

  // save
  public guardar(): void {
    const componente = this;
    if (this.isValidMonitoreo()) {
      ////console.log(this.monitoreo);
      this.tasksManager.crearMonitorCalendar(this.monitoreo)
        .then(() => {
          const message = {
            'tipo': 'Monitoreo Registrado ',
            'message': ' satisfactoriamente. Espere mientras recargamos el calendario.',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));

          const link = ['/app/calendar'];
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

  public getGeoJson(): void {
    const componente = this;
    if (this.monitoreo.procedure !== undefined && this.monitoreo.procedure !== '0') {
      this.tasksManager.getGeoJsonByProcedure(this.monitoreo.procedure)
        .then(response => {
          if (response instanceof Array) {
            this.mapGeoJson = response[0].geojson;
            let contador = 0;
            response.forEach((item) => {
              if (contador !== 0) {
                componente.acciones.push(item);
              }
              contador++;
            });
            /////console.log(componente.acciones);
            this.mapaCalendarComponent.loadGeoJson(JSON.parse(this.mapGeoJson));
          } else {
            const message = {
              'tipo': 'El Mapa ',
              'message': ' no ha sido cargado',
              'style': 'alert-warning'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
          }
        });
    } else {
      this.acciones = [];
    }
  }

  public clickInMap($event: any): void {
    if ($event.payload.type === '1') {
      this.acciones = [];
      if ($event.payload.properties.hash !== undefined && $event.payload.properties.hash !== null) {
        this.tasksManager.getActionHash($event.payload.properties.hash)
          .then(response => {
            if (response !== null) {
              this.acciones.push(response);
              this.ref.detectChanges();
              document.getElementById('selected').style.border = 'thick solid' + $event.payload.properties.Color;
              document.getElementById('selected').style.fontWeight = 'bold';
              this.monitoreo.hash = $event.payload.properties.hash;
            } else {
              document.getElementById('selected').style.border = 'none';
              document.getElementById('selected').style.fontWeight = 'bold';
              this.monitoreo.hash = '';
            }
          });
        this.ref.detectChanges();
      }
    }

  }

}
