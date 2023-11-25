import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';
import {User} from '../../../../data/model/user';
import Role = roleInterface.Role;
import {RolesManager} from '../../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';

@Component({
  selector: 'app-view-edit-user',
  templateUrl: './view-edit-user.component.html',
  styleUrls: ['./view-edit-user.component.scss']
})
export class ViewEditUserComponent implements OnInit {

  private idUser: string;
  public boolEdit: boolean;
  public dataUser: User = new User();
  public listRoles: Array<Role> = [];
  constructor(private activateRouter: ActivatedRoute,
              private cuenVServices: CuencaVerdeService,
              private rolesManager: RolesManager,
              public messagingService: MessagingService) {
    this.idUser = this.activateRouter.snapshot.params.id;
    this.boolEdit = false;
  }

  ngOnInit() {
    this.rolesManager.getAllRoles().then( response => {
      this.listRoles = response;
    });
    this.getDataUser();
  }

  private getDataUser() {
    this.cuenVServices.getUsersForAdmin(this.idUser).then(
      (response) => {
        this.dataUser = response;
        this.dataUser.rol_id = response.role.id;
      }
    );
  }

  public setVarEdit() {
    this.boolEdit = !this.boolEdit;
  }

  private isValidUser(): boolean {
    if (!this.dataUser.names || this.dataUser.names.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el nombre del usuario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.dataUser.last_names || this.dataUser.last_names.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el apellido del usuario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.dataUser.email || this.dataUser.email.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el email del usuario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.dataUser.rol_id === '0') {
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

  public update() {
    if (this.isValidUser()) {
      this.cuenVServices.updateUser(this.dataUser).then(
        (response) => {
          this.sendAlertSuccess('Usuario Actualizado ', ' satisfactoriamente.');
          this.dataUser.passRepeat = '';
          this.dataUser.pass = '';
          this.boolEdit = !this.boolEdit;
        }
      ).catch(
        (error) => {
          this.sendAlertError('error', error);
        }
      );
    }
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
