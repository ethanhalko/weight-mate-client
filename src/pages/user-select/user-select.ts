import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginServiceProvider) {
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

}
