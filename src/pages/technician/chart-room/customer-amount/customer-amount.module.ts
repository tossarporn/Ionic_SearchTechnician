import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerAmountPage } from './customer-amount';

@NgModule({
  declarations: [
    CustomerAmountPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerAmountPage),
  ],
})
export class CustomerAmountPageModule {}
