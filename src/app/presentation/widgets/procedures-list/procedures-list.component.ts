import {Component, OnInit} from '@angular/core';
import {ProceduresComponent} from '../../procedures/view-procedures/procedures.component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {MessagingService} from '../../../data/services/messaging.service';
import {RolesManager} from '../../../data/managers/roles.manager';

@Component({
  selector: 'cuenca-procedures-list',
  templateUrl: './procedures-short-list.component.html',
  styleUrls: ['./procedures-list.component.css']
})
export class ProceduresListComponent extends ProceduresComponent implements OnInit {

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              public rolesManager: RolesManager) {
    super(messagingService, proceduresManager, rolesManager);
  }
}
