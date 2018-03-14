import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Dialogs } from '@ionic-native/dialogs';


import { HomePage } from '../pages/home/home';
import {CustomerPage} from'../pages/customer/customer';
import {TechnicianPage} from'../pages/technician/technician';
import {ChartContentCustomerPage}from '../pages/technician/chart-room/chart-content-customer/chart-content-customer';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = CustomerPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,dialog:Dialogs) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

