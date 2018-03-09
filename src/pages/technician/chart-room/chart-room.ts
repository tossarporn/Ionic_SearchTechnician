import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChartContentCustomerPage}from '../chart-room/chart-content-customer/chart-content-customer';
import{EquipmentMountPage} from'../chart-room/equipment-mount/equipment-mount'
import {CustomerAmountPage} from '../chart-room/customer-amount/customer-amount';


/**
 * Generated class for the ChartRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart-room',
  templateUrl: 'chart-room.html',
})
export class ChartRoomPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartRoomPage');
  }
customer_rating(){
  // alert("customer_rating");
  this.navCtrl.push(ChartContentCustomerPage);
}
equipment_mont(){
  // alert("equipment_mont");
  this.navCtrl.push(EquipmentMountPage);
}
customer_amount(){
  // alert("customer_amount");
  this.navCtrl.push(CustomerAmountPage);
}
}
