import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TechnicianPage } from './technician';

@NgModule({
  declarations: [
    TechnicianPage,
  ],
  imports: [
    IonicPageModule.forChild(TechnicianPage),
  ],
})
export class TechnicianPageModule {}
