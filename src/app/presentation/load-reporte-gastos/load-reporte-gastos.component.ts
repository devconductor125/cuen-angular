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
import {Monitoreo} from '../../data/model/monitoreo';

declare var $: any; //// meter funciones javascript

@Component({
  selector: 'app-load-base-predio-component',
  templateUrl: './load-reporte-gastos.component.html'
})

export class LoadReporteGastosComponent extends BaseComponent implements OnInit {

  public lastReport: Array<any> = [];

  public centroCostosType1: Array<any> = [];
  public centroCostosType2: Array<any> = [];
  public centroCostosType3: Array<any> = [];
  public centroCostosType4: Array<any> = [];
  public centroCostosType5: Array<any> = [];

  public typeResponseData = '0';

  public responseCentros: any = null;

  public URL_BASE_FILES: string;
  public objetoFechas: any = {
    'from': null,
    'to': null
  };

  constructor(private router: Router,
              protected proceduresManager: ProceduresManager,
              private messagingService: MessagingService,
              private cuencaS: CuencaVerdeService,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getLastReport();
    this.URL_BASE_FILES = this.cuencaS.API_URL_FILES;
  }

  public setData(type: string) {
      this.typeResponseData = type;
  }

  onFilesUploaded(event: any): void {

    let message;

    switch (event.payload) {
      case '1':

        message = {
          'tipo': 'Exitoso',
          'message': 'El archivo se cargó satisfactoriamente',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));

        this.getLastReport();

        this.centroCostosType1 = [];
        this.centroCostosType2 = [];
        this.centroCostosType3 = [];
        this.centroCostosType4 = [];
        this.centroCostosType5 = [];
        this.typeResponseData = '0';

        break;
      case '2':

        message = {
          'tipo': 'Error',
          'message': 'El archivo no pudo ser cargado',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));

        break;
      default:
        break;
    }

  }

public getCentroDeCostos(): void {
    if (this.isValidTask()) {
      this.tasksManager.getCentroDeCostos(this.objetoFechas)
        .then((base: any) => {
          this.responseCentros = base;

          console.log(base);
          this.centroCostosType1 = base.type_1;
          this.centroCostosType2 = base.type_2;
          this.centroCostosType3 = base.type_3;
          this.centroCostosType4 = base.type_4;
          this.centroCostosType5 = base.type_5;

          console.log(this.centroCostosType1);
          console.log(this.centroCostosType2);
          console.log(this.centroCostosType3);
          console.log(this.centroCostosType4);
          console.log(this.centroCostosType5);
        });
    }
}

  protected isValidTask(): boolean {

      if (!this.objetoFechas.from) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Selecciona la fecha de inicio',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }

      if (!this.objetoFechas.to) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Selecciona la fecha final',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }

      return true;

  }

  public getLastReport(): void {
    this.tasksManager.getLastReport()
      .then((base: any) => {

          this.lastReport = [];
          this.lastReport.push(base);

      });
  }

  protected getFileContractorDownload(): void {
    this.cuencaS.getFileReporteCosto()
      .then(blob => {
        BrowserUtils.downloadReporteCostos(blob, 'Reporte CC');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}
