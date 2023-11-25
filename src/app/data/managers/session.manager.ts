import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {Token} from '../model/token';
import {Strings} from '../utils/strings';

@Injectable()
export class SessionManager {

  setSession(token: Token) {
    localStorage.setItem(Strings.AUTH_TOKEN, JSON.stringify(token));
  }

  getSession() {
    return <Token>JSON.parse(localStorage.getItem(Strings.AUTH_TOKEN));
  }

  deleteSession() {
    localStorage.removeItem(Strings.AUTH_TOKEN);
    localStorage.removeItem('profile');
  }
}
