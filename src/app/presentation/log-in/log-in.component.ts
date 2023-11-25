import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base-component/base-component';
import {LogIn} from '../../data/model/log-in';
import {Router} from '@angular/router';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {AuthService} from '../../data/services/auth.service';
import {CuencaVerdeService} from '../../data/services/cuenca-verde.service';
import {RolesManager} from '../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../data/services/messaging.service';

@Component({
  selector: 'cuenca-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent extends BaseComponent implements OnInit {
  public logIn: LogIn;

  constructor(private authService: AuthService,
              protected cuencaVerdeService: CuencaVerdeService,
              protected proceduresManager: ProceduresManager,
              private router: Router,
              public rolesManager: RolesManager,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.logIn = new LogIn();
    this.logIn.username = '';
    this.logIn.password = '';
    if (this.authService.isAuthenticated()) {
      const link = ['/app'];
      this.router.navigate(link);
    }
  }

  logInClick() {
    const component = this;
    if (!this.logIn.username || this.logIn.username.length === 0) {
      const message = {
        'tipo': 'Error',
        'message': 'No puede enviar el campo "Correo Electrónico" vacío',
        'style': 'alert-warning'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.logIn.password || this.logIn.password.length === 0) {
      const message = {
        'tipo': 'Error',
        'message': 'No puede enviar el campo "Clave" vacío',
        'style': 'alert-warning'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    this.authService.logIn(this.logIn)
      .then(() => {

        this.authService.initToken();
        this.cuencaVerdeService.initToken();
        this.goToDashboard();

      }, function (reason) {

        const message = {
          'tipo': 'Error',
          'message': 'Correo Electrónico o Clave incorrecta',
          'style': 'alert-danger'
        };
        component.messagingService.publish(new BusMessage('alerta', message));

      });
  }

  private goToDashboard(): void {
    const link = ['/app'];
    this.router.navigate(link);
  }
}
