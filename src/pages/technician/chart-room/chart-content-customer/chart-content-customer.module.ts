import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartContentCustomerPage } from './chart-content-customer';

@NgModule({
  declarations: [
    ChartContentCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartContentCustomerPage),
  ],
})
export class ChartContentCustomerPageModule {}
