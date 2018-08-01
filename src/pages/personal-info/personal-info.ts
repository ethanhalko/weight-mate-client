import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeightInfoPage } from '../weight-info/weight-info';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

/**
 * Generated class for the PersonalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html',
})
export class PersonalInfoPage {

  group: Number;
  firstName: String;
  lastName: String;
  email: String;
  groups: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginServiceProvider) {
    this.getGroups();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoPage');
  }

  getGroups() {
    this.loginService.getGroups().subscribe(res => {
      this.groups = res;
    });
  }

  next() {
    let userInfo = {
      'groupId': this.group,
      'firstName': this.firstName,
      'lastName': this.lastName,
      'email': this.email,
    }

    this.navCtrl.push(WeightInfoPage, { userInfo: userInfo }, { animate: true });
  }
}
