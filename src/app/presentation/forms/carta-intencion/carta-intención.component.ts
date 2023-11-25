import {BaseComponent} from '../../base-component/base-component';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {Globals} from '../../../../globals';

@Component({
  selector: 'cuenca-carta-intencion-component',
  templateUrl: './carta-intencion.component.html',
  styleUrls: ['./carta-intencion.component.css']
})

export class CartaIntencionComponent extends BaseComponent implements OnInit {
  public predio_id: string;
  public URL_IMG: string;
  public cartaIntencion: any;
  public datosCarta: any;
  public propertyVisitDay: any;

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

  ngOnInit(): void {
    this.getUserRoles(this);
    this.getCartaIntencion();
  }

  private getCartaIntencion(): void {
    this.URL_IMG = this.cuencaServices.API_URL_IMG;
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(id => {
        this.predio_id = id;
        this.tasksManager.getCartaIntencion(id)
          .then(cartaIntencion => {
            this.cartaIntencion = cartaIntencion;
            this.datosCarta = this.cartaIntencion;
            if (this.datosCarta.property_visit_date) {
              this.propertyVisitDay = this.datosCarta.property_visit_date.day + '/' +
                this.datosCarta.property_visit_date.month + '/'
                + this.datosCarta.property_visit_date.year;
            }
          });
      });
  }

  protected updateCarta() {
    const objeto: any = {
      info_general: null,
      form_letter: JSON.stringify(this.datosCarta),
      potential_id: this.predio_id
    };

    this.tasksManager.updateLetterOrSurvey(objeto)
      .then(response => {

        const message = {
          'tipo': '',
          'message': ' La carta de intención fue actualizada satisfactoriamente',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));

        this.getCartaIntencion();

      }, error => {

        const message = {
          'tipo': 'Error ',
          'message': ' No se pudo actualizar la carta de intención',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));

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
            font-size: 10px;
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
            body{
            font-size: 12px;
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
