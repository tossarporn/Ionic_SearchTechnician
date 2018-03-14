import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CustomerAmountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-amount',
  templateUrl: 'customer-amount.html',
})
export class CustomerAmountPage {
  event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerAmountPage');
  }
  public ChartsLables:string[] = ['มกราคม','กุมภาพันธ','มีนาคม  ']
public ChartsData:number[] = [10,20,100]
public ChartsType:string = "doughnut"

}
