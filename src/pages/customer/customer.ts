import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,ModalController,Modal,ModalOptions } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { Select } from 'ionic-angular/components/select/select';
import { Button } from 'ionic-angular/components/button/button';
import{SerachPage} from '../customer/serach/serach';

/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App,
    private alertCtrl: AlertController,
    private modal:ModalController
  ) 
    {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }
  searchPromt(){
    // alert("search");
const myModalOption : ModalOptions = {
    enableBackdropDismiss: false
};

const myModalData = {
  lat:'tossarporn',
  lng:'supranikorn'
};
 const myModal: Modal = this.modal.create(SerachPage,{data:myModalData},myModalOption);

 myModal.present();

 myModal.onDidDismiss((data)=>{
  console.log("dimission");
  console.log(data);
 })
 myModal.onWillDismiss((data)=>{
  console.log("colse dimission");
  console.log(data);
 })// modal only valiable website
    

  }
  DataForRent(){
    alert("DataForRent");
  }
  logout(){
    // alert("logout");
    this.navCtrl.setRoot(HomePage);
    let get_logout = this.app.getRootNav();
    get_logout.setRoot(HomePage);
  }
}
