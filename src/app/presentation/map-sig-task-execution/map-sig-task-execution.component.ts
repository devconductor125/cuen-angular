import {Component} from '@angular/core';
import {MapComponent} from '../map/map.component';
import {ParamMap} from '@angular/router';

@Component({
  selector: 'cuenca-map-sig-task-execution',
  templateUrl: '../map/map.component.html',
  styleUrls: ['../map/map.component.css']
})
export class MapSigTaskExecutionComponent extends MapComponent {

  protected getTask(): Promise<any> {
    return new Promise((resolve) => {
      this.tasksManager.getExecutionTaskById(this.taskId)
        .then(task => {
          if (!task.sub_type) {
            task.sub_type = {
              id: task.sub_type_id,
              name: task.sub_type_name
            };
          }
          this.task = task;
          resolve();
        }).catch(e => {
        console.log(e);
      });
    });
  }

  getGeoJsonFromTaskId(component: any): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.tasksManager.getGeoJsonFromTaskIdExecution(+params.get('id') + ''))
      .subscribe(geoJson => {
        this.handleMapGeoJsonResponse(geoJson, component);
      }, function (reason) {
        console.log(reason);
      });
  }

  protected sendMap(filteredBudget: any, geoJsonRequest: any): void {
    this.cuencaVerdeService.sendMapTaskExecution(this.taskId, geoJsonRequest)
      .then(() => this.onMapSent());
  }


  protected setViewInfo(): void {
    this.mapTitle = 'Mapa de tarea de ejecución';
    this.mapSubTitle = this.task.sub_type.name;
  }
}
