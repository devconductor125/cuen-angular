import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {PQRS} from '../../../data/model/pqrs';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';

@Component({
  selector: 'cuenca-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css']
})
export class PqrsComponent extends BaseComponent implements OnInit {
  public pqrsList: Array<PQRS>;

  constructor(protected proceduresManager: ProceduresManager,
              private messagingService: MessagingService,
              public rolesManager: RolesManager,
              private cuencaVerdeService: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getUserRoles(this);
  }

  protected onGotRoles(): void {
    this.cuencaVerdeService.getAllPqrs()
      .then((pqrsList: Array<PQRS>) => {
        this.pqrsList = pqrsList;
      })
      .catch();
  }
}
