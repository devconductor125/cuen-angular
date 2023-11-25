import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../base-component/base-component';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {TasksManager} from '../../data/managers/tasks.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {RolesManager} from '../../data/managers/roles.manager';
import Property = propertyInterface.Property;
import {Task} from '../../data/model/task';
import {Monitoreo} from '../../data/model/monitoreo';
import {MonitoreoTypes} from '../../data/model/monitoreo_types';
import {BusMessage, MessagingService} from '../../data/services/messaging.service';


@Component({
  selector: 'cuenca-monitoreos-component',
  templateUrl: './monitoreos.component.html',
  styleUrls: ['./monitoreos.component.css']
})
export class MonitoreosComponent extends BaseComponent implements OnInit {

  @Input() public task: Task;
  @Output() notify: EventEmitter<object> = new EventEmitter<object>();
  public monitoreos: Array<Monitoreo> = [];
  public monitoreo: Monitoreo;
  public types_monitoreos: Array<any> = []; // TODO Change for MonitoreoTypes

  constructor(protected proceduresManager: ProceduresManager,
              private tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.monitoreo = <Monitoreo> {};
    this.monitoreo.task_id = this.task.id;
    this.getTypeMonitoreos();
    this.getMonitoreos();
  }

  public insertarMonitoreo(): void {
      if (this.validarMonitor()) {
        this.tasksManager.crearMonitor(this.monitoreo)
          .then(() => {
            const message = {
              'tipo': 'Monitoreo Registrado ',
              'message': ' satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            this.getMonitoreos();
            this.monitoreo = <Monitoreo> {};
          });
            } else {
        const message = {
          'tipo': 'Error al Registrar Monitoreo ',
          'message': ' se requieren todos los campos',
          'style': 'alert-warning'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
      }
  }

  public getMonitoreos(): void {
    this.tasksManager.getMonitoreos(String(this.task.id))
      .then((monitoreos: Array<Monitoreo>) => {
        if (monitoreos instanceof Array) {
          this.monitoreos = monitoreos;
          this.notify.emit({id: this.getId(), payload: this.monitoreos});
        }
      });
  }

  private getTypeMonitoreos(): void {
    this.tasksManager.getTypeMonitor()
      .then(typeMonitor => {
        this.types_monitoreos = typeMonitor;
      });
  }

  public removeItem(index: number, id: string) {
    this.monitoreos.splice(index, 1);
    this.tasksManager.deleteMonitoreos(id)
      .then((response: any) => {
        this.getMonitoreos();
      });
  }

  validarMonitor(): Boolean {
    if (this.monitoreo.type + '' === '0' || this.monitoreo.type === undefined || this.monitoreo.type === null) {
      return false;
    }
    if (this.monitoreo.date_start + '' === '0' || this.monitoreo.date_start === undefined || this.monitoreo.date_start === null) {
      return false;
    }
    if (this.monitoreo.date_deadline + '' === '0' || this.monitoreo.date_deadline === undefined || this.monitoreo.date_deadline === null) {
      return false;
    }
    if (this.monitoreo.comment === '' || this.monitoreo.comment === undefined || this.monitoreo.comment === null) {
      return false;
    }
  return true;
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
