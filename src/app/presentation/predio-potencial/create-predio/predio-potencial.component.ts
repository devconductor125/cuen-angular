import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Globals} from '../../../../globals';


declare let google: any;

@Component({
  selector: 'cuenca-predio-potencial',
  templateUrl: './predio-potencial.component.html',
  styleUrls: ['./predio-potencial.component.css']
})
export class PredioPotencialComponent extends BaseComponent implements OnInit, OnDestroy {
  public mapError: Boolean = false;
  public marcadores: Array<any> = [];
  public predio: any = {
    'psa': false,
    'name': null,
    'lat': null,
    'lng': null
  };

  constructor(protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected cuencaServices: CuencaVerdeService,
              public rolesManager: RolesManager,
              public messagingService: MessagingService,
              private globals: Globals) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit() {
    const component = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position: any) {
        component.success(position, component);
      }, function () {
        component.error(component);
      });
    } else {
      this.mapError = true;
    }
  }

  error(msg: any) {
    this.mapError = true;
  }

  // cargar mapa
  success(position: any, component: any) {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: position.coords.latitude, lng: position.coords.longitude},
      zoom: 15,
      styles: this.globals.mapStyle,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    });
    google.maps.event.addListener(map, 'click', function (e: any) {
      component.marcadores.forEach(function (marcador: any) {
        marcador.setMap(null);
      });
      component.marcadores = [];
      component.latitudFinal = '';
      component.longitudFinal = '';
      const location = e.latLng;
      component.predio.lat = e.latLng.lat();
      component.predio.lng = e.latLng.lng();
      const marker = new google.maps.Marker({
        position: location,
        map: map
      });
      component.marcadores.push(marker);
      google.maps.event.addListener(marker, 'click', function (event: any) {
        const infoWindow = new google.maps.InfoWindow({
          content: 'Ubicación del Predio'
        });
        infoWindow.open(map, marker);
      });
    });
  }

  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  ngOnDestroy() {
  }

  // create predio
  public createP(): void {
    if (this.predio.name && this.predio.lat && this.predio.lng) {
      this.cuencaServices.sendPotencialPredio(this.predio)
        .then(() => {
          const message = {
            'tipo': 'Creación Exitosa ',
            'message': ' Predio Potencial creado satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          const link = ['/app/procedures'];
          this.router.navigate(link);
        });
    } else {
      const message = {
        'tipo': '',
        'message': 'Debes ingresar un nombre y ubicar un marcador en el mapa',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
  }
}
