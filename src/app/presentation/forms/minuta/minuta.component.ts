import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import {MessagingService} from '../../../data/services/messaging.service';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {PropertyOwnership} from '../../../data/model/predio-ownership';

@Component({
  selector: 'cuenca-minuta-component',
  templateUrl: './minuta.component.html',
  styleUrls: ['./minuta.component.css']
})

export class MinutaComponent extends BaseComponent implements OnInit {

  public task_id: string;
  public URL_IMG: string;

  public formatoMinuta: any;
  public datosMinuta: any;
  public propertyOwnership: PropertyOwnership;
  public propertyOwnerSubjectText: string;
  public proposedAreas: {};
  public totalProposedAreas: number;
  public totalProposedAreasPercentage: number;
  public currentTime = new Date();

  public month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(protected proceduresManager: ProceduresManager,
              private tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService,
              protected cuencaService: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getMinuta();
    this.propertyOwnership = new PropertyOwnership();
    this.propertyOwnerSubjectText = 'INDICAR_PROPIETARIO_PROPIETARIA';
  }

  private getMinuta(): void {
    this.URL_IMG = this.cuencaService.API_URL_IMG;
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(id => {
        this.task_id = id;
        this.tasksManager.getMinuta(this.task_id)
          .then(formatoMinuta => {
            const proposedAreasData = formatoMinuta[0].conservation_area.filter(this.filterConservationArea);
            this.getProposedAreasObject(proposedAreasData);
            this.formatoMinuta = formatoMinuta[0];
            this.getPropertyOwnership(id);
          }, function () {
            console.log('Error');
          });
      });
  }

  private getProposedAreasObject(proposedAreasData: Array<any>): void {
    let totalAreas = 0;
    let totalAreasPercentage = 0;

    const nacimientosZones: any = {name: 'Zonas de Nacimientos'};
    const riberaZones: any = {name: 'Zonas de Ribera'};
    const laderaZones: any = {name: 'Zonas de Lareda'};

    const proposedAreasDataNacimientos = proposedAreasData.filter(proposedArea => proposedArea.action.includes('nacimiento'));
    const proposedAreasDataRibera = proposedAreasData.filter(proposedArea => proposedArea.action.includes('ribera'));
    const proposedAreasDataLadera = proposedAreasData.filter(proposedArea => proposedArea.action.includes('ladera'));

    let proposedAreasDataNacimientosArea = 0;
    proposedAreasDataNacimientos.forEach(function (data) {
      proposedAreasDataNacimientosArea = proposedAreasDataNacimientosArea + Number(data.area);
    });
    nacimientosZones.area = proposedAreasDataNacimientosArea;
    totalAreas = totalAreas + proposedAreasDataNacimientosArea;

    let proposedAreasDataRiberaArea = 0;
    proposedAreasDataRibera.forEach(function (data) {
      proposedAreasDataRiberaArea = proposedAreasDataRiberaArea + Number(data.area);
    });
    riberaZones.area = proposedAreasDataRiberaArea;
    totalAreas = totalAreas + proposedAreasDataRiberaArea;

    let proposedAreasDataLaderaArea = 0;
    proposedAreasDataLadera.forEach(function (data) {
      proposedAreasDataLaderaArea = proposedAreasDataLaderaArea + Number(data.area);
    });
    laderaZones.area = proposedAreasDataLaderaArea;
    totalAreas = totalAreas + proposedAreasDataLaderaArea;

    const proposedAreas = [];
    proposedAreas.push(nacimientosZones);
    proposedAreas.push(riberaZones);
    proposedAreas.push(laderaZones);

    proposedAreas.sort(this.sortProposedAreas);

    proposedAreas.forEach(function (proposedArea) {
      proposedArea.percentage = (proposedArea.area / totalAreas) * 100;
      totalAreasPercentage = totalAreasPercentage + proposedArea.percentage;
    });

    this.totalProposedAreas = totalAreas;
    this.totalProposedAreasPercentage = totalAreasPercentage;
    this.proposedAreas = proposedAreas;
  }

  private sortProposedAreas(areas1: any, areas2: any): number {
    if (areas1.area > areas2.area) {
      return 1;
    }
    if (areas1.area < areas2.area) {
      return -1;
    }
    return 0;
  }

  private filterConservationArea(conservationArea: any): any {
    return conservationArea.action.includes('ladera') || conservationArea.action.includes('ribera') || conservationArea.action.includes('nacimiento');
  }

  getTotalArea(): Number {
    let total: Number = 0;
    this.formatoMinuta.conservation_area.forEach((item: any) => {
      total = Number(total) + Number(item.area);
    });
    return total;
  }

  getTotalPercentage(): Number {
    let total: Number = 0;
    this.formatoMinuta.conservation_area.forEach((item: any) => {
      total = Number(total) + Number(item.percentage);
    });
    return total;
  }

  private getPropertyOwnership(taskId: string) {
    this.cuencaService.getPropertyOwnershipByTaskId(taskId)
      .then((propertyOwnership: PropertyOwnership) => {
        if (propertyOwnership.titleDeed) {
          this.propertyOwnership = propertyOwnership;
          this.propertyOwnerSubjectText = this.propertyOwnership.gender === 'male' ? 'EL PROPIETARIO' : 'LA PROPIETARIA';
        }
      });
  }

  printDiv(): void {
    let printContents, popupWin;
    printContents = document.getElementById('a-imprimir').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" +
          integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
          <title>Módulo de Impresión</title>
          <style>
          /*////// Estilos personalizados */
          @media print {
            .page-break	{ display: block; page-break-before: always; }
            .imprimir{
              padding: 0px 80px;
            }
            .title-header {
              font-weight: bold;
              font-size: 14px;
              margin-top: 10px;
              margin-bottom: 10px;
            }
            .parag{
              margin-bottom: 10px;
              text-align: justify;
              text-justify: inter-word;
            }
            table{
            padding: 50px;
            margin-top: 20px;
            margin-bottom: 20px;
            }
            th{
            text-align: center;
            font-weight: bold;
            border: solid 2px black;
            }
            td{
            text-align: left;
            border: solid 1px black;
            }
            .center{
            text-align: center;
            }
            .noborder td{
            border: solid 1px white;
            }
          }
          </style>
        </head>
    <body onload="window.print();window.close()">
              ${printContents}
              </body>
      </html>`
    );
    popupWin.document.close();
  }
}
