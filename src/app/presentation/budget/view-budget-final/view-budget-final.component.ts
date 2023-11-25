import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {BaseComponent} from '../../base-component/base-component';
import {Procedure} from '../../../data/model/procedure';
import {RolesManager} from '../../../data/managers/roles.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {Budget} from '../../../data/model/budget';
import {AsignarAsociado} from '../../../data/model/asignarAsociado';
import {Program} from '../../../data/model/program';
import {Asociado} from '../../../data/model/asociado';

@Component({
  selector: 'cuenca-view-budget-contractor',
  templateUrl: './view-budget-final.component.html',
  styleUrls: ['./view-budget-final.component.css']
})
export class ViewBudgetFinalComponent extends BaseComponent implements OnInit {
  public procedureTypes: Array<Program> = [];
  public procedure: Procedure = new Procedure();
  public budgets: any;
  public subTotalAgreement = 0;
  public task_id: String; // process ID
  public task_id_task: String; // task ID
  public ListAsociados: Array<Asociado> = [];
  public selectAssociatedUno: any = '0';
  public selectAssociatedDos: any = '0';
  public selectAssociatedTres: any = '0';
  public montoUno: String;
  public montoDos: String;
  public montoTres: String;


  public listAsociadosPerProcess: any;
  public listOriginResources: any;

  public modelAsociados: Array<AsignarAsociado> = [];

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected router: Router,
              private tasksManager: TasksManager,
              public rolesManager: RolesManager,
              private activatedRoute: ActivatedRoute) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.loadProject();
    ///this.getAsociados();
    this.getAsociadosPerProcess();
    this.getOriginResources();
  }

  protected loadProject() {
    const component = this;

    this.activatedRoute.params.subscribe( params => this.task_id_task = params.idTask );

    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        component.task_id = idString;
        this.tasksManager.getBudgetFromProcessExecution(id)
          .then(function (budget: any) {

            component.budgets = budget;

            console.log(component.budgets);

          });
      });
  }

  public messageCreateTask($event: any): void {
    if ($event.payload === '1') {
      this.loadProject();
    }
  }

  public getPercent(percent: number, quantity: number): Number {
    return (quantity * percent) / 100;
  }

  public getAsociados() {
    return new Promise((resolve, reject) => {
      this.tasksManager.getAllAssociated()
        .then(assosiated => {
          if (assosiated instanceof Array) {
            this.ListAsociados = assosiated;
            console.log(this.ListAsociados);
          } else {
            this.ListAsociados = [];
          }
          resolve();
        });
    });
  }

  public addAporteUno(): void {

    if (this.selectAssociatedUno === '0' || !this.montoUno) {

      const message = {
        'tipo': 'Error: ',
        'message': 'Debe llenar todos los campos',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

    } else {

            const objeto = {
              value: this.montoUno.replace('.', ''),
              type_task: 1,
              associated_id: this.selectAssociatedUno.id,
              process_id: this.task_id,
              contribution_associated_id: this.selectAssociatedUno.contribution_associated_id
            };

            this.tasksManager.insertAssociatedPerProcess(objeto)
              .then(response => {
                this.montoUno = null;

                const message = {
                  'tipo': 'Registrado: ',
                  'message': 'Aporte del asociado registrado a la acción',
                  'style': 'alert-success'
                };
                this.messagingService.publish(new BusMessage('alerta', message));

                this.getOriginResources();

                this.selectAssociatedUno = '0';

              }, error => {

                const message = {
                  'tipo': 'Error: ',
                  'message': error,
                  'style': 'alert-danger'
                };
                this.messagingService.publish(new BusMessage('alerta', message));

              });

    }

  }

  public addAporteDos(): void {

    if (this.selectAssociatedDos === '0' || !this.montoDos) {

      const message = {
        'tipo': 'Error: ',
        'message': 'Debe llenar todos los campos',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

    } else {

      const objeto = {
        value: this.montoDos.replace('.', ''),
        type_task: 1,
        associated_id: this.selectAssociatedDos.id,
        process_id: this.task_id,
        contribution_associated_id: this.selectAssociatedDos.contribution_associated_id
      };

      this.tasksManager.insertAssociatedPerProcess(objeto)
        .then(response => {
          this.montoDos = null;

          const message = {
            'tipo': 'Registrado: ',
            'message': 'Aporte del asociado registrado a la acción',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));

          this.getOriginResources();

          this.selectAssociatedDos = '0';

        }, error => {

          const message = {
            'tipo': 'Error: ',
            'message': error,
            'style': 'alert-danger'
          };
          this.messagingService.publish(new BusMessage('alerta', message));

        });

    }

  }

  public addAporteTres(): void {

    if (this.selectAssociatedTres === '0' || !this.montoTres) {

      const message = {
        'tipo': 'Error: ',
        'message': 'Debe llenar todos los campos',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

    } else {

      const objeto = {
        value: this.montoTres.replace('.', ''),
        type_task: 1,
        associated_id: this.selectAssociatedTres.id,
        process_id: this.task_id,
        contribution_associated_id: this.selectAssociatedTres.contribution_associated_id
      };

      this.tasksManager.insertAssociatedPerProcess(objeto)
        .then(response => {
          this.montoTres = null;

          const message = {
            'tipo': 'Registrado: ',
            'message': 'Aporte del asociado registrado a la acción',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));

          this.getOriginResources();

          this.selectAssociatedTres = '0';

        }, error => {

          const message = {
            'tipo': 'Error: ',
            'message': error,
            'style': 'alert-danger'
          };
          this.messagingService.publish(new BusMessage('alerta', message));

        });

    }

  }

  public formatSpecific(data: any, id: number) {
    // decimal format
    const result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    //// this.datosCosto.coste = result;
    if (id === 1) {
      $('#montoUno').val(result);
    }

    if (id === 2) {
      $('#montoDos').val(result);
    }

    if (id === 3) {
      $('#montoTres').val(result);
    }

  }

  public getAsociadosPerProcess() {

      this.tasksManager.getAsociadosPerProcess(String(this.task_id))
        .then(response => {
            this.listAsociadosPerProcess = response;
          console.log(response);
        });

  }

  public getOriginResources() {

      this.tasksManager.getOriginResources(String(this.task_id))
        .then(response => {
            this.listOriginResources = response;
          console.log(response);
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
            div {
            font-size: 10px;
            }
            .Mostrar{
              display: none;
            }
            .title-bud {
              font-size: 12px;
              font-weight: bold;
            }
            .content-bud {
              font-size: 12px;
              font-weight: bold;
            }
            .content-bud-normal {
              font-size: 12px;
            }
            .content-bud-foot {
               font-size: 12px;
               font-weight: bold;
             }
            .total-foot {
              font-size: 14px;
              font-weight: bold;
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

  public asignarAsociados(): void {
    if (this.isValidSend()) {
      this.tasksManager.asignarAsociados(this.modelAsociados)
        .then((response: any) => {
          const message = {
            'tipo': 'Acciones Asignadas',
            'message': 'satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
        });
    }
  }

  protected isValidSend(): boolean {

    let continuar = true;
    this.modelAsociados.forEach(function (modelo) {
      if (continuar) {
        if (modelo.id_associated === '0') {
          continuar = false;
        }
      }
    });

    if (!continuar) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Faltó asignar un asociado a alguna acción',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }

    return true;
  }
}
