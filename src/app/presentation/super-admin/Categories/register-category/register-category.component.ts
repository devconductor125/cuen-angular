import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {User} from '../../../../data/model/user';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, Router} from '@angular/router';
import {RolesManager} from '../../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import Role = roleInterface.Role;
import {Categories} from '../../../../data/model/categories';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';


@Component({
  selector: 'cuenca-register-user',
  templateUrl: './register-category.component.html',
  styleUrls: ['./register-category.component.css']
})

export class RegisterCategoryComponent extends BaseComponent implements OnInit {

  public categoryRegister: Categories = new Categories();
  public listRoles: Array<Role> = [];

  constructor(protected proceduresManager: ProceduresManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              private cuencaVeServices: CuencaVerdeService,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
  }

  public guardar(): void {
    if (this.isValidCategory()) {
      this.cuencaVeServices.createCategory(this.categoryRegister).then(
        (response) => {
          this.setMessageSuccess('Categoria registrada', 'satisfactoriamente.');
          this.router.navigate(['app/list-category']);
        }, (error) => {
          this.setMessageError('Error', error.statusText);
        });
    }
  }

  protected isValidCategory(): boolean {

    if (!this.categoryRegister.name || this.categoryRegister.name.length === 0) {
      this.setMessageError('Error ', 'Ingresa el nombre de la Categoría');
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
