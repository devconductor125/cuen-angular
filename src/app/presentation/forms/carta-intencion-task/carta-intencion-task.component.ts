

import {BaseComponent} from '../../base-component/base-component';
import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import {MessagingService} from '../../../data/services/messaging.service';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {CartaIntencion} from '../../../data/model/carta-intencion';

@Component({
  selector: 'cuenca-carta-intencion-component',
  templateUrl: './carta-intencion-task.component.html',
  styleUrls: ['./carta-intencion-task.component.css']
})

export class CartaIntencionTaskComponent extends BaseComponent implements OnInit {
  public task_id: string;
  public URL_IMG: string;
  public cartaIntencion: any;
  public datosCarta: any;

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
    this.getCartaIntencion();
  }

  private getCartaIntencion(): void {
    this.URL_IMG = this.cuencaService.API_URL_IMG;
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(id => {
        this.task_id = id;
        this.tasksManager.getCartaIntencion(id)
        .then(cartaIntencion => {
          this.cartaIntencion = cartaIntencion;
          this.datosCarta = JSON.parse(this.cartaIntencion.form_letter);
        });
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
