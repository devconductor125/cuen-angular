import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {ContractorsManager} from '../../../data/managers/contractors.manager';
import {ActivatedRoute, Router} from '@angular/router';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';

declare var $: any;

@Component({
  selector: 'cuenca-list-predios',
  templateUrl: './list-predios.component.html',
  styleUrls: ['./list-predios.component.css']
})
export class ListPrediosComponent extends BaseComponent implements OnInit {
  public predios: Array<any> = [];
  public setDeleteField: string;
  public selectedFilter: number;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              protected cuencaServices: CuencaVerdeService,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
    this.selectedFilter = 0;
  }

  ngOnInit(): void {
    this.getUserRoles(this);
    this.getPrediosPotenciales();
  }

  // get list predios potenciales
  getPrediosPotenciales(): void {
    const componente = this;
    this.cuencaServices.getPredios()
      .then((predios: Array<any>) => {
        if (predios instanceof Array) {
          predios.reverse();
          componente.predios = predios;
        }
      });
  }

  // set predio a eliminar
  setDelete(id: string): void {
    this.setDeleteField = id;
  }

  // eliminar predio
  public deletePredio(): void {

      this.tasksManager.deletePredioPotencial(this.setDeleteField)
        .then((data) => {
            const message = {
              'tipo': 'Eliminado',
              'message': 'El predio ha sido eliminado satisfactoriamente',
              'style': 'alert-success'
            };

            $('#cModal').modal('toggle');
            this.messagingService.publish(new BusMessage('alerta', message));
            this.setDeleteField = '';
            this.getPrediosPotenciales();

        }, (error: any) => {
          const message = {
            'tipo': 'No se puede eliminar: ',
            'message': error,
            'style': 'alert-danger'
          };

          $('#cModal').modal('toggle');
          this.messagingService.publish(new BusMessage('alerta', message));
        });

  }

}
