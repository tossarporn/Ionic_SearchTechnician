import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminDetailPage } from './admin-detail';

@NgModule({
  declarations: [
    AdminDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminDetailPage),
  ],
})
export class AdminDetailPageModule {}
