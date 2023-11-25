import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Token} from '../model/token';
import {Observable} from 'rxjs/Observable';
import {SessionManager} from '../managers/session.manager';
import {environment} from '../../../environments/environment';

@Injectable()
export abstract class BaseService {
  protected API_HOST = environment.API_URL;
  protected CLIENT_SECRET = environment.CLIENT_SECRET;
  public API_URL_FILES = environment.API_URL + environment.FILES_URL;
  public API_URL_IMAGES = environment.API_URL + environment.FILES_IMAGES_URL;
  public API_URL_FILES_WITH_TOKEN = environment.API_URL + environment.FILES_URL_WITH_TOKEN;
  public API_URL_IMAGES_WITH_TOKEN = environment.API_URL + environment.IMAGES_URL_WITH_TOKEN;
  public API_URL_IMG = environment.IMAGES_URL;
  public API_IMAGES_URL_CUENCA = environment.API_URL + environment.IMAGES_URL_CUENCA;

  private auth: Token;
  protected cuencaHeaders: Headers;
  protected cuencaHeadersJson: Headers;
  protected cuencaHeadersUpload: Headers;

  constructor(protected http: Http, protected sessionManager: SessionManager) {
    this.initToken();
  }

  initToken() {
    this.cuencaHeaders = new Headers({});
    this.cuencaHeadersJson = new Headers({});
    this.cuencaHeadersUpload = new Headers({});
    this.auth = this.getSession();
    if (this.auth) {
      this.cuencaHeaders.append('Authorization', this.getAuthToken());
      this.cuencaHeadersJson.append('Authorization', this.getAuthToken());
      this.cuencaHeadersJson.append('Content-Type', 'application/json');
      this.cuencaHeadersUpload.append('Authorization', this.getAuthToken());
    }
  }

  protected getAuthToken(): string {
    const auth: Token = this.getSession();
    return 'Bearer ' + auth.access_token;
  }

  protected handleError(error: any): Observable<any> {
    return Observable.empty(error);
  }

  protected getSession(): Token {
    return this.sessionManager.getSession();
  }
}
