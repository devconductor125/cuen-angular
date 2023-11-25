import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {AuthService} from '../../../data/services/auth.service';
import {SessionManager} from '../../../data/managers/session.manager';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Project} from '../../../data/model/project';
import {Program} from '../../../data/model/program';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {RoleClass} from '../../../data/model/RoleClass';


@Component({
  selector: 'cuenca-project-to-program',
  templateUrl: './project-to-program-component.html',
  styleUrls: ['./project-to-program-component.css']
})
export class ProjectToProgramComponent extends BaseComponent implements OnInit {

  @Input() public arrPrograms: Array<Program> = [];
  public idProgram: string;
  public idRol: string;


  @Input() public programName: string;

public listProjects: Array<Project> = [];
public listRols: Array<RoleClass> = [];
public project: Project = new Project();

  constructor(protected proceduresManager: ProceduresManager,
              private taskManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService,
              private cuencaVerdeService: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
    this.idProgram = '0';
    this.idRol = '0';
  }

  ngOnInit(): void {
  }

  public regProject(): void {

      if (this.validarRegistro()) {
        console.log(this.idProgram, this.project.name);
        this.cuencaVerdeService.createProjectWithProgram(this.idProgram, this.project.name).then(
          (response) => {
            this.router.navigate(['app/list-projects']);
          }
        );
      }
  }

  protected validarRegistro(): boolean {

    if (this.idProgram === '0') {
      this.setAlert('Error', 'Seleccione un programa', 'alert-danger');
      return false;
    }
    if (!this.project.name || this.project.name.length === 0) {
      this.setAlert('Error', 'Ingresa el nombre del proyecto', 'alert-danger');
      return false;
    }
    return true;
  }

  getProjects() {
    /*this.taskManager.getListProjects(this.programId).then((response: Array<Project>) => {
      if (response instanceof Array) {
        this.listProjects = response;
      } else {
        this.listProjects = [];
      }
    });*/
  }

  // insertar proyecto
   /*protected insertProject() {

    this.taskManager.insertProject(this.project, this.programId).then(response => {

            const message = {
              'tipo': 'Registro: ',
              'message': 'El proyecto se agregó satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));

          this.project = new Project();

          this.getProjects();
    }, function (reason: string) {

      const message = {
        'tipo': 'Error: ',
        'message': 'El proyecto no se pudo agregar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

    });

  }*/

  // borrar proyectos
  deleteProject(idProject: string): void {
    this.taskManager.deleteProject(idProject).then(response => {

      const message = {
        'tipo': 'Eliminado Satisfactoriamente: ',
        'message': 'Proyecto eliminado',
        'style': 'alert-success'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

      this.getProjects();
    }, function (reason: string) {

      const message = {
        'tipo': 'Error: ',
        'message': 'No se logró borrar el proyecto',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));

    });
  }

  private setAlert(type: string, strMessage: string, style: string) {
    const message = {
      'tipo': type,
      'message': strMessage,
      'style': style
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

}
