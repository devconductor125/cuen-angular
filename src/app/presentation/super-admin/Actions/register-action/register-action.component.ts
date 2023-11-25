import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base-component/base-component';
import {ProceduresManager} from '../../../../data/managers/procedures.manager';
import {TasksManager} from '../../../../data/managers/tasks.manager';
import {ActivatedRoute, Router} from '@angular/router';
import {RolesManager} from '../../../../data/managers/roles.manager';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';
import {ObjectActions} from '../../../../data/model/actions';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';

@Component({
  selector: 'cuenca-register-action',
  templateUrl: './register-action.component.html',
  styleUrls: ['./register-action.component.css']
})

export class RegisterActionComponent extends BaseComponent implements OnInit {

  public actionRegister: ObjectActions = new ObjectActions();
  public listUnitsMeasure: Array<any> = [];
  public listActivities: Array<any> = [];
  public listTypes: Array<any> = [];

  constructor(protected proceduresManager: ProceduresManager,
              private tasksManager: TasksManager,
              private cuencaVerdeService: CuencaVerdeService,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              public messagingService: MessagingService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {

    this.getAllUnitsMeasure();
    this.getAllActivities();
    this.getAllTypes();

    this.actionRegister.material.id = 0;
    this.actionRegister.color = '';
  }

  private getAllUnitsMeasure() {
    this.cuencaVerdeService.getAllUnitsMeasure().then(
      (response) => {
        this.listUnitsMeasure = response;
      }, (error) => {
        console.log('error: ', error);
      }
    );
  }

  private getAllActivities() {
    this.cuencaVerdeService.allActivities().then(
      (response) => {
        this.listActivities = response;
      }, (error) => {
        console.log('error', error);
      }
    );
  }

  private getAllTypes() {
    this.cuencaVerdeService.getAllTypes().then(
      (response) => {
        this.listTypes = response;
      }, (error) => {
        console.log('error', error);
      }
    );
  }

  public guardar(): void {
    if (this.isValid()) {
      this.cuencaVerdeService.createAction(this.actionRegister).then(
        (response) => {
          this.setAlert('Registro', response.message, 'alert-success');
          this.router.navigate(['app/list-actions']);
        }, (error) => {
          this.setAlert('Error', error.message, 'alert-sanger');
        }
      );
    }
  }

  protected isValid(): boolean {
    if (!this.actionRegister.name || this.actionRegister.name.length === 0) {
      this.setAlert('Error: ', 'Ingrese el nombre de la Acción', 'alert-danger');
      return false;
    }
    if (this.actionRegister.good_practicess === null || this.actionRegister.good_practicess === 'null') {
      this.setAlert('Error: ', 'Seleccione si es de buenas practicas', 'alert-danger');
      return false;
    }
    if (this.actionRegister.color.length === 0) {
      this.setAlert('Error: ', 'Seleccione el color', 'alert-danger');
      return false;
    }
    if (this.actionRegister.type === null || this.actionRegister.type === 'null' || this.actionRegister.type.length === 0) {
      this.setAlert('Error: ', 'Seleccione el tipo de geometría', 'alert-danger');
      return false;
    }
    if (!this.actionRegister.material.name || this.actionRegister.material.name.length === 0) {
      this.setAlert('Error: ', 'Ingrese el nombre del material', 'alert-danger');
      return false;
    }
    if (!this.actionRegister.material.unit_id || this.actionRegister.material.unit_id === null || this.actionRegister.material.unit_id === 'null') {
      this.setAlert('Error: ', 'Seleccione la unidad del material', 'alert-danger');
      return false;
    }
    if (this.actionRegister.material.measurement === undefined || this.actionRegister.material.measurement === null) {
      this.setAlert('Error: ', 'Ingrese un valor para la medición', 'alert-danger');
      return false;
    }
    if (this.actionRegister.material.type === null || this.actionRegister.material.type === 'null') {
      this.setAlert('Error: ', 'Seleccione un tipo de material', 'alert-danger');
      return false;
    }
    if (this.actionRegister.material.price === undefined || this.actionRegister.material.price === null) {
      this.setAlert('Error: ', 'Ingrese un precio', 'alert-danger');
      return false;
    }
    if (this.actionRegister.activityId === null || this.actionRegister.activityId === undefined || this.actionRegister.activityId === 'null' ) {
      this.setAlert('Error: ', 'Seleccione una actividad', 'alert-danger');
      return false;
    }
    if (this.actionRegister.type_id === null || this.actionRegister.type_id === undefined || this.actionRegister.type_id === 'null' ) {
      this.setAlert('Error: ', 'Seleccione el tipo de acción', 'alert-danger');
      return false;
    }
    return true;
  }

  private setAlert(type: string, strMessage: string, strStyle: string) {
    const message = {
      'tipo': type,
      'message': strMessage,
      'style': strStyle
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

}
