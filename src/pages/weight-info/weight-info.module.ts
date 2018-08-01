import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeightInfoPage } from './weight-info';

@NgModule({
  declarations: [
    WeightInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(WeightInfoPage),
  ],
})
export class WeightInfoPageModule {}
