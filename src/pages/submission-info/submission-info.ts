import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SubmissionInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submission-info',
  templateUrl: 'submission-info.html',
})
export class SubmissionInfoPage {

  message: String;
  timeout: Number;
  loggedOut: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private login: LoginServiceProvider) {
    this.message = navParams.get('message');
    this.timeout = 60000;
    this.loggedOut = false;
    //log em out 
    setTimeout(() => {
      if (!this.loggedOut) {
        this.logout();
      }
    }, this.timeout);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedOut = true;
    this.login.logout().subscribe(
      res => {
        this.navCtrl.setRoot(LoginPage, {}, { animate: true });
      },
      err => {
        this.navCtrl.setRoot(LoginPage, {}, { animate: true });
      });
  }
}
