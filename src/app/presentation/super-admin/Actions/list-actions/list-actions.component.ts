import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {ObjectActions} from '../../../../data/model/actions';


@Component({
  selector: 'cuenca-list-actions',
  templateUrl: './list-actions.component.html',
  styleUrls: ['./list-actions.component.css']
})

export class ListActionsComponent extends BaseComponent implements OnInit {

  public listActions: Array<ObjectActions> = [];

  constructor(protected proceduresManager: ProceduresManager,
              private tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getActionsAll();

  }

  public getActionsAll(): void {
    this.tasksManager.getActionsAll()
      .then((actions: any) => {
        this.listActions = actions;
      });
  }
}
