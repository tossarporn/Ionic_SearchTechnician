import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Storage } from '@ionic/storage';
import { GetDataProvider } from '../../../providers/get-data/get-data';

/**
 * Generated class for the AdminDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-detail',
  templateUrl: 'admin-detail.html',
})
export class AdminDetailPage {
  details_tec:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private CallNumber:CallNumber,
    private Storage:Storage,
    private GetDataProvider:GetDataProvider
  ) 
  {
   
    this.GetDataProvider.details_admin()
    .then((succ)=>{
      this.details_tec = succ
      console.log(succ);
    }).catch((err)=>{
      console.log(err);
    })
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDetailPage');
  }

  tel_admin(num){
    this.CallNumber.callNumber(num,true)
    .then((succ)=>{
      console.log("succ=>",succ);
      
    }).catch((err)=>{
      console.log("err=>",err);
    })  
  }
}
