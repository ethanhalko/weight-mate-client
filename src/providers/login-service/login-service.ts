import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../src/bin/environments/environment';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {
  apiUrl: String = ENV.BASE_URL;

  constructor(public http: HttpClient) {

  }

  login(email, password) {
    let params = new HttpParams();

    params = params.append('email', email);
    params = params.append('password', password);

    return this.http.post(this.apiUrl + '/authenticate', params).map((res: Response) => {
      return res;
    });
  }

  logout() {
    let queryUrl = this.apiUrl + '/logout?token=' + localStorage.getItem('access_token');

    return this.http.get(queryUrl).map((res: Response) => {
      return res;
    });
  }

  getGroups() {
    return this.http.get(this.apiUrl + '/groups/index').map((res: Response) => {
      return res;
    });
  }

  getUsers() {
    let query = this.apiUrl + '/users/';

    return this.http.get(query).map((res: Response) => {
      return res;
    });
  }
}


