import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';


@Component({
  selector: 'cuenca-survey-task',
  templateUrl: './survey-task.component.html',
  styleUrls: ['./survey-task.component.css']
})
export class SurveyTaskComponent extends BaseComponent implements OnInit {
  public survey: any;
  public fechaVisita: String;
  public tipoVert: String;
  public selectPerio: String;
  public horaVert: String;
  public lugarVert: String;
  public permisoVert: String;
  public permisoConc: String;
  public estadoTrat: String;
  public ultimoMant: String;


  public municipality: Array<any> = [];

  constructor(protected proceduresManager: ProceduresManager,
              private tasksManager: TasksManager,
              protected router: Router,
              protected cuencaServices: CuencaVerdeService,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getUserRoles(this);
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        if (id > 0) {
          this.tasksManager.getSurveyFromTaskId(String(id))
            .then((response: JSON) => {
              this.survey = response;

              this.tipoVert = '0';
              if (this.survey.shedding_characteristics.shedding_type.gathered) {
                this.tipoVert = '1';
              }
              if (this.survey.shedding_characteristics.shedding_type.distributed) {
                this.tipoVert = '2';
              }

              this.selectPerio = '0';
              if (this.survey.shedding_characteristics.shedding_periodicity.continuous) {
                this.tipoVert = '1';
              }
              if (this.survey.shedding_characteristics.shedding_periodicity.intermittent) {
                this.tipoVert = '2';
              }

              this.horaVert = '0';
              if (this.survey.shedding_characteristics.shedding_schedule.hours2) {
                this.horaVert = '1';
              }
              if (this.survey.shedding_characteristics.shedding_schedule.hours24_to12) {
                this.horaVert = '2';
              }
              if (this.survey.shedding_characteristics.shedding_schedule.hours_less_than12) {
                this.horaVert = '3';
              }

              this.lugarVert = '0';
              if (this.survey.shedding_characteristics.shedding_location.hydrological_source) {
                this.lugarVert = '1';
              }
              if (this.survey.shedding_characteristics.shedding_location.soil) {
                this.lugarVert = '2';
              }
              if (this.survey.shedding_characteristics.shedding_location.sewerage_system) {
                this.lugarVert = '3';
              }

              this.permisoVert = '0';
              if (this.survey.shedding_characteristics.shedding_licence.no) {
                this.permisoVert = '1';
              }
              if (this.survey.shedding_characteristics.shedding_licence.yes) {
                this.permisoVert = '2';
              }
              if (this.survey.shedding_characteristics.shedding_licence.in_process) {
                this.permisoVert = '3';
              }

              this.permisoConc = '0';
              if (this.survey.shedding_characteristics.water_concession.no) {
                this.permisoConc = '1';
              }
              if (this.survey.shedding_characteristics.water_concession.yes) {
                this.permisoConc = '2';
              }
              if (this.survey.shedding_characteristics.water_concession.in_process) {
                this.permisoConc = '3';
              }

              this.estadoTrat = '0';
              if (this.survey.shedding_characteristics.treatment_system_status.average) {
                this.estadoTrat = '1';
              }
              if (this.survey.shedding_characteristics.treatment_system_status.bad) {
                this.estadoTrat = '2';
              }
              if (this.survey.shedding_characteristics.treatment_system_status.good) {
                this.estadoTrat = '3';
              }

              this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = false;
              this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = false;
              this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = false;
              this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = true;
              this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = false;

              this.ultimoMant = '0';
              if (this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember) {
                this.ultimoMant = '1';
              }
              if (this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never) {
                this.ultimoMant = '2';
              }
              if (this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12) {
                this.ultimoMant = '3';
              }
              if (this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23) {
                this.ultimoMant = '4';
              }
              if (this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34) {
                this.ultimoMant = '5';
              }


              if (!this.survey.strategic_importance_of_the_property.psa) {
                this.survey.strategic_importance_of_the_property.psa = false;
              }

              if (!this.survey.municipality) {
                this.survey.municipality = '0';
              }

              if (this.survey.property_visit_date) {
                this.convertirSurveyFecha(
                  this.survey.property_visit_date.day,
                  this.survey.property_visit_date.month,
                  this.survey.property_visit_date.year
                );
              }
            });
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });

    this.getMunicipality();
  }

  private getMunicipality(): void {
      this.cuencaServices.getMunicipios()
        .then((mun: Array<any>) => {
          this.municipality = mun;
        });
  }

  private selectTipoVert(): void {
    if (this.tipoVert === '0') {
    this.survey.shedding_characteristics.shedding_type.gathered = false;
    this.survey.shedding_characteristics.shedding_type.distributed = false;
    }
    if (this.tipoVert === '1') {
      this.survey.shedding_characteristics.shedding_type.gathered = true;
      this.survey.shedding_characteristics.shedding_type.distributed = false;
    }
    if (this.tipoVert === '2') {
      this.survey.shedding_characteristics.shedding_type.gathered = false;
      this.survey.shedding_characteristics.shedding_type.distributed = true;
    }
  }

  private selectPeriocidad(): void {
    if (this.selectPerio === '0') {
      this.survey.shedding_characteristics.shedding_periodicity.continuous = false;
      this.survey.shedding_characteristics.shedding_periodicity.intermittent = false;
    }
    if (this.selectPerio === '1') {
      this.survey.shedding_characteristics.shedding_periodicity.continuous = true;
      this.survey.shedding_characteristics.shedding_periodicity.intermittent = false;
    }
    if (this.selectPerio === '2') {
      this.survey.shedding_characteristics.shedding_periodicity.continuous = false;
      this.survey.shedding_characteristics.shedding_periodicity.intermittent = true;
    }
  }

  private selectHoraVert(): void {
    if (this.selectPerio === '0') {
      this.survey.shedding_characteristics.shedding_schedule.hours2 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours24_to12 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours_less_than12 = false;
    }
    if (this.selectPerio === '1') {
      this.survey.shedding_characteristics.shedding_schedule.hours2 = true;
      this.survey.shedding_characteristics.shedding_schedule.hours24_to12 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours_less_than12 = false;
    }
    if (this.selectPerio === '2') {
      this.survey.shedding_characteristics.shedding_schedule.hours2 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours24_to12 = true;
      this.survey.shedding_characteristics.shedding_schedule.hours_less_than12 = false;
    }
    if (this.selectPerio === '3') {
      this.survey.shedding_characteristics.shedding_schedule.hours2 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours24_to12 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours_less_than12 = true;
    }
  }

  private selectLugarVert(): void {
    if (this.selectPerio === '0') {
      this.survey.shedding_characteristics.shedding_location.hydrological_source = false;
      this.survey.shedding_characteristics.shedding_location.soil = false;
      this.survey.shedding_characteristics.shedding_location.sewerage_system = false;
    }
    if (this.selectPerio === '1') {
      this.survey.shedding_characteristics.shedding_location.hydrological_source = true;
      this.survey.shedding_characteristics.shedding_location.soil = false;
      this.survey.shedding_characteristics.shedding_location.sewerage_system = false;
    }
    if (this.selectPerio === '2') {
      this.survey.shedding_characteristics.shedding_location.hydrological_source = false;
      this.survey.shedding_characteristics.shedding_location.soil = true;
      this.survey.shedding_characteristics.shedding_location.sewerage_system = false;
    }
    if (this.selectPerio === '3') {
      this.survey.shedding_characteristics.shedding_location.hydrological_source = false;
      this.survey.shedding_characteristics.shedding_location.soil = false;
      this.survey.shedding_characteristics.shedding_location.sewerage_system = true;
    }
  }

  private selectPermisoVert(): void {
    if (this.permisoVert === '0') {
      this.survey.shedding_characteristics.shedding_licence.no = false;
      this.survey.shedding_characteristics.shedding_licence.yes = false;
      this.survey.shedding_characteristics.shedding_licence.in_process = false;
    }
    if (this.permisoVert === '1') {
      this.survey.shedding_characteristics.shedding_licence.no = true;
      this.survey.shedding_characteristics.shedding_licence.yes = false;
      this.survey.shedding_characteristics.shedding_licence.in_process = false;
    }
    if (this.permisoVert === '2') {
      this.survey.shedding_characteristics.shedding_licence.no = false;
      this.survey.shedding_characteristics.shedding_licence.yes = true;
      this.survey.shedding_characteristics.shedding_licence.in_process = false;
    }
    if (this.permisoVert === '3') {
      this.survey.shedding_characteristics.shedding_licence.no = false;
      this.survey.shedding_characteristics.shedding_licence.yes = false;
      this.survey.shedding_characteristics.shedding_licence.in_process = true;
    }
  }

  private selectPermisoConc(): void {
    if (this.permisoConc === '0') {
      this.survey.shedding_characteristics.water_concession.no = false;
      this.survey.shedding_characteristics.water_concession.yes = false;
      this.survey.shedding_characteristics.water_concession.in_process = false;
    }
    if (this.permisoConc === '1') {
      this.survey.shedding_characteristics.water_concession.no = true;
      this.survey.shedding_characteristics.water_concession.yes = false;
      this.survey.shedding_characteristics.water_concession.in_process = false;
    }
    if (this.permisoConc === '2') {
      this.survey.shedding_characteristics.water_concession.no = false;
      this.survey.shedding_characteristics.water_concession.yes = true;
      this.survey.shedding_characteristics.water_concession.in_process = false;
    }
    if (this.permisoConc === '3') {
      this.survey.shedding_characteristics.water_concession.no = false;
      this.survey.shedding_characteristics.water_concession.yes = false;
      this.survey.shedding_characteristics.water_concession.in_process = true;
    }
  }

  private selectEstadoTrat(): void {
    if (this.estadoTrat === '0') {
      this.survey.shedding_characteristics.treatment_system_status.average = false;
      this.survey.shedding_characteristics.treatment_system_status.bad = false;
      this.survey.shedding_characteristics.treatment_system_status.good = false;
    }
    if (this.estadoTrat === '1') {
      this.survey.shedding_characteristics.treatment_system_status.average = true;
      this.survey.shedding_characteristics.treatment_system_status.bad = false;
      this.survey.shedding_characteristics.treatment_system_status.good = false;
    }
    if (this.estadoTrat === '2') {
      this.survey.shedding_characteristics.treatment_system_status.average = false;
      this.survey.shedding_characteristics.treatment_system_status.bad = true;
      this.survey.shedding_characteristics.treatment_system_status.good = false;
    }
    if (this.estadoTrat === '3') {
      this.survey.shedding_characteristics.treatment_system_status.average = false;
      this.survey.shedding_characteristics.treatment_system_status.bad = false;
      this.survey.shedding_characteristics.treatment_system_status.good = true;
    }
  }

  private selectUltMant(): void {

    if (this.estadoTrat === '0') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = false;
    }
    if (this.estadoTrat === '1') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = true;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = false;
    }
    if (this.estadoTrat === '2') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = true;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = false;
    }
    if (this.estadoTrat === '3') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = true;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = false;
    }
    if (this.estadoTrat === '4') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = true;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = false;
    }
    if (this.estadoTrat === '5') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = true;
    }
  }














  private convertirSurveyFecha(dia: String, mes: String, yy: String): void {
    let fechaFinal: String = '';
    let stringMes: String = '';
    /////MES
    switch (mes) {
      case '1':
        stringMes = 'Enero';
        break;
      case '2':
        stringMes = 'Febrero';
        break;
      case '3':
        stringMes = 'Marzo';
        break;
      case '4':
        stringMes = 'Abril';
        break;
      case '5':
        stringMes = 'Mayo';
        break;
      case '6':
        stringMes = 'Junio';
        break;
      case '7':
        stringMes = 'Julio';
        break;
      case '8':
        stringMes = 'Agosto';
        break;
      case '9':
        stringMes = 'Septiembre';
        break;
      case '10':
        stringMes = 'Octubre';
        break;
      case '11':
        stringMes = 'Noviembre';
        break;
      case '12':
        stringMes = 'Diciembre';
        break;
    }
    fechaFinal = dia + ' de ' + stringMes + ' del año ' + yy;
    this.fechaVisita = fechaFinal;
  }

  protected updateSurvey() {
      console.log(this.survey);
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
            label	{ font-size: 8px; margin-top: 10px }
            input::placeholder { font-size: 8px;}
            p:empty {
            }
            p:empty:after {
              content: " - ";
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
