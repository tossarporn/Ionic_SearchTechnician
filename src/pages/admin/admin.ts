import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {HomePage} from '../home/home';
import { Storage } from '@ionic/storage';
import {EditsAdminPage} from '../admin/edits-admin/edits-admin';
import {EditsGuestPage} from '../admin/edits-guest/edits-guest';
import {EditsTecPage} from '../admin/edits-tec/edits-tec';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public app:App,
  ) 
  {
    this.storage.get('admin')
    .then((val)=>{
      console.log(val);
      
    }).catch((err)=>{
      console.log(err);
    })

  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  edit_guest(){
    this.navCtrl.push(EditsGuestPage);
  }

  edit_tec(){
    this.navCtrl.push(EditsTecPage);
  }
  edit_admin(){
    this.navCtrl.push(EditsAdminPage);
  }

  logout(){
    this.navCtrl.setRoot(HomePage);
    let nav_logout = this.app.getRootNav();
    nav_logout.setRoot(HomePage);
  }
}
