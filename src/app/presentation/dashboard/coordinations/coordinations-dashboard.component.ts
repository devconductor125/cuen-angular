import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {BaseComponent} from '../../base-component/base-component';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BrowserUtils} from '../../../data/utils/browser.utils';
import {Router} from '@angular/router';

@Component({
  selector: 'cuenca-coordinations-dashboard',
  templateUrl: './coordinations-dashboard.component.html'
})

export class CoordinationsDashboardComponent extends BaseComponent implements OnInit {

  public arrTotals: any;
  constructor(protected proceduresManager: ProceduresManager,
              private messagingService: MessagingService,
              private cuencaS: CuencaVerdeService,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager,
              private router: Router) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getUserRoles(this);
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getTotalForCordinations();
  }

  // total del presupuesto por coordinacion
  protected getTotalForCordinations(): void {
    // total por coordinación
    this.tasksManager.getTotalForCordinations()
      .then((response: any) => {
        this.arrTotals = response;
      });
  }

  excelDos(): void {
    this.cuencaS.getExcelDos().then(response => {
      BrowserUtils.downloadExcelFromBlob(response);
    });
  }
}
