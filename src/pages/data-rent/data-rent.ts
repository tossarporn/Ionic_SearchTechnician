import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchPage} from '../search/search'

/**
 * Generated class for the DataRentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-rent',
  templateUrl: 'data-rent.html',
})
export class DataRentPage {
  detail_tec:any={};
  
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.detail_tec = this.navParams.get("tec_address");
    console.log('tec_address=>',this.detail_tec);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataRentPage');
  }

}
