import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {User} from '../../../../data/model/user';


@Component({
  selector: 'cuenca-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent extends BaseComponent implements OnInit {

  public listUser: Array<User> = [];

  constructor(protected proceduresManager: ProceduresManager,
              private tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getListUser();
    this.getUserRoles(this);
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
  }

  getListUser(): void {
    this.tasksManager.getListUsers()
      .then((response: any) => {
        this.listUser = response;
      });
  }

}
