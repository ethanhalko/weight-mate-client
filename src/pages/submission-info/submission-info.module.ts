import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmissionInfoPage } from './submission-info';

@NgModule({
  declarations: [
    SubmissionInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmissionInfoPage),
  ],
})
export class SubmissionInfoPageModule {}
