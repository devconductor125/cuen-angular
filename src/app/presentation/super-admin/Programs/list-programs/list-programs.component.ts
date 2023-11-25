import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {Program} from '../../../../data/model/program';



@Component({
  selector: 'cuenca-list-programs',
  templateUrl: './list-programs.component.html',
  styleUrls: ['./list-programs.component.css']
})

export class ListProgramsComponent extends BaseComponent implements OnInit {

  public listPrograms: Array<Program> = [];
  constructor(protected proceduresManager: ProceduresManager,
              private taskManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }
  ngOnInit(): void {
    this.getUserRoles(this);
    this.getListPrograms();
  }
  getListPrograms(): void {
    this.taskManager.getListPrograms()
      .then((response: any) => {
        this.listPrograms = response;
      });
  }

}
