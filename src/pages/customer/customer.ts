import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import {SearchPage} from '../search/search'
import {DataRentPage} from '../data-rent/data-rent'
import { HomePage } from '../home/home';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import {CustomerAddressPage} from '../customer-address/customer-address';
import{LogoutPage}from '../logout/logout';
import { Storage } from '@ionic/storage';


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
  // DatarentEnabled = false;//tabEnable
  // details_guest:any={};
  
  constructor(
    public navCtrl: NavController,
    public app:App,
    public NavParams:NavParams,
    private storage: Storage
  ) 
    {
this.searchRoot = SearchPage;
this.dataRentRoot = DataRentPage;


      // let data_user= this.NavParams.get('detail_user');
      // console.log('user=>',data_user);
      storage.get('guest').then((val)=>{
        let data_guest = val
          console.log('customer_page=>',data_guest);
      })
      
  }
  logout(){
    this.navCtrl.setRoot(HomePage);
    let NavLogout = this.app.getRootNav();
    NavLogout.setRoot(HomePage);
  }
}
