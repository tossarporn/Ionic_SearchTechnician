import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchEquipmentPage } from './search-equipment';

@NgModule({
  declarations: [
    SearchEquipmentPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchEquipmentPage),
  ],
})
export class SearchEquipmentPageModule {}
