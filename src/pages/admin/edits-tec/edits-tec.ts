import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GetDataProvider } from '../../../providers/get-data/get-data';
import {DetailsEditingTecPage} from '../details-editing-tec/details-editing-tec';
/**
 * Generated class for the EditsTecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edits-tec',
  templateUrl: 'edits-tec.html',
})
export class EditsTecPage {
  tech_editing:boolean;
  check_all:boolean;
  details_technician:any
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public AlertController:AlertController,
    private GetDataProvider:GetDataProvider
  ) 
  {
    this.tech_editing = false
    this.get_guest();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditsTecPage');
  }

  get_guest(){
    this.GetDataProvider.get_loop_details_technician()
    .then((data)=>{
        this.details_technician = data
      // console.log("data_success",this.details_technician);
    }).catch((error)=>{
      console.log("error=>",error);
    })
  }

  editing_guest(eve){
    this.navCtrl.push(DetailsEditingTecPage,
      {
      details_technician:eve
      })
      console.log(eve);
      
  }
  
    tec_delete(){
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
