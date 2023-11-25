import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {TasksManager} from '../../../data/managers/tasks.manager';

@Component({
  selector: 'cuenca-execution-task',
  templateUrl: './tareas-ejecucion.component.html',
  styleUrls: ['./tareas-ejecucion.component.css']
})

export class TareasEjecucionComponent extends BaseComponent implements OnInit, OnDestroy {
  public taskForExecution: Array<any> = [];

  constructor(protected cuencaVerdeServices: CuencaVerdeService,
              protected messagingService: MessagingService,
              protected taskManager: TasksManager,
              protected proceduresManager: ProceduresManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getUserRoles(this);
    this.messagingService.publish(new BusMessage('onRouteChanged', null));

    this.getExecutionTask();
  }

  ngOnDestroy() {
  }

  getExecutionTask(): void {
    this.taskManager.getExecutionTask()
      .then((response: any) => {
        this.taskForExecution = response.reverse();
      }, function (reason) {
        console.log(reason);
      });
  }
}
