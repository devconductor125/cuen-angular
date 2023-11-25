import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import * as Chart from 'chart.js';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {MessagingService} from '../../../data/services/messaging.service';
import {BaseComponent} from '../../base-component/base-component';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'cuenca-reports-management',
  templateUrl: './reports-management.component.html',
  styleUrls: ['../reports.component.css']
})
export class ReportsManagementComponent extends BaseComponent implements OnInit {

  public dataReportGerencial: any;
  public inversionLineaLabel: Array<any> = [];
  public inversionLineaData: Array<any> = [];
  public inversionLineaColor: Array<any> = [];
  public inversionMunicipios: Array<any> = [];
  public colors: Array<any> = [
    'rgba(47, 79, 79, 1)',
    'rgba(0, 206, 209, 1)',
    'rgba(148, 0, 211, 1)',
    'rgba(255, 20, 147, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(105, 105, 105, 1)',
    'rgba(105, 105, 105, 1)',
    'rgba(30, 144, 255, 1)',
    'rgba(178, 34, 34, 1)',
    'rgba(255, 250, 240, 1)',
    'rgba(34, 139, 34, 1)',
    'rgba(255, 0, 255, 1)',
    'rgba(220, 220, 220, 1)',
    'rgba(248, 248, 255, 1)',
    'rgba(255, 215, 0, 1)',
    'rgba(218, 165, 32, 1)',
    'rgba(128, 128, 128, 1)',
    'rgba(0, 128, 0, 1)',
    'rgba(173, 255, 47, 1)',
    'rgba(128, 128, 128, 1)',
    'rgba(240, 255, 240, 1)',
    'rgba(255, 105, 180, 1)',
    'rgba(205, 92, 92, 1)',
    'rgba(75, 0, 130, 1)',
    'rgba(255, 255, 240, 1)',
    'rgba(240, 230, 140, 1)',
    'rgba(230, 230, 250, 1)',
    'rgba(255, 240, 245, 1)',
    'rgba(124, 252, 0, 1)',
    'rgba(255, 250, 205, 1)',
    'rgba(173, 216, 230, 1)',
    'rgba(240, 128, 128, 1)',
    'rgba(224, 255, 255, 1)',
    'rgba(250, 250, 210, 1)',
    'rgba(211, 211, 211, 1)',
    'rgba(144, 238, 144, 1)',
    'rgba(211, 211, 211, 1)',
    'rgba(255, 182, 193, 1)',
    'rgba(255, 160, 122, 1)',
    'rgba(32, 178, 170, 1)',
    'rgba(135, 206, 250, 1)',
    'rgba(119, 136, 153, 1)',
    'rgba(119, 136, 153, 1)',
    'rgba(176, 196, 222, 1)',
    'rgba(255, 255, 224, 1)',
    'rgba(0, 255, 0, 1)',
    'rgba(50, 205, 50, 1)',
    'rgba(250, 240, 230, 1)',
    'rgba(255, 0, 255, 1)',
    'rgba(128, 0, 0, 1)',
    'rgba(102, 205, 170, 1)',
    'rgba(0, 0, 205, 1)',
    'rgba(186, 85, 211, 1)',
    'rgba(147, 112, 219, 1)',
    'rgba(60, 179, 113, 1)',
    'rgba(123, 104, 238, 1)',
    'rgba(0, 250, 154, 1)',
    'rgba(72, 209, 204, 1)',
    'rgba(199, 21, 133, 1)',
    'rgba(25, 25, 112, 1)',
    'rgba(245, 255, 250, 1)',
    'rgba(255, 228, 225, 1)',
    'rgba(255, 228, 181, 1)',
    'rgba(255, 222, 173, 1)',
    'rgba(0, 0, 128, 1)',
    'rgba(253, 245, 230, 1)',
    'rgba(128, 128, 0, 1)',
    'rgba(107, 142, 35, 1)',
    'rgba(255, 165, 0, 1)',
    'rgba(255, 69, 0, 1)',
    'rgba(218, 112, 214, 1)',
    'rgba(238, 232, 170, 1)',
    'rgba(152, 251, 152, 1)',
    'rgba(175, 238, 238, 1)',
    'rgba(219, 112, 147, 1)',
    'rgba(255, 239, 213, 1)',
    'rgba(255, 218, 185, 1)',
    'rgba(205, 133, 63, 1)',
    'rgba(255, 192, 203, 1)',
    'rgba(221, 160, 221, 1)',
    'rgba(176, 224, 230, 1)',
    'rgba(255, 0, 0, 1)',
    'rgba(188, 143, 143, 1)',
    'rgba(65, 105, 225, 1)',
    'rgba(139, 69, 19, 1)',
    'rgba(250, 128, 114, 1)',
    'rgba(244, 164, 96, 1)',
    'rgba(46, 139, 87, 1)',
    'rgba(255, 245, 238, 1)',
    'rgba(160, 82, 45, 1)',
    'rgba(192, 192, 192, 1)',
    'rgba(135, 206, 235, 1)',
    'rgba(106, 90, 205, 1)',
    'rgba(112, 128, 144, 1)',
    'rgba(112, 128, 144, 1)',
    'rgba(255, 250, 250, 1)',
    'rgba(0, 255, 127, 1)',
    'rgba(210, 180, 140, 1)',
    'rgba(0, 128, 128, 1)',
    'rgba(216, 191, 216, 1)',
    'rgba(255, 99, 71, 1)',
    'rgba(0, 0, 0, 0)',
    'rgba(64, 224, 208, 1)',
    'rgba(238, 130, 238, 1)',
    'rgba(245, 222, 179, 1)',
    'rgba(255, 255, 255, 1)',
    'rgba(245, 245, 245, 1)',
    'rgba(255, 255, 0, 1)',
    'rgba(154, 205, 50, 1)',
    'rgba(102, 51, 153, 1)'
  ];

  constructor(protected cuencaVerdeServices: CuencaVerdeService,
              protected messagingService: MessagingService,
              protected taskManager: TasksManager,
              protected proceduresManager: ProceduresManager,
              public rolesManager: RolesManager,
              protected activatedRoute: ActivatedRoute,
              protected router: Router,
              protected ref: ChangeDetectorRef) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getDataReport();
  }

  getData(): void {
    // DATOS PERSONAL
    const dataPersonal = {
      datasets: [{
        // data: [this.dataReport.Corporacion_CuencaVerde.data_num.personas_empleadas, this.dataReport.Corporacion_CuencaVerde.data_num.personas_prestacion_servicio, this.dataReport.Corporacion_CuencaVerde.data_num.personas_vinculadas],
        data: [
          this.dataReportGerencial['corporacion_cuencaverde']['data_num']['personas_empleadas'],
          this.dataReportGerencial['corporacion_cuencaverde']['data_num']['personas_prestacion_servicio'],
          this.dataReportGerencial['corporacion_cuencaverde']['data_num']['personas_vinculadas'],
        ],
        backgroundColor: [
          'rgba(12, 238, 130, 1)',
          'rgba(65, 125, 209, 1)',
          'rgba(245, 166, 35, 1)',
        ],
        borderWidth: 0,
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Empleadas',
        'Prestacion de Servicios',
        'Vinculadas',
      ]

    };

    const ctx1 = document.getElementById('doughnutPeople');
    const myChart1 = new Chart(ctx1, {
      type: 'doughnut',
      data: dataPersonal,
      options: {
        legend: {
          display: false
        },
      }
    });
    // DATOS GENERO
    const dataGenre = {
      datasets: [{
        // data: [this.dataReport.Corporacion_CuencaVerde.data_num.porcentaje_hombres, this.dataReport.Corporacion_CuencaVerde.data_num.porcentaje_mujeres],
        data: [
          this.dataReportGerencial['corporacion_cuencaverde']['data_num']['porcentaje_hombres'],
          this.dataReportGerencial['corporacion_cuencaverde']['data_num']['porcentaje_mujeres']
        ],
        backgroundColor: [
          'rgba(12, 238, 130, 1)',
          'rgba(65, 125, 209, 1)',
        ],
        borderWidth: 0,
        afterTitle: '%',

      }],
      labels: [
        'Procentaje hombres', 'Procentaje mujeres'
      ]
    };

    const ctx2 = document.getElementById('doughnutGenre');
    const myChart2 = new Chart(ctx2, {
      type: 'doughnut',
      data: dataGenre,
      options: {
        legend: {
          display: false
        },
      }
    });
    // DATOS INVERSIONES
    const dataInvestment = {
      datasets: [{
        data: this.inversionLineaData,
        backgroundColor: this.inversionLineaColor,
        borderWidth: 0,
        afterTitle: '$ ',

      }],
      labels: this.inversionLineaLabel
    };
    const ctx3 = document.getElementById('doughnutInvestment');
    const myChart3 = new Chart(ctx3, {
      type: 'doughnut',
      data: dataInvestment,
      options: {
        legend: {
          display: false
        },
      }
    });
    // DATOS HECTAREAS DE CONSERVACION
    const dataConservation = {
      datasets: [{
        data: [
          this.dataReportGerencial['estrategias_de_conservacion']['hectareas_de_conservacion']['rsc_lusitania'],
          this.dataReportGerencial['estrategias_de_conservacion']['hectareas_de_conservacion']['pago_por_servicios_ambientales'],
          this.dataReportGerencial['estrategias_de_conservacion']['hectareas_de_conservacion']['acuerdos_de_intervencion']
        ],
        backgroundColor: [
          'rgba(12, 238, 130, 1)',
          'rgba(65, 125, 209, 1)',
          'rgba(245, 166, 35, 1)',
        ],
        borderWidth: 0,
        afterTitle: '%',


      }],
      labels: [
        'RSC Lusitania', 'Pago por servicios ambientales', 'Acuerdos de intervencion'
      ]
    };
    const ctx4 = document.getElementById('pieConservation');
    const myChart4 = new Chart(ctx4, {
      type: 'pie',
      data: dataConservation,
      options: {
        legend: {
          display: false
        },
      }
    });

    // DATOS LOGROS DE GESTION PREDIAL
    const dataAchievments = {
      datasets: [{
        data: [
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial']['hectareas_impactadas'],
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial']['hectareas_intervenidas'],
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial']['hectareas_de_bosque'],
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial']['hectareas_de_bosque_protegido']
        ],
        backgroundColor: [
          'rgba(12, 238, 130, 1)',
          'rgba(65, 125, 209, 1)',
          'rgba(245, 166, 35, 1)',
          'rgba(121, 185, 230, 1)',
        ],
        borderWidth: 0,

      }],
      labels: [
        'Hectareas impactadas', 'Hectareas intervenidas', 'Hectareas de Bosque restaurado', 'Hectareas de Bosque Ribera Protegido'
      ]
    };
    const ctx5 = document.getElementById('doughnutAchievments');
    const myChart5 = new Chart(ctx5, {
      type: 'doughnut',
      data: dataAchievments,
      options: {
        legend: {
          display: false
        },
      }
    });

    // DATOS LOGROS DE RIO GRANDE II
    const dataRioGrande = {
      datasets: [{
        data: [
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial_rio_grande']['hectareas_impactadas'],
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial_rio_grande']['hectareas_intervenidas'],
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial_rio_grande']['hectareas_de_bosque'],
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial_rio_grande']['hectareas_de_bosque_protegido']
        ],
        backgroundColor: [
          'rgba(12, 238, 130, 1)',
          'rgba(65, 125, 209, 1)',
          'rgba(245, 166, 35, 1)',
          'rgba(121, 185, 230, 1)',
        ],
        borderWidth: 0,

      }],
      labels: [
        'Hectareas impactadas', 'Hectareas intervenidas', 'Hectareas de Bosque restaurado', 'Hectareas de Bosque Ribera Protegido'
      ]
    };
    const ctx6 = document.getElementById('doughnutRioGrandeII');
    const myChart6 = new Chart(ctx6, {
      type: 'doughnut',
      data: dataRioGrande,
      options: {
        legend: {
          display: false
        },
      }
    });

    // DATOS LOGROS DE LA FE
    const dataLaFe = {
      datasets: [{
        data: [
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial_la_fe']['hectareas_impactadas'],
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial_la_fe']['hectareas_intervenidas'],
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial_la_fe']['hectareas_de_bosque'],
          this.dataReportGerencial['estrategias_de_conservacion']['logro_gestion_predial_la_fe']['hectareas_de_bosque_protegido']
        ],
        backgroundColor: [
          'rgba(12, 238, 130, 1)',
          'rgba(65, 125, 209, 1)',
          'rgba(245, 166, 35, 1)',
          'rgba(121, 185, 230, 1)'
        ],
        borderWidth: 0,

      }],
      labels: [
        'Hectareas impactadas', 'Hectareas intervenidas', 'Hectareas de Bosque restaurado', 'Hectareas de Bosque Ribera Protegido'
      ]
    };
    const ctx7 = document.getElementById('doughnutLaFe');
    const myChart7 = new Chart(ctx7, {
      type: 'doughnut',
      data: dataLaFe,
      options: {
        legend: {
          display: false
        },
      }
    });

    // DATOS GESTION RECURSO HIDRICO SANEAMIENTO BASICO INTEGRAL
    const dataSaneamientoBasico = {
      datasets: [{
        data: [
          10,
          5
        ],
        backgroundColor: [
          'rgba(12, 238, 130, 1)',
          'rgba(65, 125, 209, 1)'
        ],
        borderWidth: 0,

      }],
      labels: [
        'Mantenimiento STARD', 'Instalación STARD'
      ]
    };
    const ctx8 = document.getElementById('doughnutSaneamientoBasico');
    const myChart8 = new Chart(ctx8, {
      type: 'bar',
      data: dataSaneamientoBasico,
      options: {
        legend: {
          display: false
        },
      }
    });

  }

  private getDataReport(): void {
    this.taskManager.getDataReportGerencial()
      .then(data => {
        this.dataReportGerencial = data;
        this.dataReportGerencial.corporacion_cuencaverde.inversion_por_asociado = this.dataReportGerencial.corporacion_cuencaverde.inversion_por_asociado.filter((inversion: any) => Number(inversion.inversion) > 0);

        let cont = 0;
        this.dataReportGerencial.corporacion_cuencaverde.inversion_por_linea.forEach((linea: any) => {
          this.inversionLineaLabel.push(linea.name);
          this.inversionLineaData.push(linea.inversion);
          this.inversionLineaColor.push(this.colors[cont]);
          cont ++;
        });

        const componente = this;
        Object.keys(this.dataReportGerencial.gestion_por_municipio).forEach(function(k){
          const objetoData = {
            'name': k,
            'data': componente.dataReportGerencial.gestion_por_municipio[k]
          };
          componente.inversionMunicipios.push(objetoData);
        });
        this.getData();
      });
  }
}

