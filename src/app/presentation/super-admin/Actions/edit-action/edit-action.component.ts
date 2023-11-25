import { Component, OnInit } from '@angular/core';
import {ObjectActions} from '../../../../data/model/actions';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {CuencaVerdeService} from '../../../../data/services/cuenca-verde.service';
import {BusMessage, MessagingService} from '../../../../data/services/messaging.service';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.scss']
})
export class EditActionComponent implements OnInit {

  public actionRegister: ObjectActions;
  public listActivities: Array<any> = [];
  public listTypes: Array<any> = [];
  public listUnitsMeasure: Array<any> = [];

  private strIdAction: string;

  public boolEdit: boolean;

  constructor(private activeRouter: ActivatedRoute,
              private cuencaVerdeServie: CuencaVerdeService,
              private messagingService: MessagingService,
              private router: Router) {
    this.actionRegister = new ObjectActions();
    this.strIdAction = this.activeRouter.snapshot.params.id;
    this.boolEdit = false;
  }

  ngOnInit() {
    this.getAllTypes();
    this.getAllActivities();
    this.getAllUnitsMeasure();
    this.getActionsById();
  }

  private getActionsById() {
    this.cuencaVerdeServie.getActionById(this.strIdAction).then(
      (response: ObjectActions) => {
        this.actionRegister.name = response.name;
        this.actionRegister.good_practicess = response.good_practicess;
        this.actionRegister.type = response.type;
        this.actionRegister.material.id = response['action_material'].id;
        this.actionRegister.material.name = response['action_material'].name;
        this.actionRegister.material.unit_id = response['action_material'].unit_id;
        this.actionRegister.material.measurement = response['action_material'].measurement;
        this.actionRegister.material.type = response['action_material'].type;
        this.actionRegister.material.price = response['action_material'].price;
        this.actionRegister.activityId = response['by_activite'].activity_id;
        this.actionRegister.type_id = response['action_type'].id;
        this.actionRegister.id = response.id;
        if (response.color === '') {
          this.actionRegister.color = response['color_fill'];
        } else {
          this.actionRegister.color = response.color;
        }
      }, (error) => {
        console.log(error);
      }
    );
  }

  private getAllTypes() {
    this.cuencaVerdeServie.getAllTypes().then(
      (response) => {
        this.listTypes = response;
      }, (error) => {
        console.log('error', error);
      }
    );
  }

  private getAllUnitsMeasure() {
    this.cuencaVerdeServie.getAllUnitsMeasure().then(
      (response) => {
        this.listUnitsMeasure = response;
      }, (error) => {
        console.log('error: ', error);
      }
    );
  }

  private getAllActivities() {
    this.cuencaVerdeServie.allActivities().then(
      (response) => {
        this.listActivities = response;
      }, (error) => {
        console.log('error', error);
      }
    );
  }

  public setVariableEdit() {
    this.boolEdit = !this.boolEdit;
  }

  public updateAction() {
    this.cuencaVerdeServie.updateAction(this.actionRegister).then(
      (response) => {
        this.setAlert('Actualización', 'satidfactoria', 'alert-success');
        this.router.navigate(['app/list-actions']);
      }, (error) => {
        this.setAlert('Actualización', error, 'alert-danger');
      }
    );
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
