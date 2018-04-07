import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import {SearchPage} from '../search/search'
import {DataRentPage} from '../data-rent/data-rent'
import { HomePage } from '../home/home';
/**
 * Generated class for the CustomerPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html'
})
export class CustomerPage {

  searchRoot = SearchPage;
  dataRentRoot = DataRentPage;

  DatarentEnabled = false;//tabEnable

  
  constructor(public navCtrl: NavController,public app:App) {
this.searchRoot = SearchPage;
this.dataRentRoot = DataRentPage;

  }
  logout(){
    this.navCtrl.setRoot(HomePage);
    let NavLogout = this.app.getRootNav();
    NavLogout.setRoot(HomePage);
  }
}
