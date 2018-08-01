import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { WeightEntriesProvider } from '../providers/weight-entries/weight-entries';
import { SubmissionInfoPage } from '../pages/submission-info/submission-info';
import { SignupProvider } from '../providers/signup/signup';
import { PersonalInfoPage } from '../pages/personal-info/personal-info';
import { WeightInfoPage } from '../pages/weight-info/weight-info';
import { PinCreationPage } from '../pages/pin-creation/pin-creation';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SubmissionInfoPage,
    PersonalInfoPage,
    WeightInfoPage,
    PinCreationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    JwtModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'], // TODO: update with server domain
        blacklistedRoutes: ['localhost:3001/auth/'],
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SubmissionInfoPage,
    PersonalInfoPage,
    WeightInfoPage,
    PinCreationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpClientModule,
    IonicStorageModule,
    JwtModule,
    LoginServiceProvider,
    JwtHelperService,
    WeightEntriesProvider,
    SignupProvider,
  ]
})
export class AppModule { }
