import {Component} from '@angular/core';
import {ParamMap} from '@angular/router';
import {MapComponent} from '../map/map.component';
import {BrowserUtils} from '../../data/utils/browser.utils';

declare let google: any;

@Component({
  selector: 'cuenca-open-task-map',
  templateUrl: '../map/map.component.html',
  styleUrls: ['../map/map.component.css']
})
export class OpenTaskMapComponent extends MapComponent {

  protected getTask(): Promise<any> {
    return new Promise((resolve) => {
      this.tasksManager.getTaskDetailsOpen(this.taskId)
        .then(task => {
          this.task = task;
          this.getHidricoErosivoFormData();
          resolve();
        }).catch(e => {
        console.log(e);
      });
    });
  }

  getGeoJsonFromTaskId(component: any): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.tasksManager.getGeoJsonFromOpenTaskId(+params.get('id') + ''))
      .subscribe(geoJson => {
        this.handleMapGeoJsonResponse(geoJson, component);
      }, function (reason) {
        console.log(reason);
      });
  }

  protected sendMap(filteredBudget: any, geoJsonRequest: any): void {
    this.cuencaVerdeService.sendMapOpenTask(this.taskId, geoJsonRequest)
      .then(() => this.onMapSent());
  }

  public onFeatureClicked(type: string, feature: any, event: any) {
    if (this.infoWindow != null) {
      this.infoWindow.close();
    }

    let actionName = (feature.properties.ACCIONES ? feature.properties.ACCIONES : 'N/A');
    if (feature.properties.ACCIONES_P) {
      actionName = feature.properties.ACCIONES_P;
    }

    let content = '';

    if (feature.properties.ICA_NFS && feature.properties.ICA_NFS >= 0) {
      content = '<div style="margin-top: 20px;">' +
        '<span style="font-weight: bold;">Clasificac: </span>' +
        feature.properties.Clasificac + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Embalse: </span>' +
        feature.properties.Embalse + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Fecha_Moni: </span>' +
        feature.properties.Fecha_Moni + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Fuente: </span>' +
        feature.properties.Fuente + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Fuente_Hid: </span>' +
        feature.properties.Fuente_Hid + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">ICA_NFS: </span>' +
        feature.properties.ICA_NFS + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">ID_Estacio: </span>' +
        feature.properties.ID_Estacio + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">ID_Predio: </span>' +
        feature.properties.ID_Predio + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Interpreta: </span>' +
        feature.properties.Interpreta + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Municipio: </span>' +
        feature.properties.Municipio + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Nombre: </span>' +
        feature.properties.Nombre + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Predio_aso: </span>' +
        feature.properties.Predio_aso + '<br /><br />' +
        '</div>';
    } else if (feature.properties.Area_inter) {
      content = '<div style="margin-top: 20px;">' +
        '<span style="font-weight: bold;">Altura__m_: </span>' +
        feature.properties.Altura__m_ + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Area_inter: </span>' +
        feature.properties.Area_inter + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Cuenca: </span>' +
        feature.properties.Cuenca + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Estado: </span>' +
        feature.properties.Estado + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Fecha: </span>' +
        feature.properties.Fecha + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Fecha_de_i: </span>' +
        feature.properties.Fecha_de_i + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Fuente_hid: </span>' +
        feature.properties.Fuente_hid + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Longitud__: </span>' +
        feature.properties.Longitud__ + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Municipio: </span>' +
        feature.properties.Municipio + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">Tipo_obra: </span>' +
        feature.properties.Tipo_obra + '<br /><br />' +
        '</div>';
    } else {
      content = '<div style="margin-top: 20px;">' +
        '<span style="font-weight: bold;">ACCIONES: </span>' +
        actionName + '<br /><br />' +
        '<span style="font-weight: bold; width: 300px">HASH: </span>' +
        feature.properties.hash + '<br /><br />' +
        '</div>';
    }

    this.infoWindow = new google.maps.InfoWindow({
      content: content,
      position: event.latLng
    });
    this.infoWindow.open(this.map);
    this.map.setCenter(event.latLng);
  }

  protected requiresBudget(): boolean {
    return false;
  }

  private getHidricoErosivoFormData() {
    this.cuencaVerdeService.getHidricoErosivoFormData(this.taskId)
      .then(formData => {
        if (formData && formData.length > 0) {
          this.formData = formData;
        }
      });
  }

  public downloadFormData(): void {
    this.formData.forEach(function (form: any) {
      for (let i = 0; i < form.images.length; i++) {
        const image = form.images[i];
        const fileName = i + '_' + form.form_hash;
        BrowserUtils.downloadAnyFromBase64(image, fileName, 'jpg', 'image/jpeg');
      }
    });
  }
}
