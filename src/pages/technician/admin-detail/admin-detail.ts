import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private CallNumber:CallNumber
  ) 
  {


  }

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
