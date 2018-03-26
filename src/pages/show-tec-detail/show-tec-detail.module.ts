import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowTecDetailPage } from './show-tec-detail';

@NgModule({
  declarations: [
    ShowTecDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowTecDetailPage),
  ],
})
export class ShowTecDetailPageModule {}
