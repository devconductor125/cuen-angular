import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {User} from '../../../../data/model/user';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, Router} from '@angular/router';
import {RolesManager} from '../../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import Role = roleInterface.Role;
import {Program} from '../../../../data/model/program';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';


@Component({
  selector: 'cuenca-register-program',
  templateUrl: './register-program.component.html',
  styleUrls: ['./register-program.component.css']
})

export class RegisterProgramComponent extends BaseComponent implements OnInit {

  public programRegister: Program = new Program();

  constructor(protected proceduresManager: ProceduresManager,
              private cuencaVeServices: CuencaVerdeService,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
  }

  public guardar(): void {
    if (this.isValidProgram()) {
      this.cuencaVeServices.createProgram(this.programRegister).then(
        (response) => {
          this.setMessageSuccess('Programa registrado', 'satisfactoriamente');
          this.router.navigate(['app/list-programs']);
        },
        (error) => {
          this.setMessageError('Error', error.statusText);
        }
      );
    }
  }

  protected isValidProgram(): boolean {
    if (!this.programRegister.name || this.programRegister.name.length === 0) {
      this.setMessageError('Error: ', 'Ingresa el nombre del programa');
      return false;
    }
    return true;
  }

  private setMessageSuccess(type: string, strMessage: string) {
    const message = {
      'tipo': type,
      'message': strMessage,
      'style': 'alert-success'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

  private setMessageError(type: string, strMessage: string) {
    const message = {
      'tipo': type,
      'message': strMessage,
      'style': 'alert-danger'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

}
