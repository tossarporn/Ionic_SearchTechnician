import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GetDataProvider } from '../../../providers/get-data/get-data';
import {AdminPage} from '../admin'
/**
 * Generated class for the EditsAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edits-admin',
  templateUrl: 'edits-admin.html',
})
export class EditsAdminPage {
  details_tec:any
  data_area :any
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private Storage:Storage,
    private GetDataProvider:GetDataProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) 
  {
    
    this.show_area();
    this.get_admin();
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditsAdminPage');
  }

  get_admin(){
    this.GetDataProvider.details_admin()
    .then((succ)=>{
      this.details_tec = succ
      console.log(this.details_tec);
    }).catch((err)=>{
      console.log(err);
    })
  }
  show_area() {
    this.GetDataProvider.show_area()
      .then((data) => {
        this.data_area = data;
        console.log('area_success=>', this.data_area); 
      })
      .catch((error) => {
        console.log('area_error=>', error)
      });//show_area
  }

  submit(num){

    let alert = this.alertCtrl.create({
      title: 'ต้องการที่จะทำการอัปเดตข้อมูลหรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.GetDataProvider.update_admin(
              num.id,
              num.user_admin,
              num.password_admin,
              num.tel_admin,
              num.account_bank_admin,
              num.number_house_admin,
              num.street_admin,
              num.distric_admin,
              num.area_admin,
            )
            .then((val)=>{
              let data_val:any = val
              let message_val = data_val.message
              console.log("message_val=>",message_val);
              
              setTimeout(() => {
                const confirm = this.alertCtrl.create({
                  title: message_val,
                  buttons: [
                    {
                      text: 'ตกลง',
                      handler: () => {
                        this.navCtrl.push(AdminPage);
                      }
                    }
                  ]
                });
                confirm.present();
                loading.dismiss();
              }, 3000);
            }).catch((err)=>{
              console.log(err);
            })
            let loading = this.loadingCtrl.create({
              content: 'กรุณารอสักครู่'
            });
          
            loading.present();
          }
        }
      ]
    });
    alert.present();
    
    // let id_admin = num.id
    // let username = num.user_admin
    // let password = num.password_admin
    // let tel = num.tel_admin
    // let account = num.account_bank_admin 
    // let num_houst = num.number_house_admin
    // let street = num.street_admin 
    // let distric = num.distric_admin
    // let area = num.area_admin   
    // console.log(num.user_admin);
    // console.log(id_admin);
  }
}
