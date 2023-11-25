import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {BaseManager} from './base.manager';
import {CuencaVerdeService} from '../services/cuenca-verde.service';
import {BaseObject} from '../model/base-object';
import {PoolOfContracts} from '../model/pool-of-contracts';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Injectable()
export class PoolOfContractsManager extends BaseManager {

  constructor(private cuencaVerdeService: CuencaVerdeService) {
    super();
  }

  protected getAll(): Promise<Array<BaseObject>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getPoolsOfContracts()
        .then(poolsOfContracts => {
          resolve(poolsOfContracts.reverse());
        })
        .catch(reject);
    });
  }

  getTypeContractorPool() {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getTypeContractorPool()
        .then(response => {
            resolve(response);
        })
        .catch(reject);
    });
  }

  getFilesContractorPool(idPool: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getFilesContractorPool(idPool)
        .then(response => {
            resolve(response);
        })
        .catch(reject);
    });
  }

  getCostByPoolId(idPool: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getCostByPoolId(idPool)
        .then(response => {
            resolve(response);
        })
        .catch(reject);
    });
  }

  getThirdBudgetByPoolId(idPool: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getThirdBudgetByPoolId(idPool)
        .then(response => {
            resolve(response);
        })
        .catch(reject);
    });
  }

  existThirdBudget(idPool: string) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.existThirdBudget(idPool)
        .then(response => {
            resolve(response);
        })
        .catch(reject);
    });
  }

  protected addAll(objects: Array<PoolOfContracts>): void {
    const component = this;
    this.clearObjects();
    objects.forEach(function (poolOfContracts: PoolOfContracts) {
      component.retrieveInstance(poolOfContracts.id, poolOfContracts);
    });
  }

  public load(objectId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getPoolOfContracts(objectId)
        .then(poolOfContracts => {
          this.retrieveInstance(String(poolOfContracts.id), poolOfContracts);
          resolve(poolOfContracts);
        })
        .catch(reject);
    });
  }

  create(poolOfContracts: PoolOfContracts) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.createPoolOfContracts(poolOfContracts)
        .then((response) => {
          if (response.response_code === 200) {
            this.clearObjects();
            this.loadAllObjects()
              .then(() => {
                resolve(true);
              });
          }
        })
        .catch(reject);
    });
  }

  update(poolOfContracts: any, objeto: any) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.updatePoolOfContracts(objeto)
        .then((response: any) => {
          if (response.response_code === 200) {
            this.clearObjects();
            this.loadAllObjects()
              .then(() => {
                // this.retrieveInstance(String(poolOfContracts.id), poolOfContracts);
                resolve();
              });
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  deleteObject(poolOfContracts: PoolOfContracts) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public getObjectForEdit(objectId: string): Promise<BaseObject> {
    return new Promise((resolve, reject) => {
      this.load(objectId)
          .then(returnedObject => {
            resolve(returnedObject);
          })
          .catch(function (error: any) {
            reject(error);
          });
    });
  }

  public downloadExcelContracts(dateFrom: string, dateTo: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getExcelContracts(dateFrom, dateTo)
        .then(excel => {
          if (!(excel instanceof ErrorObservable)) {
            resolve(excel);
          }
        })
        .catch(reject);
    });
  }
}
