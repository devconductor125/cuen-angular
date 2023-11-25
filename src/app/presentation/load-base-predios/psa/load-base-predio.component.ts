import {Component, OnInit} from '@angular/core';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Router} from '@angular/router';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {BaseComponent} from '../../base-component/base-component';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';

declare var $: any;

@Component({
  selector: 'app-load-base-predio-component',
  templateUrl: './load-base-predio.component.html'
})

export class LoadBasePredioComponent extends BaseComponent implements OnInit {

  public psaBase: any;
  public URL_BASE_FILES: string;

  constructor(private router: Router,
              protected proceduresManager: ProceduresManager,
              private messagingService: MessagingService,
              private cuencaS: CuencaVerdeService,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getBasePrediosDocument();
    this.URL_BASE_FILES = this.cuencaS.API_URL_FILES;
  }

  onFilesUploaded(event: any): void {

    let message;

    switch (event.payload) {
      case '1':

        message = {
          'tipo': 'Exitoso',
          'message': 'El archivo se cargó satisfactoriamente',
          'style': 'alert-success'
        };
        this.messagingService.publish(new BusMessage('alerta', message));

        this.getBasePrediosDocument();

        break;
      case '2':

        message = {
          'tipo': 'Error',
          'message': 'El archivo no pudo ser cargado',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));

        break;
      default:
        break;
    }

  }

  public getBasePrediosDocument(): void {
    this.tasksManager.getBasePrediosDocument('1')
      .then((base: any) => {
        this.psaBase = base;
      });
  }
}
