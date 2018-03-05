import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {BulidRoomPage} from '../technician/bulid-room/bulid-room';
import { HomePage } from '../home/home';
import {ChartRoomPage} from '../technician/chart-room/chart-room';
/**
 * Generated class for the TechnicianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-technician',
  templateUrl: 'technician.html',
})
export class TechnicianPage {

  constructor(public navCtrl: NavController, public navParams: NavParams ,public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechnicianPage');
  }
  bulid_room(){
    this.navCtrl.push(BulidRoomPage);
  }
  chart_room(){
    this.navCtrl.push(ChartRoomPage);
    // alert("55555");
  }
  logout(){
    this.navCtrl.setRoot(HomePage);
    let nav_logout = this.app.getRootNav();
    nav_logout.setRoot(HomePage);
    
  }
}
