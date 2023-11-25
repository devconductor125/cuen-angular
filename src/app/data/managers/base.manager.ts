import 'rxjs/add/operator/toPromise';
import {BaseObject} from '../model/base-object';

export abstract class BaseManager {
  protected pool = {};

  constructor() {
  }

  public retrieveInstance(objectId: string, object: object): object {
    this.pool[objectId] = object;
    return this.pool[objectId];
  }

  search(objectId: string) {
    return this.pool[objectId];
  }

  addObject(objectId: string, object: object): void {
    this.retrieveInstance(objectId, object);
  }

  public abstract load(objectId: string): Promise<any>;

  protected abstract create(object: any, users: any): Promise<any>;

  protected abstract update(extras: object, object: any): Promise<any>;

  protected abstract deleteObject(object: any): Promise<any>;

  fetchObject(objectId: string): any {
    return this.search(objectId);
  }

  getObject(objectId: string): Promise<any> {
    const component = this;
    return new Promise((resolve, reject) => {
      const object = this.search(objectId);
      if (object) {
        resolve(object);
      } else {
        component.load(objectId)
          .then(returnedObject => {
            resolve(returnedObject);
          })
          .catch(function (error: any) {
            reject(error);
          });
      }
    });
  }

  public abstract getObjectForEdit(objectId: string): Promise<BaseObject>;

  protected abstract getAll(): Promise<Array<BaseObject>>;

  loadAllObjects(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      const objects = this.getObjectsFromCache();
      if (objects.length > 0) {
        objects.reverse();
        resolve(objects);
      } else {
        this.getAll()
          .then(returnedObjects => {
            if (returnedObjects instanceof Array) {
              this.addAll(returnedObjects);
              resolve(returnedObjects);
            }
          })
          .catch(function (error: any) {
            reject(error);
          });
      }
    });
  }

  protected abstract addAll(objects: Array<object>): void;

  getObjectsFromCache(): Array<any> {
    const objects = [];
    for (const poolObject in this.pool) {
      if (poolObject) {
        objects.push(this.pool[poolObject]);
      }
    }
    return objects;
  }

  unShiftPool(key: string, instance: object, pool: object): {} {
    const keys = Object.keys(pool);
    const tempObjectsList: Array<object> = [];
    keys.forEach(function (tempKey: string) {
      tempObjectsList.push(pool[tempKey]);
    });
    const tempPool = {};
    tempPool[key] = instance;
    tempObjectsList.forEach(function (object: any) {
      tempPool[object.id] = object;
    });
    return tempPool;
  }

  protected removeObject(objectId: string) {
    delete this.pool[objectId];
  }

  public clearObjects() {
    this.pool = {};
  }
}
