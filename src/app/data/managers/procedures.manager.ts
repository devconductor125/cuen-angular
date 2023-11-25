import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {BaseManager} from './base.manager';
import {CuencaVerdeService} from '../services/cuenca-verde.service';
import {User} from '../model/user';
import {Task} from '../model/task';
import {Procedure} from '../model/procedure';
import {BaseObject} from '../model/base-object';
import {PredioInfo} from '../model/predio-info';
import {Project} from '../model/project';
import {Activity} from '../model/activity';
import {Program} from '../model/program';
import {ActionData} from '../model/actionData';
import {ActionByPool} from '../model/action-by-pool';
import {AssignContractorRequest} from '../model/assign-contractor-request';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import {CuencaVerdeServiceObjectMapper} from '../services/cuenca-verde-service-object-mapper';
import {MapHelper} from '../../presentation/map/MapHelper';
import {Income} from '../model/income';
import {SeedCapital} from '../model/seedCapital';
import {Expense} from '../model/expense';
import {ActivityValueByContractor} from '../model/activity-value-by-contractor';
import GeoJson = geoJsonInterface.GeoJson;
import Feature = geoJsonInterface.Feature;

@Injectable()
export class ProceduresManager extends BaseManager {
  private geoJsonList: Array<GeoJson> = [];
  private programs: Array<Program>;
  private actionsList: Array<ActionData>;

  constructor(private cuencaVerdeService: CuencaVerdeService) {
    super();
  }

  protected getAll(): Promise<Array<BaseObject>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getProcedures()
        .then(procedures => resolve(procedures))
        .catch(reject);
    });
  }

  public getAllForMonitoringCalendar(): Promise<Array<Procedure>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllForMonitoringCalendar()
        .then(procedures => {
          if (procedures instanceof Array) {
            resolve(procedures);
          }
        })
        .catch(reject);
    });
  }

  public getAllAssociated(type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllAssociatedByType(type)
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  public getAllIncomes(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllIncomes()
        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getPrograms(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      if (this.programs != null) {
        this.programs.forEach(function (program) {
          program.projects = null;
          program.selected = false;
        });
        resolve(this.programs);
      } else {
        this.cuencaVerdeService.getPrograms()
          .then(programs => {
            if (programs instanceof Array) {
              this.programs = programs;
              resolve(programs);
            }
          })
          .catch(reject);
      }
    });
  }

  getPrediosReales(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getPrediosReales()
        .then(response => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  getActionsList(): Promise<Array<ActionData>> {
    return new Promise((resolve, reject) => {
      if (this.actionsList && this.actionsList.length > 0) {
        resolve(this.actionsList);
      } else {
        this.cuencaVerdeService.getActionsList()
          .then(actionsList => {
            this.actionsList = actionsList;
            resolve(actionsList);
          })
          .catch(reject);
      }
    });
  }

  getParentProcedures(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getParentProcedures()
        .then(response => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  protected addAll(objects: Array<Procedure>): void {
    const component = this;
    this.clearObjects();
    objects.forEach(function (procedure: Procedure) {
      procedure.setProgressBarAnimationValues();
      component.retrieveInstance(String(procedure.id), procedure);
    });
  }

  getObjectCount(): any {
    return this.getObjectsFromCache().length;
  }

  clearGeoJsonCache(): void {
    this.geoJsonList = [];
  }

  addToCurrentGeoJsonList(geoJson: GeoJson) {
    console.log(geoJson);
    console.log(this.geoJsonList);
    if (this.geoJsonList.length === 0) {
      geoJson.budget = MapHelper.getGeoJsonBudget(geoJson);
      this.geoJsonList.push(geoJson);
      return;
    }
    for (let i = 0; i < this.geoJsonList.length; i++) {
      const localGeoJson: GeoJson = this.geoJsonList[i];
      const localFeatures: Array<Feature> = localGeoJson.features;
      const newFeatures: Array<Feature> = geoJson.features;

      for (let x = 0; x < newFeatures.length; x++) {
        let foundFeature = false;
        const newFeature: Feature = newFeatures[x];

        for (let j = 0; j < localFeatures.length; j++) {
          const localFeature: Feature = localFeatures[j];
          if (newFeature.properties.hash === localFeature.properties.hash) {
            localFeatures[i] = newFeature;
            foundFeature = true;
          }
        }
        if (!foundFeature) {
          localFeatures.push(newFeature);
        }
      }
      localGeoJson.features = localFeatures;
      localGeoJson.budget = MapHelper.getGeoJsonBudget(localGeoJson);
    }
  }

  getCurrentGeoJsonList(): Array<GeoJson> {
    return this.geoJsonList;
  }

  getProcedureTasks(projectId: string): Promise<Array<Task>> {
    return new Promise((resolve, reject) => {
      const resultProject: Procedure = this.fetchObject(projectId);
      if (resultProject.hasGotTasks()) {
        resolve(resultProject.getTasks());
      } else {
        this.cuencaVerdeService.getProjectTasks(projectId)
          .then(response => {
            if (response instanceof Array) {
              resultProject.tasks = response;
              this.addObject(String(resultProject.id), resultProject);
              resolve(response);
            }
          })
          .catch(reject);
      }
    });
  }

  getProcedureAllTasks(projectId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getProjectAllTasks(projectId)
        .then(response => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  getProcedureDetailsNew(idProcedure: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getProcedureDetailsNew(idProcedure)
        .then(response => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  public getObjectForEdit(objectId: string): Promise<BaseObject> {
    return new Promise((resolve, reject) => {
      const procedure: Procedure = this.search(objectId);
      if (procedure && procedure.program && procedure.project && procedure.activities) {
        resolve(procedure);
      } else {
        if (procedure) {
          this.load(objectId)
            .then(returnedProcedure => {
              returnedProcedure.subTypeStep = procedure.subTypeStep;
              returnedProcedure.subTypeTotal = procedure.subTypeTotal + 1;
              returnedProcedure.animationDelay = procedure.animationDelay;
              returnedProcedure.animationDuration = procedure.animationDuration;
              this.retrieveInstance(String(returnedProcedure.id), returnedProcedure);
              resolve(returnedProcedure);
            })
            .catch(function (error: any) {
              reject(error);
            });
        }
      }
    });
  }

  public load(objectId: string): Promise<Procedure> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getProcedure(objectId)
        .then(procedure => {
          this.retrieveInstance(String(procedure.id), procedure);
          resolve(procedure);
        })
        .catch(reject);
    });
  }

  create(procedure: Procedure) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.createProcedure(procedure)
        .then((response) => {
          if (response.object_id) {
            this.pool = {};
            this.loadAllObjects();
            resolve(procedure);
          }
        })
        .catch(reject);
    });
  }

  public createSeedCapital(dataSeedCapital: SeedCapital) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.createSeedCapital(dataSeedCapital)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  public createFinancingExpense(dataFinancingExpense: Expense) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.createExpense(dataFinancingExpense)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  createIncome(dataIncome: Income) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.createIncome(dataIncome)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  update(procedure: Procedure) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.updateProcedure(procedure)
        .then(success => {
          this.retrieveInstance(String(procedure.id), procedure);
          resolve(success);
        })
        .catch(reject);
    });
  }

  public updateIncome(income: Income) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.updateIncome(income)
        .then(success => {
          resolve(success);
        })
        .catch(reject);
    });
  }

  public updateExpense(expense: Expense) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.updateExpense(expense)
        .then(success => {
          resolve(success);
        })
        .catch(reject);
    });
  }

  public updateSeedCapital(seedCapital: SeedCapital) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.updateSeedCapital(seedCapital)
        .then(success => {
          resolve(success);
        })
        .catch(reject);
    });
  }

  deleteObject(procedure: Procedure) {
    return new Promise((resolve, reject) => {
      resolve();
      /*this.cuencaVerdeService.deleteProcedure(String(procedure.id))
       .then(success => {
       if (success) {
       this.removeObject(String(procedure.id));
       }
       resolve(success);
       })
       .catch(reject);*/
    });
  }

  getUsers(rolId: number): Promise<Array<User>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getUsers(rolId)
        .then(response => {
          if (response instanceof Array) {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getAllUsers(): Promise<Array<User>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllUsers()
        .then(response => {
          if (response instanceof Array) {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getActionsByPoolId(poolId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getActionsByPoolId(poolId)
        .then(response => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  getActivitiesValueByContractor(poolId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getActivitiesValueByContractor(poolId)
        .then(response => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  getPossibilityCreateTask(idTask: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getPossibilityCreateTask(idTask)
        .then(response => {
          if (String(response) === '1') {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(reject);
    });
  }

  getProcedureTasksAndPredio(idProcess: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getProcedureTasksAndPredio(idProcess)
        .then((response: any) => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  bugdetByProcess(idProcess: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.bugdetByProcess(idProcess)
        .then(response => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  getInterventionProcess(idProcess: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getInterventionProcess(idProcess)
        .then(response => {
          resolve(response);
        })
        .catch(reject);
    });
  }

  getProgramProjects(programId: string): Promise<Array<Project>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getProgramProjects(programId)
        .then(response => {
          if (response instanceof Array) {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getProjectActivities(projectId: number): Promise<Array<Activity>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getProjectActivities(projectId)
        .then(response => {
          if (response instanceof Array) {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getPredioById(predioId: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getPredioById(predioId)
        .then(response => {
          if (response instanceof PredioInfo) {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getPoolOfContractsProcedures(poolId: string): Promise<Array<Procedure>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getPoolOfContractsProcedures(poolId)
        .then(response => {
          if (response instanceof Array) {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getProceduresWithActionsForPoolForView(poolId: any): Promise<Array<Procedure>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getProceduresWithActionsForPoolForView(poolId)
        .then((response: any) => {
          if (response instanceof Array) {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getProceduresWithActionsForPool(): Promise<Array<Procedure>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getProceduresWithActionsForPool()
        .then((response: any) => {
          if (response instanceof Array) {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getPercentageData(procedureId: String): any {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getPercentageData(procedureId)
        .then(resolve)
        .catch(reject);
    });
  }

  public getAllSeedCapital(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllSeedCapital().then(resolve)
        .catch();
    });
  }

  public getAllFinancingExpenses(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getAllFinancingExpenses().then(resolve)
        .catch();
    });
  }

  public saveContractorActionsValues(contractorActionsValues: Array<ActivityValueByContractor>): any {
    const component = this;
    return new Promise((resolve, reject) => {
      resolve();
      contractorActionsValues.forEach(function (contractorActionsValue: ActivityValueByContractor) {
        if (Number(contractorActionsValue.action_value) > 0) {
          component.cuencaVerdeService.saveContractorActionsValues(contractorActionsValue)
            .then(() => {
            })
            .catch(reject);
        }
      });
    });
  }

  saveActionsByPoolChanges(actionsByPool: Array<ActionByPool>, poolId: any): any {
    const component = this;
    return new Promise((resolve, reject) => {
      component.cuencaVerdeService.saveActionsByPoolChanges(actionsByPool)
        .then(response => {
          if (response instanceof EmptyObservable) {
            reject();
          } else {
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  assignContractor(assignContractorRequest: AssignContractorRequest): any {
    const component = this;
    return new Promise((resolve, reject) => {
      component.cuencaVerdeService.assignContractor(assignContractorRequest)
        .then(resolve)
        .catch(reject);
    });
  }

  addNewActionsToPool(poolId: any, filteredProceduresToSend: Procedure[]) {
    const component = this;
    const request = CuencaVerdeServiceObjectMapper.mapProceduresToAddPoolActionsRequest(poolId, filteredProceduresToSend);
    return new Promise((resolve, reject) => {
      component.cuencaVerdeService.addNewActionsToPool(request)
        .then(resolve)
        .catch(reject);
    });
  }

  saveUnforeseenPoolValue(poolId: any, value: any) {
    const component = this;
    return new Promise((resolve, reject) => {
      component.cuencaVerdeService.saveUnforeseenPoolValue(poolId, value)
        .then(resolve)
        .catch(reject);
    });
  }
}
