import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {Router} from '@angular/router';
import {BaseComponent} from '../base-component/base-component';
import {TasksManager} from '../../data/managers/tasks.manager';
import {CuencaVerdeService} from '../../data/services/cuenca-verde.service';
import {RolesManager} from '../../data/managers/roles.manager';
import {MessagingService} from '../../data/services/messaging.service';
import {MapHelper} from '../map/MapHelper';
import Feature = geoJsonInterface.Feature;
import GeoJson = geoJsonInterface.GeoJson;

declare let google: any;

@Component({
  selector: 'cuenca-mapa-calendar',
  templateUrl: './mapa-calendar.component.html',
  styleUrls: ['./mapa-calendar.component.css']
})
export class MapaCalendarComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() notify: EventEmitter<object> = new EventEmitter<object>();

  public mapError: Boolean = false;
  public marcadores: Array<any> = [];
  public predio: any = {
    'name': '',
    'lat': '',
    'lng': ''
  };

  public URL_IMG: string;

  public map: any;
  private polygons: Array<any> = null;
  private polylines: Array<any> = null;
  private circles: Array<any> = null;
  private infoWindow: any;

  constructor(protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected cuencaService: CuencaVerdeService,
              public rolesManager: RolesManager,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
    this.polygons = [];
    this.polylines = [];
    this.circles = [];
  }

  ngOnInit() {

    this.URL_IMG = this.cuencaService.API_URL_IMG;

    const component = this;
    component.success({latitude: 0.0, longitude: 0.0}, component);
  }

  error(msg: any) {
    this.mapError = true;
  }

  success(position: any, component: any) {
    const lats = position.latitude;
    const lngs = position.longitude;
    const myLocation = {
      zoom: 17,
      mapTypeId: 'hybrid',
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    };
    this.map = new google.maps.Map(document.getElementById('map'), myLocation);
    this.infoWindow = new google.maps.InfoWindow({
      size: new google.maps.Size(150, 400)
    });
  }

  public loadGeoJson(geoJson: any): void {
    this.addGeoJsonToMap(geoJson, this);
  }

  private addGeoJsonToMap(geoJson: GeoJson, component: any): void {
    const features: Feature[] = geoJson.features;
    if (features) {
      const markerBounds = new google.maps.LatLngBounds();
      for (let i = 0; i < features.length; i++) {
        const feature: Feature = features[i];
        if (feature) {
          MapHelper.addFeatureToMap(component, google, feature, markerBounds);
          component.map.fitBounds(markerBounds);
        }
      }
    }
  }

  getId(): string {
    return this.componentId;
  }

  public onFeatureClicked(type: string, feature: any) {
    const objeto = {
      type: type,
      properties: feature.properties
    };

    this.notify.emit({payload: objeto});
  }

  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  public crearMarcador(lat: string, lng: string, id: string): void {
    this.addMarkerToMap(lat, lng, id);
  }

  public addMarkerToMap(lat: string, lng: string, id: string): void {
    const componente = this;
    const image = '../../assets/images/camera.png';
    const marker = new google.maps.Marker({
      position: {lat: Number(lat), lng: Number(lng)},
      icon: image,
    });

    marker.setValues({id: id});

    marker.addListener('click', function () {
      const store_id = marker.get('id');
      const objeto = {
        type: '2',
        properties: store_id
      };

      componente.notify.emit({payload: objeto});
    });
    marker.setMap(this.map);
  }

  ngOnDestroy() {
  }
}
