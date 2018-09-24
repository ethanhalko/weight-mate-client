import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { UserSearchProvider } from '../../providers/user-search/user-search';
import { BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';
import * as _ from 'lodash';

/**
 * Generated class for the UserSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-select',
  templateUrl: 'user-select.html',
})
export class UserSelectPage {

  users: Object;

  constructor(public navCtrl: NavController,
    private loginService: LoginServiceProvider,
    private userSearch: UserSearchProvider,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController) {
    this.getUsers();
  }

  getUsers() {
    this.loginService.getUsers().subscribe(res => {
      this.users = res;
    })
  }

  selectUser(user) {
    this.navCtrl.push('HomePage', { 'user': user });
  }

  search(name) {
    this.userSearch.userSearch(name).subscribe(res => {
      this.users = res;
    });
  }

  doRefresh(refresher) {
    this.getUsers();

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  scan() {
    this.barcodeScanner.scan(
      {
        preferFrontCamera: true,
        showFlipCameraButton: false
      }
    ).then(barcodeData => {
      if (!_.isNil(barcodeData['text'])) {
        this.selectUser(_.find(this.users, { 'barcode': barcodeData['text'] }));
      } else {
        this.alertCtrl.create({
          title: 'User not found',
          subTitle: 'There was no user found associated with the barcode. Try searching the users name instead.',
          buttons: ['OK']
        }).present();
      }
    });
  }
}
