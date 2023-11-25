import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base-component';
import { ProceduresManager } from '../../data/managers/procedures.manager';
import { GuardaCuenca } from '../../data/model/guarda-cuenca';
import { BusMessage, MessagingService } from '../../data/services/messaging.service';
import { CuencaVerdeService } from '../../data/services/cuenca-verde.service';
import { User } from '../../data/model/user';
import { RolesManager } from '../../data/managers/roles.manager';
import Role = roleInterface.Role;


@Component({
  selector: 'cuenca-guarda-cuencas',
  templateUrl: './guarda-cuencas.component.html',
  styleUrls: ['./guarda-cuencas.component.css']
})
export class GuardacuencasComponent extends BaseComponent implements OnInit, OnDestroy {
  public selectedGuardacuenca: GuardaCuenca;
  public modelGuarda: any = '0';
  public roles: Array<Role> = [];
  public users: Array<User> = [];

  public cuotas: Array<any> = [];

  constructor(protected cuencaVerdeServices: CuencaVerdeService,
    protected messagingService: MessagingService,
    protected proceduresManager: ProceduresManager,
    public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.selectedGuardacuenca = new GuardaCuenca();
    this.selectedGuardacuenca.monthlyQuota = [];
    this.getRoles()
      .then(this.getGuardacuencas);
  }

  ngOnDestroy() {
  }

  private getRoles(): Promise<any> {
    const component = this;
    return new Promise((resolve) => {
      this.rolesManager.getAllRoles()
        .then(roles => {
          this.roles = roles;
          resolve(component);
        });
    });
  }

  getGuardacuencas(component: any): void {
    const componente = this;
    component.proceduresManager.getUsers(component.GUARDACUENCA)
      .then((users: Array<User>) => {
        component.users = users.reverse();
        component.users.forEach(function (item: any) {
          component.quoteId(item.id);
        });
      });
  }

  public quoteId(id: string): void {
    this.cuencaVerdeServices.getGuardaCuencaMonthlyQuota(id)
      .then((response: any) => {
        this.selectedGuardacuenca.monthlyQuota[id] = response.quota;
      });
  }

  saveGuardaCuenca(idG: string) {
    if (this.validQuote(idG)) {

      this.cuencaVerdeServices.updateGuardaCuencaMonthlyQuota(idG, this.selectedGuardacuenca.monthlyQuota[idG])
        .then(() => {

          const message = {
            'tipo': 'Actualizada: ',
            'message': 'Cuota Mensual del GuardaCuencas actualizada Satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));

        });

    }
  }

  validQuote(idG: string) {

    if (String(this.selectedGuardacuenca.monthlyQuota[idG]) === '0' || this.selectedGuardacuenca.monthlyQuota[idG] === ''
      || this.selectedGuardacuenca.monthlyQuota[idG] === undefined ||
      this.selectedGuardacuenca.monthlyQuota[idG] === null) {



      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona la cuota para asignar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }
}
