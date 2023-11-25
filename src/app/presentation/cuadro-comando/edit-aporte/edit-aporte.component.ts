import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Procedure} from '../../../data/model/procedure';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Asociado} from '../../../data/model/asociado';
import {Aporte} from '../../../data/model/aporte';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {Task} from '../../../data/model/task';
import {AporteList} from '../../../data/model/aporteList';

@Component({
  selector: 'cuenca-edit-aporte',
  templateUrl: './edit-aporte.component.html',
  styleUrls: ['./edit-aporte.component.css']
})
export class EditAporteComponent extends BaseComponent implements OnInit {

  public aporte: AporteList;
  public aporteOriginal: number;
  public aporteID: string;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getAporte();
  }

  protected getAporte(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        this.aporteID = idString;
        if (id > 0) {
          this.tasksManager.getAporteForId(String(id))
            .then(object => {
              this.aporte = object;
              if (this.aporte.committed_budget === null) {
                this.aporte.committed_budget = '0';
              }
              if (this.aporte.paid_budget === null) {
                this.aporte.paid_budget = '0';
              }
              this.aporteOriginal = Number(this.aporte.budget);
            });
        } else {
          const link = ['/app/comando'];
          this.router.navigate(link);
        }
      });
  }

 updateAporte(): void {
    if (this.isValidProcedure()) {
      this.tasksManager.updateAssociated(this.aporte)
        .then((result: boolean) => {
          if (result) {
            const message = {
              'tipo': 'Registrado',
              'message': 'El aporte ha sido actualizado satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/comando'];
            this.router.navigate(link);
          }
        });
    }
  }


  getArrayEspecies($event: any) {
    this.aporte.budget_species = $event.payload.total;
    this.aporte.species_contribution = $event.payload.listado;
  }

 protected isValidProcedure(): boolean {
    if (this.aporte.budget === '' || this.aporte.budget === null || this.aporte.budget === undefined ) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el aporte que se le asignará a la actividad',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
   if (Number(this.aporte.budget) < this.aporteOriginal) {
     const message = {
       'tipo': 'Error: ',
       'message': 'El aporte no puede ser menor al registrado originalmente',
       'style': 'alert-danger'
     };
     this.messagingService.publish(new BusMessage('alerta', message));
     return false;
   }
    return true;
  }
}
