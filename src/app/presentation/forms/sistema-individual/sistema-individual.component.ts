import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import {MessagingService} from '../../../data/services/messaging.service';


@Component({
  selector: 'cuenca-sistema-individual',
  templateUrl: './sistema-individual.component.html',
  styleUrls: ['./sistema-individual.component.css']
})

export class SistemaIndividualComponent extends BaseComponent implements OnInit {

  public form_id: string;

  constructor(protected proceduresManager: ProceduresManager,
              private tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getProcess();
  }

  private getProcess(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(id => {
        this.form_id = id;
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
            .page-break	{ page-break-before: always; }
            .imprimir{
              padding: 0px 40px;
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
            .vertical-align {
              display: flex;
              align-items: center;
              horiz-align: center;
              text-align: center;
              margin-bottom: 15px;
            }
            .title_form{
              font-size: 10px;
              font-weight: bold;
              padding: 2px 4px;
              background-color: #c1d0dd;
            }
            .title_form_label{
              font-size: 8px;
              font-weight: bold;
              padding: 2px 4px;
              color: #585858;
            }
            .bordertable {
              border: solid 1px #000;
            }
            .table-inner{
              margin: 0px 0px;
            }
            .rightalign{
              text-align: right;
              font-size: 10px;
            }
            .title_form_d{
              font-size: 8px;
              font-weight: bold;
              padding: 2px 4px;
            }
            .title_form_notback{
              font-size: 12px;
              font-weight: bold;
              padding: 2px 4px;
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
