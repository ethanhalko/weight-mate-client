import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupProvider } from '../../providers/signup/signup';
import { HomePage } from '../home/home';

/**
 * Generated class for the PinCreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pin-creation',
  templateUrl: 'pin-creation.html',
})
export class PinCreationPage {

  userInfo: Object;
  pin: String;
  pinConfirmation: String;
  pinValidationMessages: String[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private signupService: SignupProvider) {
    this.userInfo = navParams.get('userInfo');
    this.pinValidationMessages = [];
    this.pin = '';
    this.pinConfirmation = '';
  }

  comparePINs() {
    this.pinValidationMessages = [];
    if (this.pin !== this.pinConfirmation) {
      this.pinValidationMessages.push('PINs must match!');
    };
    if (this.pin.toString().length !== 6) {
      console.log(this.pin.toString().length);
      this.pinValidationMessages.push('PIN must be 6 digits!');
    }
  }

  submit() {
    console.log(this.checkPin());

    if (!this.checkPin()) {
      return;
    }

    this.userInfo['pin'] = this.pin;
    this.userInfo['pinConfirmation'] = this.pinConfirmation;

    this.signupService.signup(this.userInfo).subscribe(res => {
      if (res['token']) {
        localStorage.setItem('access_token', res['token']);
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  checkPin() {
    return this.pin.length == 6 &&
      this.pinConfirmation.length == 6 &&
      this.pinValidationMessages.length <= 0;
  }
}
