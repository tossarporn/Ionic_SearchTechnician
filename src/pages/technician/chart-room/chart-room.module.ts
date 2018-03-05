import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartRoomPage } from './chart-room';

@NgModule({
  declarations: [
    ChartRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartRoomPage),
  ],
})
export class ChartRoomPageModule {}
