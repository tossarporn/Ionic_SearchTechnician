import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the SerachPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serach',
  templateUrl: 'serach.html',
})
export class SerachPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private view:ViewController) {
  }

  ionViewWillLoad() {
    // console.log('ionViewDidLoad SerachPage');
    const data = this.navParams.get('data');
    console.log(data);
  }
  closeModal(){
    const data = {
      lat:55555,
      lng:555555
    };
    this.view.dismiss(data);
  }// modal only valiable website
}
