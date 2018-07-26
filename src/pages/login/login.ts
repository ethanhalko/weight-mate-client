import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { HomePage } from '../home/home';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  http: HttpClient;
  email: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    private loginService: LoginServiceProvider,
    private jwtHelper: JwtHelperService
  ) {
    this.http = httpClient;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  sendLoginRequest() {
    this.loginService.login(this.email, this.password);

    let token = localStorage.getItem('access_token');
    if (token) {
      this.navCtrl.setRoot(HomePage);
    }
  }
}
