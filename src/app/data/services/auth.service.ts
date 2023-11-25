import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {Token} from '../model/token';
import {BaseService} from './base.service';
import {LogIn} from '../model/log-in';
import {tokenNotExpired} from 'angular2-jwt';
import {SessionManager} from '../managers/session.manager';
import {Http} from '@angular/http';
import {CuencaVerdeServiceObjectMapper} from './cuenca-verde-service-object-mapper';
import {reject} from 'q';

@Injectable()
export class AuthService extends BaseService {
  private CLIENT_ID = '2';

  constructor(protected http: Http, protected sessionManager: SessionManager) {
    super(http, sessionManager);
  }

  protected getSession(): Token {
    return this.sessionManager.getSession();
  }

  logIn(logIn: LogIn): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('client_id', this.CLIENT_ID);
    formData.append('client_secret', this.CLIENT_SECRET);
    formData.append('grant_type', 'password');
    formData.append('username', logIn.username);
    formData.append('password', logIn.password);
    const url = `${this.API_HOST}/oauth/token`;
    return this.http
      .post(url, formData)
      .toPromise()
      .then(CuencaVerdeServiceObjectMapper.mapResponseToToken)
      .then(this.sessionManager.setSession)
      .catch(reject);
  }

  reqPasswordReset(data: any) {
    const url = `${this.API_HOST}/forgot-password`;
    return this.http.post(url, data)
  }

  updatePassword(data: any) {
    const url = `${this.API_HOST}/update-password`;
    return this.http.post(url, data)
  }

  isAuthenticated() {
    const token = this.sessionManager.getSession();
    return tokenNotExpired(null, token != null ? token.access_token : '');
  }

  logOut() {
    this.sessionManager.deleteSession();
    const formData: FormData = new FormData();
    const url = `${this.API_HOST}/logout`;
    return this.http
      .get(url, this.cuencaHeaders)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
}
