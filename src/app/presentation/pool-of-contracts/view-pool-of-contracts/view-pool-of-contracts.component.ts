import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {CreatePoolOfContractsComponent} from '../create-pool-of-contracts/create-pool-of-contracts.component';
import {PoolOfContractsManager} from '../../../data/managers/pool-of-contracts.manager';
import {Procedure} from '../../../data/model/procedure';
import {PoolOfContracts} from '../../../data/model/pool-of-contracts';
import {MappingUtils} from '../../../data/utils/mapping.utils';
import {BrowserUtils} from '../../../data/utils/browser.utils';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {SpecialTask} from '../../../data/model/specialTask';
import {Budget} from '../../../data/model/budget';

@Component({
  selector: 'cuenca-view-pools-of-contracts',
  templateUrl: './view-pool-of-contracts.component.html',
  styleUrls: ['./view-pool-of-contracts.component.css']
})
export class ViewPoolOfContractsComponent extends CreatePoolOfContractsComponent implements OnInit {

  public idPool: string;
  public listFilesContract: Array<any> = [];

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected poolOfContractsManager: PoolOfContractsManager,
              protected cuencaService: CuencaVerdeService,
              protected router: Router,
              public rolesManager: RolesManager,
              protected tasksManager: TasksManager,
              private activatedRoute: ActivatedRoute) {
    super(messagingService, proceduresManager, poolOfContractsManager, router, rolesManager);
  }

  protected getProceduresWithActionsForPool(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  protected onDataLoaded() {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        this.idPool = idString;
        if (id > 0) {
          this.poolOfContractsManager.getObjectForEdit(String(id))
            .then(object => {
              this.poolOfContracts = <PoolOfContracts> object;
              this.mapPoolObjects();
              this.getFilesContractorPool();
              this.getProcedures();
            });
        } else {
          const link = ['/app/pools-of-contracts'];
          this.router.navigate(link);
        }
      });
  }

  private getProcedures() {
    return new Promise((resolve, reject) => {
      this.proceduresManager.getProceduresWithActionsForPoolForView(this.poolOfContracts.id)
        .then(proceduresWithActionsForPool => {
          let filteredProceduresWithActionsForPool = proceduresWithActionsForPool.slice();
          filteredProceduresWithActionsForPool = filteredProceduresWithActionsForPool.map(procedure => {
            procedure.selected = true;
            procedure.budget.forEach(function (budget: Budget) {
              budget.selected = true;
              return budget;
            });
            procedure.task_opens.forEach(function (specialTask: SpecialTask) {
              specialTask.selected = true;
              return specialTask;
            });
            return procedure;
          });
          this.procedures = filteredProceduresWithActionsForPool;
          resolve();
        });
    });
  }

  private mapPoolObjects() {
    const component = this;
    if (this.poolOfContracts.pool_by_process) {
      this.poolOfContracts.pool_by_process.forEach(function (action: any) {
        component.procedures.forEach(function (componentProcedure: Procedure) {
          if (componentProcedure.id === action.process_id) {
            componentProcedure.selected = true;
            if (action.budget_id) {
              componentProcedure.budget.push(MappingUtils.mapPoolOfContractsActionToBudget(action));
            } else {
              componentProcedure.task_opens.forEach(function (task: any) {
                if (Number(task.id) === Number(action.task_open_id)) {
                  task.selected = true;
                }
              });
            }
          }
        });
      });
    }
  }

  // cuando se sube un archivo
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

        this.getFilesContractorPool();

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

  // get files pool
  protected getFilesContractorPool(): void {
    this.poolOfContractsManager.getFilesContractorPool(this.idPool)
      .then((response: any) => {
        if (response instanceof Array) {
          this.listFilesContract = response;
        } else {
          this.listFilesContract = [];
        }

      });
  }

  // descargar archivo
  protected getFileContractorDownload(idFile: string, nameFile: string, extension: string): void {
    this.cuencaService.getFilePoolContract(idFile)
      .then(blob => {
        BrowserUtils.downloadAnyFromBlob(blob, nameFile, extension);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }

  // borrar archivo
  protected deleteFileContract(idFile: string): void {
    this.tasksManager.deleteFilePoolContractor(idFile)
      .then(response => {

        const message = {
          'tipo': 'Borrado',
          'message': 'El archivo ha sido borrado satisfactoriamente',
          'style': 'alert-succes'
        };
        this.messagingService.publish(new BusMessage('alerta', message));

        /// obtener los archivos de la bolsa de contratación
        this.getFilesContractorPool();

      })
      .catch(function (error) {

        const message = {
          'tipo': 'Error',
          'message': 'El archivo no ha sido borrado. Ha ocurrido un error.',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));

      });
  }

  public goToCost() {
    console.log('id pool', this.idPool);
    this.router.navigate(['app/view-cost', this.idPool]);
  }
}
