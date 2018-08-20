import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PinCreationPage } from '../pin-creation/pin-creation';

/**
 * Generated class for the WeightInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-weight-info',
  templateUrl: 'weight-info.html',
})
export class WeightInfoPage {

  userInfo: Object;
  currentWeight: Number;
  goal: String = 'lose';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userInfo = navParams.get('userInfo');
  }

  next() {
    this.userInfo['currentWeight'] = this.currentWeight;
    this.userInfo['gain'] = this.goal == 'gain' ? true : false;

    this.navCtrl.push(PinCreationPage, { 'userInfo': this.userInfo }, { animate: true });
  }

}