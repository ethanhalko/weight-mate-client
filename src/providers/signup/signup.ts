import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../src/bin/environments/environment';

/*
  Generated class for the SignupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignupProvider {
  apiUrl: String = ENV.BASE_URL;

  constructor(public http: HttpClient) {
  }

  signup(userObject) {
    let params = new HttpParams();

    params = params.append('group_id', userObject.groupId);
    params = params.append('first_name', userObject.firstName);
    params = params.append('last_name', userObject.lastName);
    params = params.append('email', userObject.email);
    params = params.append('initial_weight', userObject.currentWeight);
    params = params.append('gain', userObject.goalWeight);
    params = params.append('pin', userObject.pin);

    return this.http.post(this.apiUrl + '/users/create', params).map((res: Response) => {
      return res;
    });
  }
}
