import GeoJson = geoJsonInterface.GeoJson;
import Feature = geoJsonInterface.Feature;
import Documents = documentsInterface.Documents;
import Comments = commentsInterface.Comments;
import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {GeoJsonService} from '../../../data/services/geo-json.service';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import {MessagingService} from '../../../data/services/messaging.service';
import {MapHelper} from '../../map/MapHelper';
import {Image, MonitoreoDetail, Point} from '../../../data/model/monitoreo-detail';

declare let google: any;

@Component({
  selector: 'cuenca-map',
  templateUrl: './view-monitoreo.component.html',
  styleUrls: ['./view-monitoreo.component.css']
})
export class ViewMonitoreoComponent extends BaseComponent implements OnInit, OnDestroy {
  public shapeFileUploader = 'shapeFileUploader';
  private map: any = null;
  private bounds: any;
  public files: any;
  public images: Image[];
  public documents: Array<Documents>;
  public hasDocuments: Boolean = false;
  public comments: Array<Comments>;
  public comment: string;
  public monitoreoDetail: MonitoreoDetail;
  private polygons: Array<any> = null;
  private polylines: Array<any> = null;
  private circles: Array<any> = null;
  public comentario: string;

  constructor(protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              private route: ActivatedRoute,
              private geoJsonService: GeoJsonService,
              private cuencaVerdeService: CuencaVerdeService,
              protected router: Router,
              public rolesManager: RolesManager,
              public messagingService: MessagingService,
              private activatedRoute: ActivatedRoute) {
    super(proceduresManager, rolesManager);
    this.polygons = [];
    this.polylines = [];
    this.circles = [];
  }

  ngOnInit() {
    this.getTask();
    const component = this;
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      mapTypeId: 'terrain'
    });
    this.bounds = new google.maps.LatLngBounds();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.tasksManager.getMonitoreoDetail(+params.get('id') + ''))
      .subscribe(monitoreoDetail => {
        if (monitoreoDetail.id) {
          component.monitoreoDetail = monitoreoDetail;
          component.addMonitoreoToView(component, monitoreoDetail);
        } else {
          const link = ['app'];
          this.router.navigate(link);
        }
      }, function (reason) {
        console.log(reason);
      });
    this.getUserRoles(this);
  }

  ngOnDestroy() {
  }

  private getTask(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        if (id > 0) {
          this.tasksManager.getTaskDetails(String(id))
            .then(task => {
              // this.task = task;
            }).then(() => {
            // this.getFiles();
          });
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });
  }

  approveTask() {
    /*this.tasksManager.approveTask(this.monitoreoId)
     .then(() => {
     this.tasksManager.clearObjects();
     const message = {
     'tipo': 'Tarea enviada ',
     'message': 'y aprobada satisfactoriamente',
     'style': 'alert-success'
     };
     this.messagingService.publish(new BusMessage('alerta', message));
     const link = ['/app/tasks'];
     this.router.navigate(link);
     });*/
  }

  private addMonitoreoToView(component: any, monitoreoDetail: MonitoreoDetail) {
    if (monitoreoDetail.geojson_feature) {
      const feature: Feature = <Feature> JSON.parse(monitoreoDetail.geojson_feature);
      this.addFeatureToMap(feature);
    }
    if (monitoreoDetail.points) {
      monitoreoDetail.points.forEach(function (point: Point) {
        MapHelper.addMonitoreoPointToMap(component, google, point);
      });
    }
  }

  private addFeatureToMap(featureToAdd: Feature): void {
    const features: Feature[] = [];
    features.push(featureToAdd);
    if (features) {
      const markerBounds = new google.maps.LatLngBounds();
      for (let i = 0; i < features.length; i++) {
        const feature: Feature = features[i];
        if (feature) {
          MapHelper.addFeatureToMap(this, google, feature, markerBounds);
          this.map.fitBounds(markerBounds);
        }
      }
    }
  }

  public onMonitoreoPointClicked(point: Point) {
    this.images = point.images;
  }

  private getComments(): void {
    this.tasksManager.getAllMonitoreoComments(this.monitoreoDetail)
      .then(comments => {
        this.comments = comments;
      });
  }

  public insertComment(): void {
    const id: number = Number(this.monitoreoDetail.id);
    const objeto = {
      'task_id': id,
      'sub_type': this.monitoreoDetail.id,
      'comment': this.comentario
    };
    if (objeto.comment !== '' && objeto.comment !== undefined) {
      this.tasksManager.insertMonitoreoComment(objeto)
        .then(response => {
          this.getComments();
          this.comentario = '';
        });
    }
  }
}
