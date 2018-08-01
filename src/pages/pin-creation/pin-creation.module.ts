import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinCreationPage } from './pin-creation';

@NgModule({
  declarations: [
    PinCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(PinCreationPage),
  ],
})
export class PinCreationPageModule {}
