import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { SearchPage } from '../search/search'
import { DataRentPage } from '../data-rent/data-rent'
import { HomePage } from '../home/home';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { CustomerAddressPage } from '../customer-address/customer-address';
import { Storage } from '@ionic/storage';
import {HttpClient} from '@angular/common/http';

/**
 * Generated class for the CustomerPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  searchRoot = SearchPage;
  dataRentRoot = DataRentPage;
  ip_address = "http://10.5.18.56/";
  get_details:string=this.ip_address+"Final_Project/service/get_detailTech.php";
  // mapTabEnabled = false;
  // DatarentEnabled = false;//tabEnable
  // details_guest:any={};
  tab: any;
  tech_details:any;
  constructor(
    public navCtrl: NavController,
    public app: App,
    public NavParams: NavParams,
    private storage: Storage,
    private http: HttpClient,
  ) {
    this.searchRoot = SearchPage;
    this.dataRentRoot = DataRentPage;
  }//constructor


  logout() {
    this.navCtrl.setRoot(HomePage);
    let NavLogout = this.app.getRootNav();
    NavLogout.setRoot(HomePage);
  }
}
