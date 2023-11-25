import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Procedure} from '../../../data/model/procedure';
import {RolesManager} from '../../../data/managers/roles.manager';
import {CreateProcedureComponent} from '../create-procedure/create-procedure.component';
import {Program} from '../../../data/model/program';
import {Project} from '../../../data/model/project';
import {Activity} from '../../../data/model/activity';

@Component({
  selector: 'cuenca-edit-procedure',
  templateUrl: './edit-procedure.component.html',
  styleUrls: ['./edit-procedure.component.css']
})
export class EditProcedureComponent extends CreateProcedureComponent implements OnInit {
  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected router: Router,
              public rolesManager: RolesManager,
              protected activatedRoute: ActivatedRoute) {
    super(messagingService, proceduresManager, router, rolesManager, activatedRoute);
  }

  protected onDataLoaded() {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        if (id > 0) {
          this.proceduresManager.getObjectForEdit(String(id))
            .then(object => {
              this.procedure = <Procedure> object;
              this.mapProcedureObjects();
            });
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });
  }

  private mapProcedureObjects() {
    const component = this;
    this.programs.forEach(function (program: Program) {
      component.procedure.programs.forEach(function (localProgram: Program) {
        if (localProgram.id === program.id) {
          program.selected = false; // This triggers the checkbox onChange
          component.getProjects(program);
        }
      });
    });
  }

  protected mapProjectObjects(projects: Array<Project>) {
    const component = this;
    projects.forEach(function (project: Project) {
      component.procedure.projects.forEach(function (localProject: Project) {
        if (localProject.id === project.id) {
          project.selected = false; // This triggers the checkbox onChange
          component.getActivities(project);
        }
      });
    });
  }

  protected mapProjectActivities(activities: Array<Activity>) {
    const component = this;
    activities.forEach(function (activity: Activity) {
      component.procedure.activities.forEach(function (localActivity: Activity) {
        if (Number(localActivity.id) === activity.id) {
          activity.selected = true; // This triggers the checkbox onChange
        }
      });
    });
  }

  updateProcedure(): void {
    this.setProcedureActivities();
    if (this.isValidProcedure(true)) {
      this.proceduresManager.update(this.procedure)
        .then(result => {
          if (result) {
            const message = {
              'tipo': 'Actualizado',
              'message': 'El procedimiento ha sido actualizado satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/procedures'];
            this.router.navigate(link);
          }
        });
    }
  }

  public generateProcedureName(): void {
  }
}
