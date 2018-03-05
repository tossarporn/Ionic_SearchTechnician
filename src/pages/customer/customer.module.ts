import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerPage } from './customer';

@NgModule({
  declarations: [
    CustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerPage),
  ],
})
export class CustomerPageModule {}
