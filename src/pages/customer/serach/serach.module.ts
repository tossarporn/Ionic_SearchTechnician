import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SerachPage } from './serach';

@NgModule({
  declarations: [
    SerachPage,
  ],
  imports: [
    IonicPageModule.forChild(SerachPage),
  ],
})
export class SerachPageModule {}
