import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { HomePage } from '../home/home';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PersonalInfoPage } from '../personal-info/personal-info';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  pin: number;
  groups: Object;
  users: Object;
  selectedUser: Object;
  invalidCredentials: Boolean;

  constructor(
    public httpClient: HttpClient,
    private loginService: LoginServiceProvider,
    private jwtHelper: JwtHelperService,
    private navCtrl: NavController
  ) {
    this.getGroups();

    if (localStorage.getItem('access_token')) {
      navCtrl.setRoot(HomePage);
    }
  }

  sendLoginRequest() {
    this.loginService.login(this.selectedUser, this.pin).subscribe(
      res => {
        localStorage.setItem('access_token', res['token']);
        this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: "forward" });
      },
      err => {
        this.invalidCredentials = err.error['error'] == 'invalid_credentials';
      });
  }

  setSelectedUser(user) {
    this.selectedUser = user;
  }

  getGroups() {
    this.loginService.getGroups().subscribe(res => {
      this.groups = res;
    });
  }

  getUsers(group) {
    this.loginService.getGroupUsers(group).subscribe(res => {
      this.users = res;
    })
  }

  goToSignup() {
    this.navCtrl.push(PersonalInfoPage);
  }
}
