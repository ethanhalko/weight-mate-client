import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the WeightEntriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeightEntriesProvider {

  entries: Object;

  constructor(public http: HttpClient) {
  }

  getWeightEntries() {
    let params = new HttpParams();
    let queryUrl = 'https://oev-fit-api.app/api/weight-entries/index?token=' + localStorage.getItem('access_token');

    params = params.append('token', localStorage.getItem('acess_token'));

    return this.http.get(queryUrl).map((res: Response) => {
      return res
    });
  }

  submitWeightEntry(weight) {
    let params = new HttpParams();
    params = params.append('weight', weight);
    params = params.append('token', localStorage.getItem('access_token'));

    let queryUrl = 'https://oev-fit-api.app/api/weight-entries/';

    return this.http.post(queryUrl, params).map((res: Response) => {
      return res;
    });
  }

  formatWeightData(data) {
    let formattedData = [];
    console.log(data);
    for (var i = 0; i < data.length; ++i) {
      formattedData.push({
        type: 'weight', weight: data[i].weight, date: data[i].created_at
      });
    }
    return formattedData;
  }
}
