import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Chart } from 'taucharts';
import { LoginPage } from '../login/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WeightEntriesProvider } from '../../providers/weight-entries/weight-entries';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SubmissionInfoPage } from '../submission-info/submission-info';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  unit: string;
  weight: number;
  weightData: any;
  formattedData: Object[];
  chart: Chart;
  storageProvider: Storage;
  hasToken: boolean;
  showGraph: boolean;
  name: String;

  constructor(
    public navCtrl: NavController,
    private jwt: JwtHelperService,
    private WeightEntriesService: WeightEntriesProvider,
    private alertCtrl: AlertController,
    private loginService: LoginServiceProvider
  ) {

    this.unit = "lb";
    this.weight; //get user's last entered weight
    this.weightData = [];
    this.formattedData = [];
    let token = localStorage.getItem('access_token');
    this.hasToken = token && !jwt.isTokenExpired(token);
    this.showGraph = false;
  }

  ionViewWillEnter() {
    if (!this.hasToken) return;
    this.WeightEntriesService.getWeightEntries().subscribe(
      res => {
        this.name = res['user']['first_name'] + ' ' + res['user']['last_name'];
        this.formattedData = this.WeightEntriesService.formatWeightData(res['entries']);
        if (this.formattedData.length > 0) {
          let chart = new Chart({
            data: this.formattedData,
            type: 'bar',
            x: 'date',
            y: 'weight'
          });
          this.showGraph = true;
          chart.renderTo(document.getElementById('bar'));
        }
      },
      err => console.log(err)
    );
  }

  submitWeightData() {
    this.WeightEntriesService.submitWeightEntry(this.weight).subscribe(
      res => {
        let weightData = res['weight'];
        let message = res['message'];
        this.formattedData = this.formattedData.concat(this.WeightEntriesService.formatWeightData([res]));

        this.navCtrl.setRoot(SubmissionInfoPage, { message: message }, { animate: true, direction: "forward" });
      },
      err => console.log(err)
    );
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  fix(x) {
    return x.toFixed(2);
  }

  unitChanged() {
    if (typeof this.weight == 'undefined') return;

    if (this.unit === "kg") {
      this.weight = this.fix(this.weight * 0.453592);
    } else if (this.unit === "lb") {
      this.weight = this.fix(this.weight * 2.20462);
    }
  }

  logout() {
    this.loginService.logout().subscribe(
      res => {
        localStorage.removeItem('access_token');
        this.navCtrl.setRoot(LoginPage, {}, { animate: true });
      },
      err => {
        localStorage.removeItem('access_token');
        this.navCtrl.setRoot(LoginPage, {}, { animate: true });
      });
  }
}
