import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateTaskComponent} from '../../tasks/create-task/create-task.component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {Task} from '../../../data/model/task';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {RolesManager} from '../../../data/managers/roles.manager';


@Component({
  selector: 'cuenca-create-task-widget',
  templateUrl: './create-task-widget.component.html'
})
export class CreateTaskWidgetComponent extends CreateTaskComponent implements OnInit {

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              protected cuencaVerdeServices: CuencaVerdeService,
              public rolesManager: RolesManager) {
    super(messagingService, proceduresManager, tasksManager, router, activatedRoute, cuencaVerdeServices, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.task = {} as Task;
    this.getUserRoles(this);
  }

  public createTask(): void {
    if (this.isValidTask()) {

    }
  }
}
