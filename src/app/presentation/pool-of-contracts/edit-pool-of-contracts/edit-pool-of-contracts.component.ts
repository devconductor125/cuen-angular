import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {CreatePoolOfContractsComponent} from '../create-pool-of-contracts/create-pool-of-contracts.component';
import {PoolOfContractsManager} from '../../../data/managers/pool-of-contracts.manager';
import {Procedure} from '../../../data/model/procedure';
import {OtherCamps, PoolOfContracts} from '../../../data/model/pool-of-contracts';
import {IOption} from 'ng-select';
import {User} from '../../../data/model/user';
import {AsignarContratistaProcedure} from '../../../data/model/asignarContratistaProcedure';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ActionByPool, Contribution} from '../../../data/model/action-by-pool';
import {AssignContractorRequest} from '../../../data/model/assign-contractor-request';
import {ActivityValueByContractor} from '../../../data/model/activity-value-by-contractor';
import {isArray, isUndefined} from 'util';

@Component({
  selector: 'cuenca-edit-pools-of-contracts',
  templateUrl: './edit-pool-of-contracts.component.html',
  styleUrls: ['./edit-pool-of-contracts.component.css']
})
export class EditPoolOfContractsComponent extends CreatePoolOfContractsComponent implements OnInit {
  public currentValue: Array<object> = [];
  public contratistas: Array<IOption> = [];
  public seguimiento: Array<any> = [];
  public actionsByPool: Array<ActionByPool> = [];
  public accionesAsignadas: Array<AsignarContratistaProcedure> = [];
  public activitiesValueByContractor: Array<ActivityValueByContractor> = [];
  public characters: Array<IOption> = [];
  public id_pool: string;
  public response: Boolean = false;
  public listTask: Array<any> = [];
  public valueImprevisto: any = 0;
  public poolHasAnAssignedContractor: boolean;
  public filteredProcedures: Array<Procedure> = [];

  public boolOtroSi: boolean;
  public strDateOtroSi: string;
  public guaranteeSelected: string;

  public listGuaranties: Array<{value: string, name: string}> = [
    {value: '0', name: 'Garantia'},
    {value: '1', name: 'Buen manejo y correcta inversión del Anticipo'},
    {value: '2', name: 'Cumplimiento'},
    {value: '3', name: 'Pago de Salarios y Prestaciones Sociales e indemnizaciones del personal'},
    {value: '4', name: 'Estabilidad y calidad de la obra'},
    {value: '5', name: 'Responsabilidad Civil Extracontractual'},
    {value: '6', name: 'Calidad del Servicio'},
    {value: '7', name: 'No Aplica'},
  ];

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected poolOfContractsManager: PoolOfContractsManager,
              protected router: Router,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager,
              private activatedRoute: ActivatedRoute) {
    super(messagingService, proceduresManager, poolOfContractsManager, router, rolesManager);
    this.boolOtroSi = false;
    this.guaranteeSelected = '0';
  }

  protected onDataLoaded() {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        this.id_pool = idString;
        if (id > 0) {
          this.poolOfContractsManager.getObjectForEdit(String(id))
            .then(object => {
              const poolOfContracts: PoolOfContracts = <PoolOfContracts> object;
              if (!poolOfContracts.other_camps) {
                poolOfContracts.other_camps = new OtherCamps();
              }
              this.poolHasAnAssignedContractor = poolOfContracts.contractor;
              this.poolOfContracts = poolOfContracts;
              if (!isArray(this.poolOfContracts.other_camps.guararntee)) {
                this.poolOfContracts.other_camps.guararntee = [];
              }
              this.getContratistas();
              this.getActivitiesValueByContractor(this.id_pool);
            });
        } else {
          const link = ['/app/pools-of-contracts'];
          this.router.navigate(link);
        }
      });
    this.getActionsByPoolId();
    let filteredProcedures = this.procedures.slice(0);
    filteredProcedures = filteredProcedures.filter(procedure => {
      procedure.budget = procedure.budget.filter(budget => !budget.selected);
      procedure.task_opens = procedure.task_opens.filter(openTask => !openTask.selected);
      return ((procedure.budget && procedure.budget.length > 0) || (procedure.task_opens && procedure.task_opens.length > 0));
    });
    if (!this.isCoordinador) {
      filteredProcedures.map(procedure => procedure.selected = true);
    }
    this.filteredProcedures = filteredProcedures;
  }

  public getActionsByPoolId() {
    this.proceduresManager.getActionsByPoolId(this.id_pool)
      .then((response) => {
        this.actionsByPool = response;
      });
  }

  getContratistas(): void {
    const componente = this;
    this.proceduresManager.getUsers(5)
      .then((contractors: Array<User>) => {
        componente.seguimiento = contractors;
        componente.seguimiento.forEach(function (contractor) {
          if (componente.poolOfContracts.contractor && componente.poolOfContracts.contractor.id + '' === contractor.id + '') {
            componente.poolOfContracts.contractor = contractor;
          }
        });
      });
  }

  public selectedGuarante() {
    if (this.guaranteeSelected !== '0') {
      const arrData = this.poolOfContracts.other_camps.guararntee.filter(guarantee => guarantee.value === this.guaranteeSelected);
      if (arrData.length <= 0) {
        const data = this.listGuaranties.filter(guarantee => guarantee.value === this.guaranteeSelected);
        this.poolOfContracts.other_camps.guararntee.push(data[0]);
      }
    }
  }

  public deleteGuarantee(index: any) {
    this.poolOfContracts.other_camps.guararntee.splice(index, 1);
    this.guaranteeSelected = '0';
  }

  public formatSpecific(data: any, id: number) {
    const result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    $('#contractorValue' + id).val(result);
  }

  public saveContractorActionsValues() {
    let hasNegativeValues = false;
    this.activitiesValueByContractor.forEach(function (activityValueByContractor: ActivityValueByContractor) {
      if (Number(activityValueByContractor.action_value) < 0) {
        hasNegativeValues = true;
      }
    });
    if (!this.poolOfContracts.contractor) {
      this.showErrorMessage('La bolsa requiere un contratista');
    } else if (hasNegativeValues) {
      this.showErrorMessage('Los valores deben ser mayores a cero');
    } else {
      this.proceduresManager.saveContractorActionsValues(this.activitiesValueByContractor)
        .then((success: any) => this.showSuccessMessage('Los valores de contratista por acción han sido guardados'), (error: any) => this.serviceError());
    }
  }

  public saveActionsValuesByPoolChanges() {
    if (!this.poolOfContracts.contractor) {
      this.showErrorMessage('La bolsa requiere un contratista');
    } else {
      const component = this;
      let hasNegativeValues = false;

      const filteredActionsByPool: Array<ActionByPool> = this.actionsByPool.filter(actionByPool => {
        actionByPool.contributions.forEach(function (contribution: any) {
          if (Number(contribution.contribution_value) < 0) {
            hasNegativeValues = true;
          }
        });
        return component.hasNewValue(actionByPool);
      });

      if (filteredActionsByPool.length === 0) {
        this.showErrorMessage('Agrega algún valor a las acciones');
      } else {
        const filteredActionsByPoolRequest: Array<any> = [];

        filteredActionsByPool.forEach(function (actionByPool) {
          actionByPool.contributions.map(contribution => contribution.contractor_id = component.poolOfContracts.contractor.id);
          filteredActionsByPoolRequest.push(actionByPool);
        });

        if (hasNegativeValues) {
          this.showErrorMessage('Los valores deben ser mayores a cero');
        } else {
          this.proceduresManager.saveActionsByPoolChanges(filteredActionsByPoolRequest, this.poolOfContracts.id)
            .then((response: any) => {
              if (response && response.code === 500) {
                this.showErrorMessage(response.message);
              } else {
                this.showSuccessMessage('Los valores de las acciones han sido guardados');
              }
            }, (error: any) => this.serviceError());
        }
      }
    }
  }

  private hasNewValue(actionByPool: ActionByPool): boolean {
    let newValue = 0;
    actionByPool.contributions.forEach(function (contribution: Contribution) {
      newValue = Number(newValue) + Number(contribution.contribution_value);
    });
    return newValue > 0;
  }

  public saveImprevistos() {
    if (this.valueImprevisto > 0) {
      this.proceduresManager.saveUnforeseenPoolValue(this.poolOfContracts.id, this.valueImprevisto)
        .then((success: any) => this.showSuccessMessage('El valor de imprevistos ha sido guardado'), (error: any) => this.serviceError());
    } else {
      this.showErrorMessage('El valor del imprevisto debe ser mayor a cero');
    }
  }

  public assignContractor() {
    if (this.poolOfContracts.contractor.id + '' !== '0') {
      const assignContractorRequest: AssignContractorRequest = new AssignContractorRequest();
      if (this.poolOfContracts.other_camps.renovation.other === 'other') {
        if ( isUndefined(this.poolOfContracts.other_camps.arrOtherDates)) {
          this.poolOfContracts.other_camps.arrOtherDates = [];
        }
        this.poolOfContracts.other_camps.arrOtherDates.push({date: this.strDateOtroSi});
      }
      assignContractorRequest.id_pool = this.poolOfContracts.id;
      assignContractorRequest.name = this.poolOfContracts.name;
      assignContractorRequest.user_id = this.poolOfContracts.contractor.id;
      assignContractorRequest.other_camps = this.poolOfContracts.other_camps;
      this.proceduresManager.assignContractor(assignContractorRequest)
        .then((success: any) => {
          this.showSuccessMessage('La información del contratista ha sido actualizada');
          this.onDataLoaded();
        }, (error: any) => this.serviceError());
    } else {
      this.showErrorMessage('La bolsa requiere un contratista');
    }
  }

  public addNewActionsToPool() {
    const filteredProcedures = this.filteredProcedures.slice(0);
    const filteredProceduresToSend = filteredProcedures.filter(procedure => {
      const budgets = procedure.budget.filter(budget => budget.selected);
      const task_opens = procedure.task_opens.filter(openTask => openTask.selected);
      return ((budgets && budgets.length > 0) || (task_opens && task_opens.length > 0));
    });
    if (filteredProceduresToSend.length === 0) {
      this.showNoActionsOrOtasksErrorMessage();
    } else {
      this.proceduresManager.addNewActionsToPool(this.poolOfContracts.id, filteredProceduresToSend)
        .then((success: any) => {
          this.showSuccessMessage('Las acciones han sido agregadas a la bolsa');
          this.onDataLoaded();
        }, (error: any) => this.serviceError());
    }
  }

  private showSuccessMessage(message: string) {
    const object = {
      'tipo': 'Exito: ',
      'message': ' ' + message,
      'style': 'alert-success'
    };
    this.messagingService.publish(new BusMessage('alerta', object));
  }

  private showErrorMessage(message: string) {
    const object = {
      'tipo': 'Error: ',
      'message': ' ' + message,
      'style': 'alert-danger'
    };
    this.messagingService.publish(new BusMessage('alerta', object));
  }

  private serviceError() {
    const message = {
      'tipo': 'Error: ',
      'message': ' Ha ocurrido un error',
      'style': 'alert-danger'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

  private showNoActionsOrOtasksErrorMessage() {
    const message = {
      'tipo': 'Error: ',
      'message': 'Selecciona al menos una acción o tarea',
      'style': 'alert-danger'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

  public calculateNewActionValue(action: any, value: any) {
    let newValue = 0;
    action.contributions.forEach(function (contribution: Contribution) {
      newValue = Number(newValue) + Number(contribution.contribution_value);
    });
    action.new_action_value = newValue;
  }

  protected isValidPool(): boolean {
    if (!this.poolOfContracts.name || this.poolOfContracts.name.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el nombre de la bolsa de contratación',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.accionesAsignadas.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona una o más acciones',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

  private getActivitiesValueByContractor(poolId: string) {
    this.proceduresManager.getActivitiesValueByContractor(poolId)
      .then((activitiesValueByContractor: any) => {
        if (activitiesValueByContractor && activitiesValueByContractor instanceof Array && activitiesValueByContractor.length > 0) {
          this.activitiesValueByContractor = activitiesValueByContractor;
        }
      }, (error: any) => this.serviceError());
  }

  public addDate() {
    if (this.poolOfContracts.other_camps.renovation.other === 'other') {
      this.boolOtroSi = true;
    } else {
      this.boolOtroSi = false;
    }
  }
}
