import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDataProvider } from '../../../providers/get-data/get-data';
import { AlertController } from 'ionic-angular';
import {DetailsEdtingGuestPage} from '../details-edting-guest/details-edting-guest';

/**
 * Generated class for the EditsGuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edits-guest',
  templateUrl: 'edits-guest.html',
})
export class EditsGuestPage {
  guest_editing:boolean;
  check_all:boolean;
  details_guset:any
  constructor
  (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public AlertController:AlertController,
    private GetDataProvider:GetDataProvider
  ) 
  {
    this.guest_editing = false
    this.get_guest()
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditsGuestPage');
  }

get_guest(){
  this.GetDataProvider.get_loop_detail_guest()
  .then((data)=>{
      this.details_guset = data
    console.log("data_success",this.details_guset);
  }).catch((error)=>{
    console.log("error=>",error);
  })
}

editing_guest(){
  alert("editing_guest")
}
  guest_delete(){
    const confirm = this.AlertController.create({
      title: 'แจ้งเตือนจากระบบ',
      message: 'คุณต้องการลบข้อมูลหรือไม่?',
      buttons: [
        {
          text: 'ไม่',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  checks_all(){
    this.check_all = true
    console.log(this.check_all);
  }

}
