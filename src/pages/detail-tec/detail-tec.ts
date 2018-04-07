import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {CustomerAddressPage} from '../customer-address/customer-address';
import {GetDataProvider} from '../../providers/get-data/get-data';

/**
 * Generated class for the DetailTecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-tec',
  templateUrl: 'detail-tec.html', 
})
export class DetailTecPage {
  technician_store:any={};
  show_imgs = "http://10.5.1.57";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private GetDataProvider :GetDataProvider
  ) 
    
    {
    this.technician_store = this.navParams.get("details_tec");
    console.log(this.technician_store);

    
  }
  customer_address(address_tec){
  this.navCtrl.push(CustomerAddressPage,{
    address_tec:this.technician_store
  });
 
    // console.log
  }
}
