import {Component, OnInit, ViewChild} from '@angular/core';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {BaseComponent} from '../../base-component/base-component';
import {DetailsBudgets} from '../../../data/model/details-budgets';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';

declare var $: any; //// meter funciones javascript

@Component({
  selector: 'app-reasign-details-component',
  templateUrl: './reasign-details-budget.component.html'
})

export class ReasignDetailsBudgetComponent extends BaseComponent implements OnInit {

  public listActivitiesFinancialTemp: Array<any> = [];
  public listActivitiesFinancial: Array<any> = [];
  public listActionsFinancial: Array<any> = [];
  public listDetailsFinancial: Array<any> = [];
  public listAssociatedFinancial: Array<any> = [];

  public listProject: Array<any> = [];
  public listProgram: Array<any> = [];

  public idDetail: String;
  public detailData: any;

  public createDetail: DetailsBudgets = new DetailsBudgets();

  public boolEdit: boolean;

  constructor(private router: Router,
              private cuencaVerdeServices: CuencaVerdeService,
              protected proceduresManager: ProceduresManager,
              private messagingService: MessagingService,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager,
              private activatedRoute: ActivatedRoute) {
    super(proceduresManager, rolesManager);
    this.boolEdit = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.idDetail = params.id);
    this.getDetailBudgetFinancier();
  }

  public getDetailBudgetFinancier(): void {
    this.tasksManager.getDetailBudgetFinancier(this.idDetail)
      .then((response: any) => {
        this.detailData = response;
        this.formatSpecific2(this.detailData.inversion, 1);
      });
  }

  public formatSpecific2(data: any, id: number) {
    const result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    //// this.datosCosto.coste = result;
    if (id === 1) {
      this.detailData.inversion = result;
    }
    if (id === 2) {
      this.detailData.value_unit = result;
    }

  }

  public setVariableEdit() {
    this.boolEdit = !this.boolEdit;
  }

  public updateBudget() {
    this.cuencaVerdeServices.updateBudget(this.detailData).then(
      (response) => {
        const message = {
          'tipo': 'Contribución: ',
          'message': response.message,
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));

        this.boolEdit = !this.boolEdit;
      },
      (error) => {
        console.log('error ', error);
      }
    );
  }

}
