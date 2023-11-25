import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {User} from '../../../../data/model/user';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, Router} from '@angular/router';
import {RolesManager} from '../../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import Role = roleInterface.Role;
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';


@Component({
  selector: 'cuenca-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent extends BaseComponent implements OnInit {

  public userRegister: User = new User();
  public listRoles: Array<Role> = [];

  constructor(protected proceduresManager: ProceduresManager,
              private tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService,
              private cuencaVSercices: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
      this.userRegister.rol_id = '0';

      this.rolesManager.getAllRoles().then( response => {
        this.listRoles = response;
      });
  }

  public guardar(): void {
    if (this.isValidUser()) {
      this.cuencaVSercices.createUser(this.userRegister).then(
        (response) => {
          this.sendAlertSuccess('Usuario Registrado ', ' satisfactoriamente.');
          this.router.navigate(['app/list-user']);
        }
      ).catch(
        (error) => {
          this.sendAlertError('error', error);
      });
    }
  }

  protected isValidUser(): boolean {
    if (!this.userRegister.names || this.userRegister.names.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el nombre del usuario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.userRegister.last_names || this.userRegister.last_names.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el apellido del usuario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.userRegister.email || this.userRegister.email.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el email del usuario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.userRegister.rol_id === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el rol del usuario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

  private sendAlertSuccess(type: string, strMessage: string) {
    const message = {
      'tipo': type,
      'message': strMessage,
      'style': 'alert-success'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }
  private sendAlertError(type: string, strMessage: string) {
    const message = {
      'tipo': type,
      'message': strMessage,
      'style': 'alert-danger'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }
}
