import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { HomePage } from '../home/home';
import { UserSearchProvider } from '../../providers/user-search/user-search';
import { BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';

/**
 * Generated class for the UserSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    this.navCtrl.push(HomePage, { 'user': user });
  }

  search(name) {
    this.userSearch.userSearch(name).subscribe(res => {
      this.users = res;
    });
  }

  scan() {
    this.barcodeScanner.scan(
      {
        preferFrontCamera: true,
        showFlipCameraButton: false
      }
    ).then(barcodeData => {
      this.userSearch.scan(barcodeData).subscribe(res => {
        this.alertCtrl.create({
          title: 'Error!',
          subTitle: res['user'],
          buttons: ['OK']
        }).present();
        this.selectUser(res['user']);
      });
    }).catch(err => {
      this.alertCtrl.create({
        title: 'Error!',
        subTitle: err,
        buttons: ['OK']
      }).present();
    });
  }
}
