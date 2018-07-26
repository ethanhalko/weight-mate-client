import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {
  apiUrl = 'http://oev-fit-api.app/api';

  constructor(public http: HttpClient) {

  }

  login(email, password) {
    let body = {
      email: email,
      password: password
    };
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);

    return this.http.post(this.apiUrl + '/authenticate', params).subscribe(data => {
      localStorage.setItem('access_token', data['token']);
    });
  }
}


