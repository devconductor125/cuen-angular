import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Task} from '../../../data/model/task';
import {MetasAporte} from '../../../data/model/metasAporte';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Monitoreo} from '../../../data/model/monitoreo';
import {TasksManager} from '../../../data/managers/tasks.manager';


@Component({
  selector: 'cuenca-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent extends BaseComponent implements OnInit {

  @Input() public aporteId: string;
  @Output() notify: EventEmitter<object> = new EventEmitter<object>();
  public metas: MetasAporte = new MetasAporte();
  public listadoMetas: Array<MetasAporte> = [];

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              public cuencaVerdeService: CuencaVerdeService,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getListadoMetas();
    this.metas.contributions_id = this.aporteId;
  }

  public getListadoMetas(): void {
    this.tasksManager.getAllMetas()
      .then(metas => {
        this.listadoMetas = metas;
      });
  }

  public removeItem(index: number, id: string) {
    this.listadoMetas.splice(index, 1);
    /*this.tasksManager.deleteMetas(id)
      .then((response: any) => {
        this.getListadoMetas();
      });*/
  }

  public insertarMeta(): void {
    if (this.isValidMetas()) {
      this.tasksManager.crearMetas(this.metas)
        .then(() => {
          const message = {
            'tipo': 'Meta Registrada ',
            'message': ' satisfactoriamente',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          this.getListadoMetas();
          this.metas = <MetasAporte> {};
          this.metas.contributions_id = this.aporteId;
        });
    }
  }

  protected isValidMetas(): boolean {
    if (this.metas.quantity === '' || this.metas.quantity === null || this.metas.quantity === undefined ||
      Number(this.metas.quantity) === 0 ) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la cantidad de la meta a registrar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.metas.unit === '' || this.metas.unit === null || this.metas.unit === undefined) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la unidad de la meta a registrar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.metas.description === '' || this.metas.description === null || this.metas.description === undefined ) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la descripción de la meta a registrar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

}
