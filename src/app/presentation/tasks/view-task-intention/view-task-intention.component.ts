import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {MapHelper} from '../../map/MapHelper';
import {BrowserUtils} from '../../../data/utils/browser.utils';
import {Task} from '../../../data/model/task';
import {GeoJsonService} from '../../../data/services/geo-json.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BaseComponent} from '../../base-component/base-component';
import {User} from '../../../data/model/user';
import GeoJson = geoJsonInterface.GeoJson;
import Property = propertyInterface.Property;
import Comments = commentsInterface.Comments;
import Documents = documentsInterface.Documents;
import Role = roleInterface.Role;

@Component({
  selector: 'cuenca-view-task-intention',
  templateUrl: './view-task-intention.component.html',
  styleUrls: ['./view-task-intention.component.css']
})
export class ViewTaskIntentionComponent extends BaseComponent implements OnInit {
  public task: any;

  public cartaIntencionData: any;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              private geoJsonService: GeoJsonService,
              public rolesManager: RolesManager,
              protected cuencaService: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getUserRoles(this);
    this.messagingService.publish(new BusMessage('onRouteChanged', null));

    this.getTask();
  }

  public getTask(): void {
    const componente = this;
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        if (id > 0) {
          this.tasksManager.getCartaIntencion(String(id))
            .then(task => {
              this.task = task;
              console.log(this.task);
              this.checkCartaIntencion();
            }, function () {
              const link = ['/app'];
              componente.router.navigate(link);
            });
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });
  }

  public checkCartaIntencion(): void {
    this.tasksManager.getCartaIntencion(this.task.id)
      .then((response: any) => {
        this.cartaIntencionData = response;
      });
  }
}
