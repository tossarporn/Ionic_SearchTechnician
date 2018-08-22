import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditsAdminPage } from './edits-admin';

@NgModule({
  declarations: [
    EditsAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(EditsAdminPage),
  ],
})
export class EditsAdminPageModule {}
