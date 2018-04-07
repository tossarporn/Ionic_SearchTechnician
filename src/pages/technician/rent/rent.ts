import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rent',
  templateUrl: 'rent.html',
})
export class RentPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  
  {

    // this.detail_tec = this.navParams.get("tec_address");
    // console.log('tec_address=>',this.detail_tec);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentPage');
  }

}
