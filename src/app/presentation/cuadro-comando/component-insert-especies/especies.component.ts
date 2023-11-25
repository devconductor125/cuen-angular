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
import {AporteEspecie} from '../../../data/model/aporteEspecie';
import {debug} from 'util';

@Component({
  selector: 'cuenca-especies',
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.css']
})
export class EspeciesComponent extends BaseComponent implements OnInit {

  @Input() public listadoE: any;
  @Output() notify: EventEmitter<object> = new EventEmitter<object>();
  public especie: AporteEspecie = new AporteEspecie();
  public listadoEspecies: Array<AporteEspecie> = [];
  public totalEspecies = 0;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              public cuencaVerdeService: CuencaVerdeService,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    if (this.listadoE != null) {
      this.listadoEspecies = this.listadoE;
    }
  }

  public removeItem(index: number, id: string) {
    this.listadoEspecies.splice(index, 1);
    /*this.tasksManager.deleteMetas(id)
      .then((response: any) => {
        this.getListadoMetas();
      });*/
  }

  formatSpecific(data: any, id: number) {
    // decimal format
    const result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    //// this.datosCosto.coste = result;
    if (id === 1) {
      $('#unidadPrecio').val(result);
    }

  }

  public insertarEspecie(): void {
    if (this.isValidMetas()) {
      this.listadoEspecies.push(this.especie);
      this.especie = <AporteEspecie> {};

      this.getTotal();

      const objeto = {
        'total': this.totalEspecies,
        'listado': this.listadoEspecies
      };
      this.notify.emit({id: this.getId(), payload: objeto});
     /* this.tasksManager.crearMetas(this.metas)
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
     });*/
    }
  }

  public getTotal(): number {
    this.totalEspecies = 0;
    const componente = this;
    this.listadoEspecies.forEach(function (especie: AporteEspecie) {
      componente.totalEspecies = componente.totalEspecies + (Number(especie.price_unit.replace('.', '')) * Number(especie.quantity));
    });
    return componente.totalEspecies;
  }

  protected isValidMetas(): boolean {
    if (this.especie.quantity === '' || this.especie.quantity === null || this.especie.quantity === undefined ||
      Number(this.especie.quantity) === 0 ) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la cantidad del aporte a registrar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.especie.price_unit === '' || this.especie.price_unit === null || this.especie.price_unit === undefined) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el precio por unidad del aporte a registrar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.especie.description === '' || this.especie.description === null || this.especie.description === undefined ) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa la descripción del aporte a registrar',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

}
