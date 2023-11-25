import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagingService} from '../../data/services/messaging.service';
import {Subscription} from 'rxjs/Subscription';
import {TasksManager} from '../../data/managers/tasks.manager';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {RolesManager} from '../../data/managers/roles.manager';
import {BaseComponent} from '../base-component/base-component';
import {Router} from '@angular/router';


@Component({
  selector: 'cuenca-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
  public alertaClase = 'alertNone';
  public message: any = {
    'title': '',
    'msg': '',
    'style': ''
  };
  protected messagingServiceSubscription: Subscription;

  constructor(protected proceduresManager: ProceduresManager,
              private mensaje: MessagingService,
              private router: Router,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingServiceSubscription = this.mensaje.getObservable().subscribe(message => {
      switch (message.getChannel()) {
        case 'alerta':
          const data = message.getData();
          this.message.title = data.tipo;
          this.message.msg = data.message;
          this.message.style = data.style;
          this.tAlerta(this.message.style);
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.messagingServiceSubscription.unsubscribe();
  }



  tAlerta(tipo: string): void {
    this.alertaClase = 'showAlert alert ' + tipo + '';
    const component = this;
    setTimeout(function () {
      component.alertaClase = 'notShowAlert alert ' + tipo;
    }, 5000);
  }

  dismissAlert(): void {
    this.alertaClase = 'notShowAlert alert ' + this.message.style;
  }
}
