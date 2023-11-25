import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Globals} from '../../../../globals';
import {PropertyOwnership} from '../../../data/model/predio-ownership';
import {isArray, isObject, isUndefined} from 'util';

declare let google: any;

@Component({
  selector: 'cuenca-predio-view',
  templateUrl: './view-potencial.component.html',
  styleUrls: ['./view-potencial.component.css']
})

export class ViewPotencialComponent extends BaseComponent implements OnInit, OnDestroy {
  public idPredio: string;
  public recUserId: string;
  public subType: string;
  public mapError: Boolean = false;
  public marcadores: Array<any> = [];
  public listPredios: Array<any> = [];

  public listDocumentsPredio: any = [];
  public predio: any = {};
  public propertyOwnership: PropertyOwnership;
  public arrPropertyOwnership: Array<PropertyOwnership> = [];
  public ownerName: string;
  public ownerGender: string;
  public comentario: string;

  constructor(protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected cuencaServices: CuencaVerdeService,
              public rolesManager: RolesManager,
              public messagingService: MessagingService,
              protected activatedRoute: ActivatedRoute,
              private globals: Globals,
              private cd: ChangeDetectorRef) {
    super(proceduresManager, rolesManager);
    this.ownerName = '';
  }

  ngOnInit() {
    this.getAllUsers(this);
    this.getUserRoles(this);
    
    this.getPredios(); /// get detail predio
    this.getDocumentsPredio(); // get documents of predio

    this.URL_BASE_FILES = this.cuencaServices.API_URL_FILES;
    this.URL_BASE_IMAGES = this.cuencaServices.API_IMAGES_URL_CUENCA;

    this.propertyOwnership = new PropertyOwnership();
    this.recUserId = "0"
  }

  public addOwner() {
    let message: any;
    this.arrPropertyOwnership.push(this.propertyOwnership);
    this.propertyOwnership = new PropertyOwnership();
    this.propertyOwnership.gender = 'male';
    message = {
      'tipo': 'Respuesta:',
      'message': 'Propietario agregado.',
      'style': 'alert-success'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

  public deleteOwner(index: number) {
    this.arrPropertyOwnership.splice(index, 1);
  }

  public getPredioDmsCoordinates() {
    this.predio.degrees = this.ddToDms(this.predio.lat, this.predio.lng);
    this.success(this.predio.lat + ',' + this.predio.lng);
  }

  public getPredioDDCoordinates() {
    const lat = [this.predio.degrees.north.d, this.predio.degrees.north.m, this.predio.degrees.north.s];
    const lng = [this.predio.degrees.west.d, this.predio.degrees.west.m, this.predio.degrees.west.s];
    const predioDd = this.dmsToDd(lat, 'N', lng, 'W');
    this.predio.lat = predioDd[0];
    this.predio.lng = predioDd[1];
    this.success(this.predio.lat + ',' + this.predio.lng);
  }

  private ddToDms(lat: any, lng: any) {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    const north = this.getDms(lat);
    const west = this.getDms(lng);
    return {north: north, west: west};
  }

  private dmsToDd(lat: any, latRef: string, lon: any, lonRef: string) {
    const ref = {'N': 1, 'E': 1, 'S': -1, 'W': -1};
    const sep = [' ,', ' ', ','];
    let i;

    if (typeof lat === 'string') {
      for (i = 0; i < sep.length; i++) {
        if (lat.split(sep[i]).length === 3) {
          lat = lat.split(sep[i]);
          break;
        }
      }
    }

    if (typeof lon === 'string') {
      for (i = 0; i < sep.length; i++) {
        if (lon.split(sep[i]).length === 3) {
          lon = lon.split(sep[i]);
          break;
        }
      }
    }

    for (i = 0; i < lat.length; i++) {
      if (typeof lat[i] === 'string') {
        lat[i] = lat[i].split('/');
        lat[i] = parseInt(lat[i][0], 10) / parseInt(lat[i][1], 10);
      }
    }

    for (i = 0; i < lon.length; i++) {
      if (typeof lon[i] === 'string') {
        lon[i] = lon[i].split('/');
        lon[i] = parseInt(lon[i][0], 10) / parseInt(lon[i][1], 10);
      }
    }

    lat = (lat[0] + (lat[1] / 60) + (lat[2] / 3600)) * ref[latRef];
    lon = (lon[0] + (lon[1] / 60) + (lon[2] / 3600)) * ref[lonRef];

    return [lat, lon];
  }

  private getDms(val: any) {
    const resultObject = {
      d: 0,
      m: 0,
      s: 0
    };
    let valDeg, valMin, valSec;
    val = Math.abs(val);
    valDeg = Math.floor(val);
    resultObject.d = valDeg;
    valMin = Math.floor((val - valDeg) * 60);
    resultObject.m = valMin;
    valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000;
    resultObject.s = valSec;
    return resultObject;
  }

  error(msg: any) {
    this.mapError = true;
  }

  // load mapa
  success(position: any) {
    const coordenadas = position.split(',');
    const lat = parseFloat(coordenadas[0]);
    const lng = parseFloat(coordenadas[1]);

    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 20,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      mapTypeId: 'hybrid'
    });

    const componente = this;

    const marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      title: 'Ubicación del Predio',
      draggable: ((componente.isAdministrativo))
    });

    this.predio.lat = lat;
    this.predio.lng = lng;

    marker.addListener('dragend', function (e: any) {
      componente.predio.lat = e.latLng.lat();
      componente.predio.lng = e.latLng.lng();
      componente.refresh();
    });
  }

  refresh() {
    this.cd.detectChanges();
  }

  // eliminar documento del predio
  public eliminarDoc(idFile: string, type: string) {
    this.tasksManager.removeFilePotential(this.idPredio, idFile, type)
      .then(() => {
        this.getDocumentsPredio();
        this.getPredios();
        const message = {
          'tipo': 'Archivo Eliminado ',
          'message': ' satisfactoriamente',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      }, function (reason) {
        const message = {
          'tipo': 'Ha ocurrido un error ',
          'message': ' al intentar eliminar el archivo',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      });
  }

  // actualizar cpordenadas
  uploadCoordenadas() {
    const objetoPredio = {
      potential_id: this.idPredio,
      latitude: this.predio.lat,
      longitude: this.predio.lng
    };
    this.tasksManager.uploadCoordenadasPredio(objetoPredio)
      .then(response => {
        const message = {
          'tipo': 'Éxito:',
          'message': 'Coordenadas actualizadas satisfactoriamente',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      }, error => {
        const message = {
          'tipo': 'Error:',
          'message': error,
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      });
  }

  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  ngOnDestroy() {
  }

  /// mensaje al subir archivo
  messageUploadFile($event: any) {
    let message;
    if ($event.payload.code === 200) {
      message = {
        'tipo': 'Respuesta:',
        'message': $event.payload.message,
        'style': 'alert-success'
      };
      this.getPredios();
      this.getDocumentsPredio();
    } else {
      message = {
        'tipo': 'Respuesta:',
        'message': $event.payload.message,
        'style': 'alert-danger'
      };
    }

    this.messagingService.publish(new BusMessage('alerta', message));
  }

  // insertar comentario
  public insertComment(): void {
    const objeto = {
      'potential_id': this.idPredio,
      'comment': this.comentario,
      'sub_type': this.subType
    };
    if (objeto.comment !== '' && objeto.comment !== undefined) {
      this.tasksManager.insertCommentPredio(objeto)
        .then(response => {
          this.getPredios();
          this.comentario = '';

          const message = {
            'tipo': 'Éxito:',
            'message': 'Comentario registrado satisfactoriamente',
            'style': 'alert-success'
          };

          this.messagingService.publish(new BusMessage('alerta', message));

        }, error => {

          const message = {
            'tipo': 'Error:',
            'message': error,
            'style': 'alert-danger'
          };

          this.messagingService.publish(new BusMessage('alerta', message));

        });
    }
  }

  // lista de predios
  public getPredios(): void {
    const componente = this;
    this.predio.potential_assigned = false;
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        this.idPredio = idString;
        if (id > 0) {
          this.cuencaServices.getPrediosDetailsById(this.idPredio)
            .then(predios => {

              componente.predio = predios;
              componente.predio.lat = '';
              componente.predio.lng = '';

              componente.getPropertyOwnership(componente.predio.id);

              componente.subType = predios.sub_type;
              if (componente.predio.main_coordinate) {
                this.predio.lat = componente.predio.main_coordinate.split(',')[0];
                this.predio.lng = componente.predio.main_coordinate.split(',')[1];
                componente.getPredioDmsCoordinates();
              } else {
                componente.error(componente);
              }
            });
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });
  }

  /// enviar predio flujo
  private sendPredioStart() {
    if(this.recUserId == '0') {
      console.log("email case")
      const message = {
        'tipo': 'Error: ',
        'message': ' Debes enviar selecciona un correo electrónico',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
    else if ((!this.propertyOwnership || !this.propertyOwnership.owner)) {
      const message = {
        'tipo': 'Error: ',
        'message': ' Debes enviar los datos de propiedad del predio',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    } else if (this.isAdministrativo && this.predio.potential_assigned || this.isJuridico && this.predio.potential_assigned || this.isCoordinador) {
      this.tasksManager.sendPredioFlow(this.idPredio, this.recUserId)
        .then(() => {
          const message = {
            'tipo': 'Predio Enviado ',
            'message': ' satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          const link = ['/app'];
          this.router.navigate(link);

        }, (e) => {
          console.log(e)
          const message = {
            'tipo': 'Error: ',
            'message': ' Error al enviar predio',
            'style': 'alert-danger'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
        });
    } else {
      const message = {
        'tipo': 'Error: ',
        'message': ' Debe tomar el predio para enviar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
  }

  // terminar flujo predio
  private sendPredioEnd() {
    this.tasksManager.sendPredioFlowEnd(this.idPredio)
      .then(() => {
        const message = {
          'tipo': 'Registro y Validadión de Predio ',
          'message': ' completado satisfactoriamente',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        const link = ['/app'];
        this.router.navigate(link);

      }, () => {
        const message = {
          'tipo': 'Error: ',
          'message': ' Error al aprobar predio',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      });
  }

  // regresar predio
  private backPredio() {
    this.tasksManager.backPredioFlow(this.idPredio)
      .then(() => {
        const message = {
          'tipo': 'Predio Devuelto',
          'message': ' satisfactoriamante',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        const link = ['/app'];
        this.router.navigate(link);
      }, () => {
        const message = {
          'tipo': 'Error: ',
          'message': ' Error al regresar predio al estado anterior',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      });
  }

  // selected predio for user
  private selectPredio() {
    this.tasksManager.selectPredioUser(this.idPredio)
      .then(() => {
        const message = {
          'tipo': 'Predio Seleccionado ',
          'message': ' satisfactoriamente',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        this.getPredios();
      }, () => {
        const message = {
          'tipo': 'Error: ',
          'message': ' No se pudo asignar el predio al usuario actual',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      });
  }

  // get list documents of predio
  private getDocumentsPredio() {
    this.tasksManager.getDocumentsPredio(this.idPredio)
      .then((documents: any) => {
        this.listDocumentsPredio = documents;
      });
  }

  private getPropertyOwnership(prediosId: string) {
    this.cuencaServices.getPropertyOwnership(prediosId)
      .then((propertyOwnership: Array<PropertyOwnership>  ) => {
        if (isArray(propertyOwnership)) {
          this.arrPropertyOwnership = propertyOwnership ;
        }
        /*if (propertyOwnership.titleDeed) {
          propertyOwnership.id = 999;
        }*/
      });
  }

  public savePropertyOwnership() {
    this.cuencaServices.savePropertyOwnership(this.predio.id, this.arrPropertyOwnership)
      .then((response: any) => {
        if (response.code + '' === '200') {
          this.propertyOwnership.id = 999;
          const object = {
            'tipo': 'Exito: ',
            'message': ' Los datos hasn sido guardados',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', object));
        }
      });
  }
}
