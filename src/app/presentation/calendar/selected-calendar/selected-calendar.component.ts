import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {User} from '../../../data/model/user';
import {Procedure} from '../../../data/model/procedure';
import {MapaCalendarComponent} from '../../mapa-calendar/mapa-calendar.component';
import {MonitoreoObject} from '../../../data/model/monitoreoObject';
import {GeoJsonService} from '../../../data/services/geo-json.service';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {InfoPoint} from '../../../data/model/infoPoint';
import Role = roleInterface.Role;
import Comments = commentsInterface.Comments;

declare let google: any;

@Component({
  selector: 'cuenca-calendar-selected',
  templateUrl: './selected-calendar.component.html',
  styleUrls: ['./selected-calendar.component.css']
})
export class SelectedCalendarComponent extends BaseComponent implements OnInit {
  public monitoreo: MonitoreoObject = new MonitoreoObject();
  public comments: Array<Comments>;
  public roles: Array<Role> = [];
  public budget: any;
  public comentario: string;
  public comentarioRechazo: string;
  public URL_BASE_FILES: string;
  public userEmail: string;
  public procedures: Array<Procedure> = [];

  public showGrid: Boolean = false;
  public pointSelected: InfoPoint;
  public idMonitor: string;
  public fechas: Array<any> = [];
  public pointsData: Array<InfoPoint> = []; ///Puntos registrados en los monitoreos
  types_monitoreos: Array<any> = []; // TODO Change for MonitoreoTypes

  public mapGeoJson: any;
  public map: any = null;
  public acciones: Array<any> = [];

  @ViewChild(MapaCalendarComponent) mapaCalendarComponent: MapaCalendarComponent;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              private geoJsonService: GeoJsonService,
              public rolesManager: RolesManager,
              protected cuencaService: CuencaVerdeService,
              protected ref: ChangeDetectorRef) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.URL_BASE_FILES = this.cuencaService.API_URL_FILES;
    this.getUserRoles(this);
    this.messagingService.publish(new BusMessage('onRouteChanged', null));

    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        if (id > 0) {
          this.idMonitor = String(id);
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });

    this.getTypeMonitoreos(); // tipos de monitoreos
    this.getRoles(this); // get roles
    this.getFechas();
    this.getProcedures(this)
      .then(() => {
        this.getMoreDataMonitoreo();
      });
  }

  private getTypeMonitoreos(): void {
    this.tasksManager.getTypeMonitor()
      .then(typeMonitor => {
        this.types_monitoreos = typeMonitor;
      });
  }

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

  private getProcedures(component: any): Promise<any> {
    return new Promise((resolve) => {
      this.monitoreo.procedure = '0';
      this.proceduresManager.getAllForMonitoringCalendar()
        .then(procedures => {
          this.procedures = procedures;
          resolve();
        });
    });
  }

  public getFechas(): void {
    this.tasksManager.getMonitoreosCalendar()
      .then(fechas => {
        this.fechas = fechas;

        const objetoSelected = this.fechas.filter(fecha => String(fecha.id) === String(this.idMonitor));

        if (objetoSelected && objetoSelected.length > 0) {
          this.monitoreo = {
            id: objetoSelected[0].id,
            title: objetoSelected[0].title,
            start: objetoSelected[0].start,
            end: objetoSelected[0].end,
            comentario: '',
            acciones: [],
            type: '1',
            procedure: objetoSelected[0].process_id,
            hash: objetoSelected[0].hash_map,
            role: objetoSelected[0].role_id === true ? objetoSelected[0].role_id : '0',
            usuario: objetoSelected[0].user_id === true ? objetoSelected[0].user_id : '0'
          };

          this.comments = objetoSelected[0].comment_by_monitoring;
          this.getUsers();
          this.getGeoJsonView();
        }
      });
  }

  // insertar comentario a monitoreo
  public insertComment(): void {
    const objeto = {
      'monitoring_id': this.monitoreo.id,
      'comment': this.comentario
    };
    if (objeto.comment !== '' && objeto.comment !== undefined) {
      this.tasksManager.insertCommentMonitoreoCalendar(objeto)
        .then(response => {
          this.comentario = '';

          const message = {
            'tipo': 'Comentario Agregado ',
            'message': ' satisfactoriamente.',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));

          location.reload();

        });
    }
  }

/////// MAPA
  // get geoJson del mapa
  public getGeoJsonView(): void {
    this.monitoreo.acciones = [];
    const componente = this;
    if (this.monitoreo.procedure !== undefined && this.monitoreo.procedure !== '0') {
      this.tasksManager.getGeoJsonByProcedure(this.monitoreo.procedure)
        .then(response => {
          if (response instanceof Array) {
            this.mapGeoJson = response[0].geojson;
            this.mapaCalendarComponent.loadGeoJson(JSON.parse(this.mapGeoJson));
            ////acciones
            if (this.monitoreo.hash !== undefined && this.monitoreo.hash !== null) {
              this.tasksManager.getActionHash(this.monitoreo.hash)
                .then(responseHash => {
                  if (responseHash !== null) {
                    this.acciones = [];
                    this.acciones.push(responseHash);
                    this.ref.detectChanges();
                    document.getElementById('selected').style.border = 'thick solid' + responseHash.color;
                    document.getElementById('selected').style.fontWeight = 'bold';
                  } else {
                    document.getElementById('selected').style.border = 'none';
                    document.getElementById('selected').style.fontWeight = 'normal';
                  }
                });
            }
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
  }

  // function click en mapa
  public clickInMap($event: any): void {

    ////// click in HASH
    if ($event.payload.type === '1') {
      if ($event.payload.properties.hash !== undefined && $event.payload.properties.hash !== null) {
        this.tasksManager.getActionHash($event.payload.properties.hash)
          .then(response => {
            if (response !== null) {
              this.acciones = [];
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
    ////// click in MARKER
    if ($event.payload.type === '2') {

      const selected = this.pointsData.filter(point => String(point.id) === String($event.payload.properties));
      this.pointSelected = selected[0];

      this.showGrid = true;
    }
  }

  /// regresar a la grilla de calendario
  public backGrilla() {
    this.showGrid = false;
    this.getFechas();
    //////MAS DATA DEL MONITOREO -- FOTOGRAFIAS
    this.getMoreDataMonitoreo();
  }

  //// MORE DATA
  public getMoreDataMonitoreo(): void {
    this.tasksManager.getMonitorFromId(this.idMonitor)
      .then((data: any) => {
        this.pointsData = data.points;
        if (data.user) {
          this.userEmail = data.user.email;
        }
        if (this.pointsData && this.pointsData.length > 0) {
          this.pointsData.forEach((item) => {
            const coordenada = item.coordinate.split(',');
            const lat = coordenada[0];
            const lng = coordenada[1];
            const id = item.id;
            this.mapaCalendarComponent.crearMarcador(lat, lng, id);
          });
        }
        this.mapProcedure(data);
        this.mapRoleAndUser(data);
      });
  }

  public updateMonitor(): void {
    const componente = this;
    if (this.isValidMonitoreo()) {
      ////console.log(this.monitoreo);
      this.tasksManager.updateMonitorCalendar(this.monitoreo)
        .then(() => {
          const message = {
            'tipo': 'Monitoreo Actualizado ',
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

  // validar monitoreo
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

  private mapProcedure(data: any) {
    const component = this;
    this.procedures.forEach(function (procedure: any) {
      if (Number(procedure.id) === data.procedure_id) {
        component.monitoreo.procedure = procedure.id + '';
      }
    });
  }

  private mapRoleAndUser(data: any) {
    if (data.user) {
      const component = this;
      this.roles.forEach(function (role: any) {
        if (Number(role.id) === data.user.role_id) {
          component.monitoreo.role = role.id;
          component.getUsers();
        }
      });
    }
  }

  private getUsers() {
    this.getUsersGuardaCuencas(this)
      .then(users => this.getUsersEquipoSeguimiento(users, this))
      .then(users => this.getUsersCoordinacionGuardaCuenca(users, this))
      .then(users => {
        this.mapUser(this);
        this.users = users;
      });
  }

  private mapUser(component: any) {
    component.users.forEach(function (user: any) {
      if (user.email === component.userEmail) {
        component.monitoreo.usuario = user.id;
      }
    });
  }
}
