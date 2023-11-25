import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {RolesManager} from '../../../../data/managers/roles.manager';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Program} from '../../../../data/model/program';


@Component({
  selector: 'cuenca-project-register',
  templateUrl: './register-project.component.html',
  styleUrls: ['./register-project.component.css']
})

export class RegisterProjectComponent extends BaseComponent implements OnInit, OnDestroy {

  public arrPrograms: Array<Program> = [];
  constructor(protected cuencaVerdeServices: CuencaVerdeService,
              protected messagingService: MessagingService,
              protected taskManager: TasksManager,
              protected proceduresManager: ProceduresManager,
              public rolesManager: RolesManager,
              protected activatedRoute: ActivatedRoute,
              protected router: Router) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getAllPrograms();
  }

  ngOnDestroy() {
  }
  public getAllPrograms() {
    this.cuencaVerdeServices.getListPrograms().then(
      (response: Array<Program>) => {
        this.arrPrograms = response;
      }
    );
  }

}


