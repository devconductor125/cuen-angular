import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {BaseManager} from './base.manager';
import {CuencaVerdeService} from '../services/cuenca-verde.service';
import {BaseObject} from '../model/base-object';
import {Contractor} from '../model/contractor';
import {Procedure} from '../model/procedure';
import {Task} from '../model/task';
import {CuencaVerdeServiceObjectMapper} from '../services/cuenca-verde-service-object-mapper';

@Injectable()
export class ContractorsManager extends BaseManager {

  constructor(private cuencaVerdeService: CuencaVerdeService) {
    super();
  }

  protected getAll(): Promise<Array<BaseObject>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getContractors()
        .then(contractors => {
          resolve(CuencaVerdeServiceObjectMapper.mapContractsListToRequest(contractors));
        })
        .catch(reject);
    });
  }

  protected addAll(objects: Array<Contractor>): void {
    const component = this;
    this.clearObjects();
    objects.forEach(function (poolOfContracts: Contractor) {
      component.retrieveInstance(poolOfContracts.id, poolOfContracts);
    });
  }

  public load(objectId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getContractor(objectId)
        .then(contractor => {
          resolve(CuencaVerdeServiceObjectMapper.mapContractorObjects(contractor));
        })
        .catch(reject);
    });
  }

  create(contractor: Contractor) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.createContratista(contractor)
        .then((response) => {
          if (response.response_code === 200) {
            contractor.id = response.object_id;
            this.pool = this.unShiftPool(String(contractor.id), contractor, this.pool);
            resolve(contractor);
          } else {
            reject(response.errors[0][0]);
          }
        })
        .catch(reject);
    });
  }

  update(contractor: Contractor) {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.updateContractor(contractor)
        .then((response) => {
          if (response.response_code === 200) {
            this.clearObjects();
            this.loadAllObjects()
              .then(() => {
                this.retrieveInstance(String(contractor.id), contractor);
                resolve(response);
              });
          } else {
            reject(response.errors[0][0]);
          }
        })
        .catch(reject);
    });
  }

  deleteObject(contractor: Contractor) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  public getObjectForEdit(objectId: string): Promise<BaseObject> {
    return new Promise((resolve, reject) => {
      const contractor: Contractor = this.search(objectId);
      if (contractor && contractor.id) {
        resolve(contractor);
      } else {
        this.load(objectId)
          .then(returnedObject => {
            resolve(returnedObject);
          })
          .catch(function (error: any) {
            reject(error);
          });
      }
    });
  }

  getContractorDetails(contract_id: string): Promise<Contractor> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getContractorDetails(contract_id)
        .then(contract => resolve(contract))
        .catch(reject);
    });
  }

  getAllContractorFiles(contractor: Contractor): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getFilesContractor(contractor)
        .then(contractorFile => resolve(contractorFile))
        .catch(reject);
    });
  }
}
