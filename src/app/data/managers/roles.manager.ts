import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {CuencaVerdeService} from '../services/cuenca-verde.service';
import Role = roleInterface.Role;
import {BaseObject} from '../model/base-object';

@Injectable()
export class RolesManager {
  public userRoles: Array<number> = [];
  private roles: Array<Role>;
  private openRoles: Array<Role>;

  constructor(private cuencaVerdeService: CuencaVerdeService) {
  }

  searchUserRoles(): Promise<Array<BaseObject>> {
    return new Promise((resolve, reject) => {
      if (this.userRoles.length > 0) {
        resolve(this.userRoles);
      } else {
        this.cuencaVerdeService.getRoleUser()
          .then((response) => {
            if (response instanceof Array) {
              if (response.length > 0 && response[0].role) {
                this.userRoles.push(Number(response[0].role));
                resolve(this.userRoles);
              }
            }
          }, function (reason) {
            reject(reason);
          });
      }
    });
  }

  resetRoles() {
    this.roles = null;
  }

  getAllRolesSpecialTask(): Promise<Array<Role>> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getOpenRoles()
        .then(response => {
          if (response instanceof Array) {
            this.roles = response;
            resolve(response);
          }
        })
        .catch(reject);
    });
  }

  getAllRoles(): Promise<Array<Role>> {
    return new Promise((resolve, reject) => {
      if (this.roles != null) {
        resolve(this.roles);
      } else {
        this.cuencaVerdeService.getRoles()
          .then(response => {
            if (response instanceof Array) {
              this.roles = response;
              resolve(response);
            }
          })
          .catch(reject);
      }
    });
  }

  getOpenRoles(): Promise<Array<Role>> {
    return new Promise((resolve, reject) => {
      if (this.openRoles != null) {
        resolve(this.openRoles);
      } else {
        this.cuencaVerdeService.getOpenRoles()
          .then(response => {
            if (response instanceof Array) {
              this.openRoles = response;
              resolve(response);
            }
          })
          .catch(reject);
      }
    });
  }

  getRolesEquipo(): Promise<Array<Role>> {
    return new Promise((resolve, reject) => {
      if (this.roles != null) {
        resolve(this.roles);
      } else {
        this.cuencaVerdeService.getRolesEquipo()
          .then(response => {
            if (response instanceof Array) {
              this.roles = response;
              resolve(response);
            }
          })
          .catch(reject);
      }
    });
  }
}
