import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {Categories} from '../../../../data/model/categories';
import {Program} from '../../../../data/model/program';
import {Project} from '../../../../data/model/project';
import {Activity} from '../../../../data/model/activity';


@Component({
  selector: 'cuenca-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})

export class ListProjectsComponent extends BaseComponent implements OnInit {

  public listProjects: Array<Project> = [];

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
    this.getListProjects();
  }
  private getListProjects(): void {
    this.taskManager.getListProjectsAll()
      .then((response: any) => {
        this.listProjects = response;
        console.log(this.listProjects);
      });
  }

}
