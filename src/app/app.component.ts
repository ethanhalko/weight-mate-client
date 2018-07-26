import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  hasAuth: boolean;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private jwt: JwtHelperService) {
    this.initializeApp();
    let token = localStorage.getItem('access_token');
    this.hasAuth = token && !jwt.isTokenExpired(token);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  login() {
    if (!this.hasAuth) {
      this.nav.setRoot(LoginPage);
    }
  }

  logout() {
    if (this.hasAuth) {
      localStorage.removeItem('access_token');
      //send logout request to server
      this.nav.setRoot(LoginPage);
    }
  }
}
