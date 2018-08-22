import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditsGuestPage } from './edits-guest';

@NgModule({
  declarations: [
    EditsGuestPage,
  ],
  imports: [
    IonicPageModule.forChild(EditsGuestPage),
  ],
})
export class EditsGuestPageModule {}
