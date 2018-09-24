import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../src/bin/environments/environment';

/*
  Generated class for the UserSearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserSearchProvider {
  apiUrl: String = ENV.BASE_URL;

  constructor(public http: HttpClient) { }

  userSearch(name) {
    let queryUrl = this.apiUrl + '/users/search?q='
      + name
      + '&token=' + localStorage.getItem('access_token');

    return this.http.get(queryUrl).map((res: Response) => {
      return res;
    });
  }

  scan(barcode) {
    let queryUrl = this.apiUrl + '/users/scan?barcode='
      + barcode
      + '&token=' + localStorage.getItem('access_token');

    return this.http.get(queryUrl).map((res: Response) => {
      return res;
    });
  }
}
