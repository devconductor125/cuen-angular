import {Component, OnInit, ViewChild} from '@angular/core';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {BaseComponent} from '../../base-component/base-component';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';

declare var $: any; //// meter funciones javascript

@Component({
  selector: 'app-view-list-details-budget-component',
  templateUrl: './view-list-details-budget.component.html'
})

export class ViewListDetailsBudgetComponent extends BaseComponent implements OnInit {

  public listDetails: Array<any> = [];
  public URL_BASE_FILES: string;
  public isCollapsed = false;
  public idFrom: string;
  public strDate: string;


  constructor(private router: Router,
              protected proceduresManager: ProceduresManager,
              private messagingService: MessagingService,
              protected tasksManager: TasksManager,
              protected cuencaServices: CuencaVerdeService,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getUserRoles(this);
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getListDetailsRegister();
  }

  getListDetailsRegister(): void {
    const componente = this;
    this.cuencaServices.getDetailsRegisterBudget()
      .then((list: Array<any>) => {
        if (list instanceof Array) {
          list.reverse();
          componente.listDetails = list;
        }
      });
  }

  public reasignData(data: any) {
    data.year = this.strDate;
    this.tasksManager.reasignDetailService(data, this.idFrom).then(
      (response) => {
        const message = {
          'tipo': 'Detalle reasignado ',
          'message': ' satisfactoriamente.',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        $('#modalDetails' + this.idFrom).modal('hide');
        this.getListDetailsRegister();
      },
      (error) => {
        console.log('error:::: ', error);
      }
    );
  }

  public setIdDeatil(idDetail: string, year: string) {
    this.idFrom = idDetail;
    this.strDate = year;
    console.log(this.idFrom, this.strDate);
  }

}
