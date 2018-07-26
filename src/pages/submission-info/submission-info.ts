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

  constructor(public navCtrl: NavController, public navParams: NavParams, private login: LoginServiceProvider) {
    this.message = navParams.get('message');

    //log em out 
    setTimeout(() => {
      this.logout();
    }, 60000);
  }

  logout() {
    localStorage.removeItem('access_token');
    //send logout request to server
    this.navCtrl.setRoot(LoginPage);
  }
}
