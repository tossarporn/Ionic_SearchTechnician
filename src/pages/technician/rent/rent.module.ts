import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentPage } from './rent';

@NgModule({
  declarations: [
    RentPage,
  ],
  imports: [
    IonicPageModule.forChild(RentPage),
  ],
})
export class RentPageModule {}
