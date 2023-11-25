import {Component, OnInit, ViewChild} from '@angular/core';
import {BusMessage, MessagingService} from '../../data/services/messaging.service';
import {ContractorsManager} from '../../data/managers/contractors.manager';
import {ActivatedRoute, Router} from '@angular/router';
import {TasksManager} from '../../data/managers/tasks.manager';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {RolesManager} from '../../data/managers/roles.manager';
import {BaseComponent} from '../base-component/base-component';
import {CuencaVerdeService} from '../../data/services/cuenca-verde.service';
import {BrowserUtils} from '../../data/utils/browser.utils';
import {MapHelper} from '../map/MapHelper';
import GeoJson = geoJsonInterface.GeoJson;
import {ShapeFilesUploaderComponent} from '../shape-file-uploader/shape-files-uploader';


@Component({
  selector: 'app-load-shape-properties-component',
  templateUrl: './load-shape-properties.component.html'
})

export class LoadShapePropertiesComponent extends BaseComponent implements OnInit {

  public shapeFileUploader = 'shapeFileUploader';
  @ViewChild('shapeFileUploader') fileUploader: ShapeFilesUploaderComponent;

  constructor(protected proceduresManager: ProceduresManager,
              private messagingService: MessagingService,
              private cuencaS: CuencaVerdeService,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }
  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
  }

  onFilesUploaded(event: any): void {

    switch (event.id) {
      case 'shapeFileUploader':
        if (event.type === 'filesUploaded') {
          this.fileUploader.reset();
          const geoJson = event.payload.text();
          const geoJsonObject: GeoJson = <GeoJson> JSON.parse(geoJson);
          Object.assign(geoJsonObject, JSON.parse(event.payload.text()));

          this.tasksManager.loadZipShapeProperties(geoJsonObject)
            .then((response: any) => {
              const message = {
                'tipo': 'Gestión Almacenada ',
                'message': ' satisfactoriamente',
                'style': 'alert-success'
              };
              this.messagingService.publish(new BusMessage('alerta', message));
            }, error => {
              const message = {
                'tipo': 'Error ',
                'message': error,
                'style': 'alert-danger'
              };
              this.messagingService.publish(new BusMessage('alerta', message));
            });
        }
        break;
    }
  }

}
