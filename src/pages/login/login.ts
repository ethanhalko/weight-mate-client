import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment as ENV } from '../../../src/bin/environments/environment';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: number;
  groups: Object;
  users: Object;
  selectedUser: Object;
  invalidCredentials: Boolean;
  hasToken: Boolean;
  env = ENV.BASE_URL;
  error: string;

  constructor(
    public httpClient: HttpClient,
    private loginService: LoginServiceProvider,
    private jwtHelper: JwtHelperService,
    private navCtrl: NavController
  ) {
    if (localStorage.getItem('access_token')) {
      navCtrl.setRoot('HomePage');
    }
  }

  ionViewWillEnter() {
    if (localStorage.getItem('access_token')) {
      this.navCtrl.setRoot('UserSelectPage');
    }
  }

  sendLoginRequest() {
    this.loginService.login(this.email, this.password).subscribe(
      res => {
        localStorage.setItem('access_token', res['token']);
        this.navCtrl.setRoot('UserSelectPage', {}, { animate: true, direction: "forward" });
      },
      err => {
        console.log(err['message']);
        this.error = err['message'];
        this.invalidCredentials = err.error['error'] == 'invalid_credentials';
      });
  }

  setSelectedUser(user) {
    this.selectedUser = user;
  }
}
