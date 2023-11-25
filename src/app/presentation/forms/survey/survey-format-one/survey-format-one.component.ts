import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../../data/managers/roles.manager';
import Property = propertyInterface.Property;
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {Globals} from '../../../../../globals';
import Contact = propertyInterface.Contact;

declare var $: any;


@Component({
  selector: 'cuenca-survey-format-one',
  templateUrl: './survey-format-one.component.html',
  styleUrls: ['./survey-format-one.component.css']
})
export class SurveyFormatOneComponent extends BaseComponent implements OnInit {


  @Input() public surveyID: string; ///idpredio

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
  public whoMantVar: String;

  public municipality: Array<any> = [];

  constructor(protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected cuencaServices: CuencaVerdeService,
              public rolesManager: RolesManager,
              public messagingService: MessagingService,
              protected activatedRoute: ActivatedRoute,
              private globals: Globals,
              private cd: ChangeDetectorRef) {
    super(proceduresManager, rolesManager);
  }

  @ViewChild('printEl') printEl: ElementRef;

  ngOnInit(): void {
    this.getUserRoles(this);

        if (this.surveyID) {
          this.getSurvey();
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }

    this.getMunicipality();
  }

  protected getSurvey(): void {
    this.tasksManager.getSurveyFromPredioId(String(this.surveyID))
      .then((response: any) => {
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
          this.selectPerio = '1';
        }
        if (this.survey.shedding_characteristics.shedding_periodicity.intermittent) {
          this.selectPerio = '2';
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


        this.whoMantVar = '0';
        if (this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.owner) {
          this.whoMantVar = '1';
        }
        if (this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.contractor) {
          this.whoMantVar = '2';
        }
        if (this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.other) {
          this.whoMantVar = '3';
        }
      });
  }

  private getMunicipality(): void {
      this.cuencaServices.getMunicipios()
        .then((mun: Array<any>) => {
          this.municipality = mun;
        });
  }


  private selectCaja(): void {

        this.survey.socio_economic_information.why_has_hasnt_family_compensation_fund = null;
        this.survey.socio_economic_information.family_compensation_fund_name = null;
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
    if (this.horaVert === '0') {
      this.survey.shedding_characteristics.shedding_schedule.hours24 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours24_to12 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours_less_than12 = false;
    }
    if (this.horaVert === '1') {
      this.survey.shedding_characteristics.shedding_schedule.hours24 = true;
      this.survey.shedding_characteristics.shedding_schedule.hours24_to12 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours_less_than12 = false;
    }
    if (this.horaVert === '2') {
      this.survey.shedding_characteristics.shedding_schedule.hours24 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours24_to12 = true;
      this.survey.shedding_characteristics.shedding_schedule.hours_less_than12 = false;
    }
    if (this.horaVert === '3') {
      this.survey.shedding_characteristics.shedding_schedule.hours24 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours24_to12 = false;
      this.survey.shedding_characteristics.shedding_schedule.hours_less_than12 = true;
    }
  }

  private selectLugarVert(): void {
    if (this.lugarVert === '0') {
      this.survey.shedding_characteristics.shedding_location.hydrological_source = false;
      this.survey.shedding_characteristics.shedding_location.soil = false;
      this.survey.shedding_characteristics.shedding_location.sewerage_system = false;
    }
    if (this.lugarVert === '1') {
      this.survey.shedding_characteristics.shedding_location.hydrological_source = true;
      this.survey.shedding_characteristics.shedding_location.soil = false;
      this.survey.shedding_characteristics.shedding_location.sewerage_system = false;
    }
    if (this.lugarVert === '2') {
      this.survey.shedding_characteristics.shedding_location.hydrological_source = false;
      this.survey.shedding_characteristics.shedding_location.soil = true;
      this.survey.shedding_characteristics.shedding_location.sewerage_system = false;
    }
    if (this.lugarVert === '3') {
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

    if (this.ultimoMant === '0') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = false;
    }
    if (this.ultimoMant === '1') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = true;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = false;
    }
    if (this.ultimoMant === '2') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = true;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = false;
    }
    if (this.ultimoMant === '3') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = true;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = false;
    }
    if (this.ultimoMant === '4') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = true;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = false;
    }
    if (this.ultimoMant === '5') {
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.cant_remember = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.never = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years12 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years23 = false;
      this.survey.shedding_characteristics.sewerage_system_last_maintenance_date.years34 = true;
    }
  }

  private whoMant(): void {
    if (this.whoMantVar === '0') {
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.owner = false;
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.contractor = false;
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.other = false;
    }
    if (this.whoMantVar === '1') {
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.owner = true;
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.contractor = false;
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.other = false;
    }
    if (this.whoMantVar === '2') {
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.owner = false;
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.contractor = true;
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.other = false;
    }
    if (this.whoMantVar === '3') {
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.owner = false;
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.contractor = false;
      this.survey.shedding_characteristics.who_does_the_sewerage_system_maintenance.other = true;
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

  protected addContact() {
    if (!this.survey.contacts) {
      this.survey.contacts = [];
    }
    this.survey.contacts.push(<Contact> {});
  }

  protected updateSurvey() {
    const objeto: any = {
      info_general: JSON.stringify(this.survey),
      form_letter: null,
      potential_id: this.surveyID
    };

    this.tasksManager.updateLetterOrSurvey(objeto)
      .then(response => {

        const message = {
          'tipo': '',
          'message': ' La Encuesta fue actualizada satisfactoriamente',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));

        this.getSurvey();

      }, error => {

        const message = {
          'tipo': 'Error ',
          'message': ' No se pudo actualizar la Encuesta',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));

      });
  }

  printDivSurvey(): void {
    $('#a-imprimir').printThis({
      loadCSS: '/assets/css/estilosPrint.css',
      debug: false,               // show the iframe for debugging
      importCSS: true,            // import page CSS
      importStyle: false,         // import style tags
      printContainer: true,       // grab outer container as well as the contents of the selector
      pageTitle: 'Módulo de impresión',              // add title to print page
      removeInline: false,        // remove all inline styles from print elements
      printDelay: 333,            // variable print delay
      header: null,               // prefix to html
      footer: null,               // postfix to html
      base: false ,               // preserve the BASE tag, or accept a string for the URL
      formValues: true,           // preserve input/form values
      canvas: false,              // copy canvas elements (experimental)
      removeScripts: false,       // remove script tags from print content
      copyTagClasses: false       // copy classes from the html & body tag
    });
  }

}
