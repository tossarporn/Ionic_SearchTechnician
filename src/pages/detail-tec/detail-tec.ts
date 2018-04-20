import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {CustomerAddressPage} from '../customer-address/customer-address';
import {GetDataProvider} from '../../providers/get-data/get-data';
import { Storage } from '@ionic/storage';

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
  show_imgs = "http://192.168.1.42";
  guest:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private GetDataProvider :GetDataProvider,
    private storage: Storage
  ) 
    
    {
    this.technician_store = this.navParams.get("details_tec");
    // this.guest = this.navParams.get("data_guest")
    console.log("details_tec",this.technician_store);
    // console.log("details_guest",this.guest);

    // 

    
  }
  customer_address(address_tec){
  // this.navCtrl.push(CustomerAddressPage,{
  //   address_tec:this.technician_store,
  //   data_guest:this.guest

  // });
  this.storage.get('guest').then((val)=>{
    let data_guest = val;
    this.navCtrl.push(CustomerAddressPage,{
      address_tec:this.technician_store
    })
    console.log('detail_tec_page=>',data_guest);
  })
  
    // console.log("guest_sending=>",this.guest)
  }
}
