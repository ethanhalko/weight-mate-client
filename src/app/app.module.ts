import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { WeightEntriesProvider } from '../providers/weight-entries/weight-entries';
import { SignupProvider } from '../providers/signup/signup';
import { UserSearchProvider } from '../providers/user-search/user-search';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    MyApp,
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
    UserSearchProvider,
    BarcodeScanner
  ]
})
export class AppModule { }
