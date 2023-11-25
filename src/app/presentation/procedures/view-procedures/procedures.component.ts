import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {Procedure} from '../../../data/model/procedure';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {RolesManager} from '../../../data/managers/roles.manager';

@Component({
  selector: 'cuenca-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})

export class ProceduresComponent extends BaseComponent implements OnInit {
  public procedures: Array<Procedure>;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getUserRoles(this); // get roles
  }

  protected onGotRoles(): void {
    this.proceduresManager.loadAllObjects()
      .then(response => {
        if (this.isComunicaciones) {
          response = response.filter(procedure => procedure.type_process === 'comunicacion');
        } else {
          response = response.filter(procedure => procedure.type_process !== 'comunicacion');
        }
        this.procedures = response;
      });
  }

  // delete project
  deleteProject(procedure: Procedure): void {
    const component = this;
    this.shouldDelete(function () {
      component.proceduresManager.deleteObject(procedure)
        .then((success: boolean) => {
          if (success) {
            let i = component.procedures.length;
            while (i--) {
              if (component.procedures[i].id === procedure.id) {
                component.procedures.splice(i, 1);
              }
            }
          }
        });
    });
  }
}
