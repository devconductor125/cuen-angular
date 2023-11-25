import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Procedure} from '../../../data/model/procedure';
import {RolesManager} from '../../../data/managers/roles.manager';
import {PoolOfContractsManager} from '../../../data/managers/pool-of-contracts.manager';
import {PoolOfContracts} from '../../../data/model/pool-of-contracts';
import {Budget} from '../../../data/model/budget';
import {MappingUtils} from '../../../data/utils/mapping.utils';
import {FileContractor} from '../../../data/model/fileContractor';
import {SpecialTask} from '../../../data/model/specialTask';
import {ActivityValueByContractor} from '../../../data/model/activity-value-by-contractor';

@Component({
  selector: 'cuenca-create-pools-of-contracts',
  templateUrl: './create-pool-of-contracts.component.html',
  styleUrls: ['./create-pool-of-contracts.component.css']
})
export class CreatePoolOfContractsComponent extends BaseComponent implements OnInit {
  public procedures: Array<Procedure>;
  public poolOfContracts: PoolOfContracts = new PoolOfContracts();
  public fileContractor: FileContractor = new FileContractor();
  public listTypeContract: Array<any> = [];

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected poolOfContractsManager: PoolOfContractsManager,
              protected router: Router,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getUserRoles(this);
  }

  protected onGotRoles(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.poolOfContractsManager.loadAllObjects();
    this.procedures = [];
    this.getProceduresWithActionsForPool()
      .then(() => this.onDataLoaded());

    this.getSelectContracts();
  }

  protected getProceduresWithActionsForPool(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.proceduresManager.getProceduresWithActionsForPool()
        .then(proceduresWithActionsForPool => {
          let filteredProceduresWithActionsForPool = proceduresWithActionsForPool.slice();
          filteredProceduresWithActionsForPool = filteredProceduresWithActionsForPool.filter(procedure => {
            procedure.budget = procedure.budget.filter(budget => !budget.selected);
            procedure.task_opens = procedure.task_opens.filter(task => !task.selected);
            return (procedure.budget && procedure.budget.length > 0) || (procedure.task_opens && procedure.task_opens.length > 0);
          });
          this.procedures = filteredProceduresWithActionsForPool;
          resolve();
        });
    });
  }

  protected onDataLoaded(): void {
  }

  savePoolOfContracts(): void {
    this.setPoolProcedures();
    this.setPoolSpecialTasks();

    if (this.isValidPool()) {
      this.poolOfContractsManager.create(this.poolOfContracts)
        .then((result: boolean) => {
          if (result) {
            const message = {
              'tipo': 'Registrado',
              'message': 'La bolsa de contratación ha sido registrada satisfactoriamente',
              'style': 'alert-success'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
            const link = ['/app/pools-of-contracts'];
            this.router.navigate(link);
          }
        });
    }
  }

  protected setPoolProcedures(): void {
    const component = this;
    this.poolOfContracts.pool_by_process = [];
    this.procedures.forEach(function (procedure) {
      if (procedure.selected) {
        procedure.budget.forEach(function (budget: Budget) {
          if (budget.selected) {
            component.poolOfContracts.pool_by_process.push(MappingUtils.budgetToPoolOfContractsAction(procedure.id, budget));
          }
        });
      }
    });
  }

  protected setPoolSpecialTasks(): void {
    const component = this;
    this.poolOfContracts.task_open = [];
    this.procedures.forEach(function (procedure) {
      if (procedure.selected) {
        procedure.task_opens.forEach(function (specialTask: SpecialTask) {
          if (specialTask.selected) {
            component.poolOfContracts.task_open.push(MappingUtils.specialTaskToPoolOfContractsSpecialTask(procedure.id, specialTask));
          }
        });
      }
    });
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
    if (this.poolOfContracts.contract_id === '0') {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona el tipo de contrato',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.poolOfContracts.hasBudgets()) {
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

  protected getSelectContracts(): void {
    this.poolOfContractsManager.getTypeContractorPool()
      .then((response: any) => {
        if (response instanceof Array) {
          this.listTypeContract = response;
        } else {
          this.listTypeContract = [];
        }
      });
  }
}
