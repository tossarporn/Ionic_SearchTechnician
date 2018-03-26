import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Dialogs } from '@ionic-native/dialogs';

import {SearchPage} from '../pages/search/search'
import {ShowTecDetailPage} from '../pages/show-tec-detail/show-tec-detail'
import {SearchEquipmentPage} from '../pages/search-equipment/search-equipment'
import {CustomerPage} from '../pages/customer/customer';
import { HomePage } from '../pages/home/home';
import {TechnicianPage} from'../pages/technician/technician';
import {ChartContentCustomerPage}from '../pages/technician/chart-room/chart-content-customer/chart-content-customer';
@Component({
  templateUrl: 'app.html'
})
export class MyApp { 
  rootPage:any = SearchPage; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,dialog:Dialogs) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

