import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {RolesManager} from '../../../../data/managers/roles.manager';
import {GuardaCuenca} from '../../../../data/model/guarda-cuenca';
import {User} from '../../../../data/model/user';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Program} from '@angular/compiler-cli';

@Component({
  selector: 'cuenca-activities-register',
  templateUrl: './register-activities.component.html',
  styleUrls: ['./register-activities.component.css']
})

export class RegisterActivitiesComponent extends BaseComponent implements OnInit, OnDestroy {

  public idProject: string;

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
    this.messagingService.publish(new BusMessage('onRouteChanged', null));

    this.activatedRoute.paramMap
      .map((params: ParamMap) => params.get('id') + '')
      .subscribe(id => {
        if (id) {
          this.idProject = id;
          /// console.log(this.idExecution);
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });

  }

  ngOnDestroy() {
  }
}


