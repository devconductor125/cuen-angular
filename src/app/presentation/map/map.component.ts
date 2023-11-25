import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BrowserUtils} from '../../data/utils/browser.utils';
import {GeoJsonService} from '../../data/services/geo-json.service';
import {ShapeFilesUploaderComponent} from '../shape-file-uploader/shape-files-uploader';
import {MapHelper} from './MapHelper';
import {BaseComponent} from '../base-component/base-component';
import {TasksManager} from '../../data/managers/tasks.manager';
import {CuencaVerdeService} from '../../data/services/cuenca-verde.service';
import {RolesManager} from '../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../data/services/messaging.service';
import {Task} from '../../data/model/task';
import {ActionData} from '../../data/model/actionData';
import {SHAUtils} from '../../data/utils/shaUtils';
import GeoJson = geoJsonInterface.GeoJson;
import Feature = geoJsonInterface.Feature;
import Documents = documentsInterface.Documents;
import Comments = commentsInterface.Comments;
import Properties = geoJsonInterface.Properties;

declare let google: any;

@Component({
  selector: 'cuenca-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent extends BaseComponent implements OnInit, OnDestroy {
  public shapeFileUploader = 'shapeFileUploader';
  @ViewChild('shapeFileUploader') fileUploader: ShapeFilesUploaderComponent;
  protected map: any = null;
  private polyLine: any = null;
  private polygons: Array<any> = null;
  private polylines: Array<any> = null;
  private circles: Array<any> = null;
  public mapConventions: Array<any> = [];
  protected infoWindow: any;
  protected bounds: any;
  protected taskId: string;
  public task: Task;
  public files: any;
  public images: any;
  public documents: Array<Documents>;
  public hasDocuments: Boolean = false;
  public comments: Array<Comments>;
  public actionsList: Array<ActionData>;
  public comment: string;
  public canLoadNewShape: boolean;
  public canSendMap: boolean;
  public canViewComments: boolean;
  public canApproveTask: boolean;
  public mapTitle: string;
  public mapSubTitle: string;

  public formData: any;

  constructor(protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected route: ActivatedRoute,
              protected geoJsonService: GeoJsonService,
              protected cuencaVerdeService: CuencaVerdeService,
              protected router: Router,
              public rolesManager: RolesManager,
              public messagingService: MessagingService,
              protected activatedRoute: ActivatedRoute) {
    super(proceduresManager, rolesManager);
    this.polygons = [];
    this.polylines = [];
    this.circles = [];
  }

  ngOnInit() {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getUserRoles(this);
  }

  protected onGotRoles(): void {
    this.proceduresManager.clearGeoJsonCache();
    this.initMap();
    this.getReferralId();
    this.getTask()
      .then(() => {
        this.hasDocuments = true;
        this.getFiles();
        this.getComments();
        this.getActionsList(this);
        this.setViewInfo();
      });
  }

  private getActionsList(component: any) {
    component.proceduresManager.getActionsList()
      .then((actionsList: Array<ActionData>) => {
        component.actionsList = actionsList;
      }).then(() => {
      component.evaluateSectionsVisibility(component);
      component.getGeoJsonFromTaskId(component);
    });
  }

  private getReferralId() {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe((id) => {
        this.taskId = id;
      });
  }

  ngOnDestroy() {
  }

  protected getTask(): Promise<any> {
    return new Promise((resolve) => {
      this.activatedRoute.paramMap
        .map((params: ParamMap) => +params.get('id') + '')
        .subscribe(idString => {
          const id: number = Number(idString);
          if (id > 0) {
            this.tasksManager.getTaskDetails(String(id))
              .then(task => {
                this.task = task;
              }).then(() => {
              resolve();
            });
          } else {
            const link = ['/app'];
            this.router.navigate(link);
          }
        });
    });
  }

  public getFiles() {
    this.tasksManager.getAllTaskFiles(this.task)
      .then((files: any) => {
        if (files.images) {
          if (files.images.length > 0 || files.documents.length > 0) {
            if (files.images.length > 0) {
              this.images = files.images;
            }
            if (files.documents.length > 0) {
              this.documents = files.documents;
              this.hasDocuments = true;
            }
          } else {
            this.hasDocuments = false;
          }
        }
      });
  }

  protected addGeoJsonToMap(geoJson: GeoJson): void {
    const features: Feature[] = geoJson.features;
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

  protected loadCapaGestionPredial(geoJson: GeoJson): void {
    this.tasksManager.loadCapaGestionPredial()
      .then(capaGestionGeoJson => {
        // TODO Load capaGestión into map
      });
  }

  private evaluateSectionsVisibility(component: any) {
    const hasTaskAndIsSig = component.task && component.isSig;
    // const hasTaskAndIsCoordinador = component.task && component.isCoordinador;
    const hasTaskAndIsCoordinador = false;
    const taskSubTypeId = String((component.task.sub_type && component.task.sub_type.id) ? component.task.sub_type.id : component.task.subtypes ? component.task.subtypes.id : '');
    const taskOpenSubTypeId = String(component.task.task_open_sub_type_id);

    const canLoadNewShape = taskSubTypeId + '' === '5' ||
      taskSubTypeId + '' === '11' ||
      taskSubTypeId + '' === '20' ||
      taskSubTypeId + '' === '29';

    const canLoadNewShapeOpenTask = (taskOpenSubTypeId + '' === this.SUBTYPE_TAREA_HIDRICO_EDITAR_MAPA) ||
      (taskOpenSubTypeId + '' === this.SUBTYPE_TAREA_EROSIVOS_EDITAR_MAPA) ||
      (taskOpenSubTypeId + '' === this.SUBTYPE_TAREA_PSA_EDITAR_SIG);

    component.canLoadNewShape = hasTaskAndIsSig && (canLoadNewShape || canLoadNewShapeOpenTask);

    component.canSendMap = hasTaskAndIsSig &&
      ((taskSubTypeId + '' === '15' ||
        taskSubTypeId + '' === '5' ||
        taskSubTypeId + '' === '28' ||
        taskSubTypeId + '' === '11' ||
        taskSubTypeId + '' === '29') ||
        (taskOpenSubTypeId + '' === this.SUBTYPE_TAREA_HIDRICO_EDITAR_MAPA ||
          taskOpenSubTypeId + '' === this.SUBTYPE_TAREA_PSA_EDITAR_SIG));

    component.canViewComments = (hasTaskAndIsSig || hasTaskAndIsCoordinador) &&
      ((taskSubTypeId + '' === '5' ||
        taskSubTypeId + '' === '11' ||
        taskSubTypeId + '' === '29') ||
        (taskOpenSubTypeId + '' === '22' ||
          taskOpenSubTypeId + '' === this.SUBTYPE_TAREA_PSA_EDITAR_SIG));

    component.canReassignTask = hasTaskAndIsSig &&
      (taskSubTypeId + '' === '5' ||
        taskSubTypeId + '' === '11');
  }

  public onFeatureClicked(type: string, feature: any, event: any) {
    if (this.infoWindow != null) {
      this.infoWindow.close();
    }

    let actionName = (feature.properties.ACCIONES ? feature.properties.ACCIONES : 'N/A');
    if (feature.properties.ACCIONES_P) {
      actionName = feature.properties.ACCIONES_P;
    }

    const content = '<div style="margin-top: 20px;">' +
      '<span style="font-weight: bold;">POLIGONO: </span>' +
      (feature.properties.POLIGONO ? feature.properties.POLIGONO : 'N/A') + '<br /><br />' +
      '<span style="font-weight: bold;">ACCIONES: </span>' +
      actionName + '<br /><br />' +
      '<span style="font-weight: bold;">TIPO_ALAMBRE: </span>' +
      (feature.properties.TIPO_ALAMBRE ? feature.properties.TIPO_ALAMBRE : 'N/A') + '<br /><br />' +
      '<span style="font-weight: bold;">TIPO_CERCO_VIVO: </span>' +
      (feature.properties.TIPO_CERCO_VIVO ? feature.properties.TIPO_CERCO_VIVO : 'N/A') + '<br /><br />' +
      '<span style="font-weight: bold;">Shape_Length: </span>' +
      (feature.properties.Shape_Leng ? feature.properties.Shape_Leng : 'N/A') + '<br /><br />' +
      '<span style="font-weight: bold;">Shape_Area: </span>' +
      (feature.properties.Shape_Area ? feature.properties.Shape_Area : 'N/A') + '<br /><br />' +
      '<span style="font-weight: bold;">AREA_HA: </span>' +
      (feature.properties.AREA_HA ? feature.properties.AREA_HA : 'N/A') + '<br /><br />' +
      '<span style="font-weight: bold;">LONGITUD_ML: </span>' +
      (feature.properties.LONGITUD_ML ? feature.properties.LONGITUD_ML : 'N/A') + '<br /><br />' +
      '</div>';

    this.infoWindow = new google.maps.InfoWindow({
      content: content,
      position: event.latLng
    });
    this.infoWindow.open(this.map);
    this.map.setCenter(event.latLng);
  }

  onFilesUploaded(event: any): void {
    switch (event.id) {
      case 'shapeFileUploader':
        if (event.type === 'filesUploaded') {
          this.fileUploader.reset();
          console.log(event);
          const geoJsonObject = event.payload.text();
          const geoJson: GeoJson = <GeoJson> JSON.parse(geoJsonObject);
          Object.assign(geoJson, JSON.parse(event.payload.text()));

          const cleanedFeatures: Array<Feature> = [];
          geoJson.features.forEach(function (feature: Feature) {
            if (feature.geometry.type === MapHelper.POINT && feature.geometry.coordinates.length > 1 && (feature.geometry.coordinates[0] < 0 && feature.geometry.coordinates[1] > 0)) {
              cleanedFeatures.push(feature);
            } else if (feature.geometry.type !== MapHelper.POINT) {
              cleanedFeatures.push(feature);
            }
          });
          geoJson.features = cleanedFeatures;

          this.setUpFeatures(this, geoJson.features);
          this.addGeoJsonToMap(geoJson);
          this.proceduresManager.addToCurrentGeoJsonList(geoJson);
        }
        break;
    }
  }

  public cleanMap() {
    this.mapConventions = [];
    this.proceduresManager.clearGeoJsonCache();
    this.polygons.forEach(function (polygon) {
      polygon.setMap(null);
    });
    this.polylines.forEach(function (polyline) {
      polyline.setMap(null);
    });
    this.circles.forEach(function (circle) {
      circle.setMap(null);
    });
    if (this.infoWindow != null) {
      this.infoWindow.close();
    }
  }

  public convertToShapeFile() {
    const geoJsonList: Array<GeoJson> = this.proceduresManager.getCurrentGeoJsonList();
    geoJsonList.forEach((geoJson: GeoJson) => {
      this.getShapeFile(geoJson);
    });
  }

  getShapeFile(geoJson: GeoJson): void {
    this.geoJsonService.geoJsonToShape(geoJson, MapHelper.LINE)
      .then(blob => {
        BrowserUtils.downloadZipFromBlob(blob, MapHelper.LINE);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.geoJsonService.geoJsonToShape(geoJson, MapHelper.MULTI_LINE)
      .then(blob => {
        BrowserUtils.downloadZipFromBlob(blob, MapHelper.MULTI_LINE);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.geoJsonService.geoJsonToShape(geoJson, MapHelper.POLYGON)
      .then(blob => {
        BrowserUtils.downloadZipFromBlob(blob, MapHelper.POLYGON);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.geoJsonService.geoJsonToShape(geoJson, MapHelper.POINT)
      .then(blob => {
        BrowserUtils.downloadZipFromBlob(blob, MapHelper.POINT);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  uploadMap(): void {
    if (Number(this.taskId) > 0) {
      const geoJsonList: Array<GeoJson> = this.proceduresManager.getCurrentGeoJsonList();
      if (geoJsonList.length > 0) {
        const geoJsonRequest = geoJsonList[0];
        for (let i = 1; i < geoJsonList.length; i++) {
          geoJsonRequest.features = geoJsonRequest.features.concat(geoJsonList[i].features);
          geoJsonRequest.budget = this.mergeBudgets(geoJsonRequest.budget, geoJsonList[i].budget);
        }
        const budgetArray = geoJsonRequest.budget;
        let filteredBudget: any = [];
        if (budgetArray) {
          budgetArray.forEach(function (budget: any) {
            if (!isNaN(budget.actionId)) {
              if (isNaN(budget.materialId)) {
                budget.materialId = null;
              }
              if (budget.materialId && budget.length > 0) {
                filteredBudget.push(budget);
              }
            }
          });
        }
        delete geoJsonRequest.budget;
        delete geoJsonRequest.polygon_features;
        delete geoJsonRequest.multi_polygon_features;
        delete geoJsonRequest.multi_line_string_features;
        delete geoJsonRequest.point_features;
        console.log("filteredBudget");
        console.log(filteredBudget);
        console.log(this.requiresBudget());
        console.log(this.task.sub_type.id);
        if (filteredBudget.length === 0 && this.requiresBudget()) {
          const message = {
            'tipo': 'Error: ',
            'message': ' Debes subir un shape válido que genere presupuesto',
            'style': 'alert-danger'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
        } else {
          if (this.task.sub_type.id + '' === '29') {
            filteredBudget = null;
          }
          this.sendMap(filteredBudget, geoJsonRequest);
        }
      } else {
        const message = {
          'tipo': 'Error: ',
          'message': ' Debes cargar el shape de nuevo',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      }
    }
  }

  protected requiresBudget(): boolean {
    return true;
  }

  protected sendMap(filteredBudget: any, geoJsonRequest) {
    this.cuencaVerdeService.sendMap(this.taskId, filteredBudget, geoJsonRequest)
      .then(() => this.onMapSent());
  }

  protected onMapSent() {
    this.tasksManager.clearObjects();
    this.proceduresManager.clearGeoJsonCache();
    const message = {
      'tipo': 'Mapa enviado ',
      'message': 'satisfactoriamente',
      'style': 'alert-success'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

  approveTask() {
    if (this.hasDocuments) {
      if (confirm('Confirmas la aprobación de la tarea?')) {
        this.onDoApproveTask();
      }
    } else {
      const message = {
        'tipo': 'Archivo Requerido: ',
        'message': ' Se necesita adjuntar la Ficha Predial antes de aprobar',
        'style': 'alert-warning'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
  }

  protected onDoApproveTask() {
    this.tasksManager.approveTask(this.taskId)
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
      }, errorMessage => {
        const message = {
          'tipo': 'Error: ',
          'message': ' ' + errorMessage,
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      });
  }

  protected getComments(): void {
    this.tasksManager.getAllComments(this.task)
      .then(comments => {
        if (comments instanceof Array) {
          this.comments = comments;
        }
      });
  }

  public insertComment(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        const objeto = {
          'task_id': id,
          'sub_type': this.task.sub_type.id,
          'comment': this.comment
        };
        if (objeto.comment !== '' && objeto.comment !== undefined) {
          this.tasksManager.insertComment(objeto)
            .then(response => {
              this.getComments();
              this.comment = '';
            });
        }
      });
  }

  protected getGeoJsonFromTaskId(component: any) {
    component.route.paramMap
      .switchMap((params: ParamMap) => component.tasksManager.getGeoJsonFromTaskId(+component.taskId + ''))
      .subscribe(geoJson => {
        component.handleMapGeoJsonResponse(geoJson, component);
      }, function (reason) {
        console.log(reason);
      });
  }

  protected handleMapGeoJsonResponse(geoJson: GeoJson, component: any) {
    if (geoJson.features) {
      delete geoJson.last_added_feature;
      delete geoJson.multi_line_string_features;
      delete geoJson.point_features;
      component.setUpFeatures(component, geoJson.features);
      component.addGeoJsonToMap(geoJson);
      component.loadCapaGestionPredial(geoJson);
      component.proceduresManager.addToCurrentGeoJsonList(geoJson);
    } else {
      component.onMapLoadError(component); //georgi fixed
    }
  }

  protected onMapLoadError(component: any) {
    const link = ['app/view-tasks/' + component.taskId];
    component.router.navigate(link);
    const message = {
      'tipo': 'El Mapa ',
      'message': ' no ha sido cargado',
      'style': 'alert-warning'
    };
    component.messagingService.publish(new BusMessage('alerta', message));
  }

  private setUpFeatures(component: any, features: Array<Feature>) {
    this.mapConventions = [];
    features.forEach(function (feature: Feature) {
      if (!feature.properties.hash) {
        feature.properties.hash = SHAUtils.getSha256(JSON.stringify(feature.geometry.coordinates));
      }
      component.actionsList.forEach(function (action: ActionData) {
        const actionName = action.action_name;
        let featureName = '';
        const isArea = action.action_type === 'area' && feature.properties.AREA_HA;
        if (isArea) {
          featureName = feature.properties.ACCIONES;
        } else if (action.action_type === 'accion' && feature.properties.LONGITUD_M) {
          featureName = feature.properties.ACCIONES;
          if (feature.properties.TIPO_ALAMB && feature.properties.POLIGONO) {
            feature.properties.TIPO_ALAMBRE = feature.properties.TIPO_ALAMB;
          }
          if (feature.properties.TIPO_ALAMBRE) {
            featureName = featureName + ' ' + feature.properties.TIPO_ALAMBRE;
          }
        } else if (action.action_type === 'punto' && feature.properties.ACCIONES_P) {
          featureName = feature.properties.ACCIONES_P;
        }
        if (featureName.length > 0) {
          if (component.isFeatureNameAndActionNameTheSame(featureName, actionName)) {
            feature.properties.AccionId = action.action_id;
            feature.properties.MaterialId = action.material_id;
            if (isArea) {
              feature.properties.FillColor = action.fill_color;
            } else {
              feature.properties.Color = action.color;
            }
          }
        }
      });
      let conventionName = feature.properties.ACCIONES + (feature.properties.TIPO_ALAMBRE && feature.properties.TIPO_ALAMBRE.length > 0 ? ' - ' + feature.properties.TIPO_ALAMBRE : '');
      if (feature.properties.ACCIONES_P) {
        conventionName = feature.properties.ACCIONES_P;
      }
      if (feature.properties.Area_inter >= 0 || feature.properties.ICA_NFS >= 0) {
        feature.properties.Color = component.getSamplingPointColor(feature.properties);
        conventionName = feature.properties.Interpreta ? feature.properties.Interpreta : feature.properties.Estado ? feature.properties.Estado : 'Punto de monitoreo';
      }
      let color = feature.properties.Color && feature.properties.Color.length > 0 ? feature.properties.Color : null;
      const fillColor = feature.properties.FillColor && feature.properties.FillColor.length > 0 ? feature.properties.FillColor : null;
      if (!color) {
        color = fillColor;
      }
      if (feature.properties.Color || feature.properties.FillColor) {
        component.mapConventions.push({
          isPoint: feature.geometry.type === 'Point',
          name: conventionName,
          color: color
        });
      } else {
        component.mapConventions.push({
          isPoint: false,
          name: 'La acción no existente en el sistema de información',
          color: '#000000'
        });
      }
      component.convertLineStringToMultiLineString(feature);
      component.checkIfFeatureComesFromMobile(feature);
      component.matchActionWithFeature(component, feature);
      component.mapConventions.push(component.getFeatureConvention(feature));
    });
    component.mapConventions = component.mapConventions.filter((convention: any, index: any, self: any) =>
      index === self.findIndex((c: any) => (
        c.place === convention.place && c.name === convention.name
      ))
    );
    component.mapConventions = component.mapConventions.filter(convention => convention.name.length > 0);
  }

  private getFeatureName(feature: Feature, action: ActionData) {
    let featureName = '';
    const isArea = action.action_type === 'area' && feature.properties.AREA_HA;
    if (isArea) {
      featureName = feature.properties.ACCIONES;
    } else if (action.action_type === 'accion' && feature.properties.LONGITUD_M) {
      featureName = feature.properties.ACCIONES;
      if (feature.properties.TIPO_ALAMB && feature.properties.POLIGONO) {
        feature.properties.TIPO_ALAMBRE = feature.properties.TIPO_ALAMB;
      }
      if (feature.properties.TIPO_ALAMBRE) {
        featureName = featureName + ' ' + feature.properties.TIPO_ALAMBRE;
      }
    } else if (action.action_type === 'punto' && feature.properties.ACCIONES_P) {
      featureName = feature.properties.ACCIONES_P;
    }
    return featureName;
  }

  private convertLineStringToMultiLineString(feature: Feature) {
    if (feature.geometry.type === MapHelper.LINE) {
      feature.geometry.type = MapHelper.MULTI_LINE;
      feature.geometry.coordinates = [feature.geometry.coordinates];
      feature.properties.feature_type = MapHelper.MULTI_LINE;
    }
  }

  private checkIfFeatureComesFromMobile(feature: Feature) {
    if (!feature.properties.hash) {
      feature.properties.hash = SHAUtils.getSha256(JSON.stringify(feature.geometry.coordinates));
    }
    const isActionFromMobile = !feature.properties.AREA_HA && !feature.properties.LONGITUD_M && !feature.properties.ACCIONES_P;
    if (isActionFromMobile) {
      if (!feature.properties.ACCIONES && feature.properties.Acciones) {
        feature.properties.ACCIONES = feature.properties.Acciones;
      }
      if (feature.properties.feature_type === MapHelper.MULTI_LINE || feature.properties.feature_type === MapHelper.LINE) {
        feature.properties.LONGITUD_M = feature.properties.SHAPE_Leng;
      } else if (feature.properties.feature_type === MapHelper.MULTI_POLYGON || feature.properties.feature_type === MapHelper.POLYGON) {
        feature.properties.AREA_HA = feature.properties.SHAPE_Area;
      } else if (feature.properties.feature_type === MapHelper.POINT) {
        feature.properties.ACCIONES_P = feature.properties.ACCIONES;
      }
      if (feature.properties.ACCIONES && feature.properties.ACCIONES.includes('pua')) {
        feature.properties.TIPO_ALAMBRE = 'Pua';
      } else if (feature.properties.ACCIONES && feature.properties.ACCIONES.includes('liso')) {
        feature.properties.TIPO_ALAMBRE = 'Liso';
      }
    } else {
      feature.properties.feature_type = feature.geometry.type;
    }
  }

  private matchActionWithFeature(component: any, feature: Feature) {
    component.actionsList.forEach(function (action: ActionData) {
      const isArea = action.action_type === 'area' && feature.properties.AREA_HA;
      const actionName = action.action_name;
      const featureName = component.getFeatureName(feature, action);
      if (featureName.length > 0) {
        if (component.isFeatureNameAndActionNameTheSame(featureName, actionName)) {
          feature.properties.AccionId = action.action_id;
          feature.properties.MaterialId = action.material_id;
          if (isArea) {
            feature.properties.FillColor = action.fill_color;
          } else {
            feature.properties.Color = action.color;
          }
        }
      }
    });
  }

  private getFeatureConvention(feature: Feature) {
    let conventionName = '';
    if (feature.properties.ACCIONES) {
      conventionName = feature.properties.ACCIONES.trim() + (feature.properties.TIPO_ALAMBRE && feature.properties.TIPO_ALAMBRE.length > 0 ? ' | alambre: ' + feature.properties.TIPO_ALAMBRE : '');
    }
    if (feature.properties.ACCIONES_P) {
      conventionName = feature.properties.ACCIONES_P;
    }
    let color = feature.properties.Color && feature.properties.Color.length > 0 ? feature.properties.Color : null;
    const fillColor = feature.properties.FillColor && feature.properties.FillColor.length > 0 ? feature.properties.FillColor : null;
    if (!color) {
      color = fillColor;
    }
    if (feature.properties.Color || feature.properties.FillColor) {
      return {
        isPoint: feature.geometry.type === 'Point',
        name: conventionName,
        color: color
      };
    } else {
      return {
        isPoint: false,
        name: 'La acción no existente en el sistema de información',
        color: '#000000'
      };
    }
  }

  private isFeatureNameAndActionNameTheSame(featureName: string, actionName: string): boolean {
    if (featureName && featureName.length > 0 && actionName && actionName.length > 0) {
      let featureNameTokens: Array<string> = featureName.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').toLowerCase()
        .replace(/\b(a|ante|de|desde|con|contra|para|por|segun|sin|sobre|bosque|alambre)\b/g, '')
        .replace('/[^a-z\d]+/i', '')
        .replace(/[()]/g, '')
        .split(' ');

      let actionNameTokens: Array<string> = actionName.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').toLowerCase()
        .replace(/\b(a|ante|de|desde|con|contra|para|por|segun|sin|sobre|bosque|alambre)\b/g, '')
        .replace('/[^a-z\d]+/i', '')
        .replace(/[()]/g, '')
        .split(' ');

      featureNameTokens = featureNameTokens.filter(word => word.length > 0).filter(this.onlyUnique);
      actionNameTokens = actionNameTokens.filter(word => word.length > 0).filter(this.onlyUnique);

      if (featureNameTokens.length > actionNameTokens.length) {
        return this.arrayContainsSmallerArrayElements(featureNameTokens, actionNameTokens);
      } else {
        return this.arrayContainsSmallerArrayElements(actionNameTokens, featureNameTokens);
      }
    } else {
      return false;
    }
  }

  private onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  private arrayContainsSmallerArrayElements(largeArray: Array<string>, smallerArray: Array<string>): boolean {
    let containedIn = 0;
    largeArray.forEach(function (largeArrayValue: string) {
      smallerArray.forEach(function (smallerArrayValue: string) {
        if (smallerArrayValue === largeArrayValue) {
          containedIn = containedIn + 1;
        }
      });
    });
    return containedIn === smallerArray.length;
  }

  private initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      mapTypeId: 'hybrid',
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    });
    this.bounds = new google.maps.LatLngBounds();
  }

  protected setViewInfo() {
    this.mapTitle = 'Predio' + this.task.potential_detail ? this.task.potential_detail.name : 'Medición';
    this.mapSubTitle = this.task.sub_type.name;

    if (this.task.process && this.task.process.type_process === 'hidrico') {
      this.mapTitle = this.task.process.name;
      this.mapSubTitle = 'Recurso hídrico';
    }
    if (this.task.process && this.task.process.type_process === 'erosion') {
      this.mapTitle = this.task.process.name;
      this.mapSubTitle = 'Proceso erosivo';
    }
    if (this.task.process && this.task.process.type_process === 'psa') {
      this.mapTitle = this.task.process.name;
      this.mapSubTitle = 'PSA';
    }
  }

  private getSamplingPointColor(properties: Properties) {
    if (properties.Interpreta) {
      switch (properties.Interpreta) {
        case 'Muy mala':
          return '#CC3232';
        case 'Mala':
          return '#DB7B2B';
        case 'Media':
          return '#E7B416';
        case 'Buena':
          return '#2DC937';
        case 'No aplica':
          return '#1E90FF';
        default:
          return '#FFFFFF';
      }
    } else if (properties.Estado) {
      switch (properties.Estado) {
        case 'Intervenido':
          return '#1E90FF';
        case 'No intervenido':
          return '#E7B416';
        default:
          return '#FFFFFF';
      }
    }
  }
}
