import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GetDataProvider } from '../../../providers/get-data/get-data';
import {DetailsEditingTecPage} from '../details-editing-tec/details-editing-tec';
import {AdminPage} from '../admin';
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
  ref_tec:any;
  loop_id: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public AlertController:AlertController,
    private GetDataProvider:GetDataProvider,
    public loadingCtrl: LoadingController
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
      console.log("data_success",this.details_technician);
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
  back_technician(){
    this.navCtrl.push(AdminPage);
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
              this.GetDataProvider.delete_tec(
                this.ref_tec
              )
                .then((success) => {
                  let loading = this.loadingCtrl.create({
                    content: 'กรุณารอสักครู่...',
                    spinner: 'bubbles'
                  });
  
                  loading.present();
  
                  setTimeout(() => {
                    let details_message: any = success
                    let message_success = details_message.message
                    const confirm = this.AlertController.create({
                      title: 'แจ้งเตือนจากระบบ?',
                      message: message_success,
                      buttons: [
                        {
                          text: 'ตกลง',
                          handler: () => {
                            this.navCtrl.setRoot(this.navCtrl.getActive().component);//refresh page
                            console.log('Agree clicked');
                          }
                        }
                      ]
                    });
                    confirm.present();
  
                    loading.dismiss();
                  }, 1000);
                  console.log(success);
                  
                }).catch((err) => {
                  console.log(err);
                })
              console.log(this.ref_tec);
            }
          }
        ]
      });
      confirm.present();

    }//tec_delete

    tec_delete_all(){
      const delete_all = this.AlertController.create({
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
              let loading = this.loadingCtrl.create({
                content: 'กรุณารอสักครู่...',
                spinner: 'bubbles'
              });
  
              loading.present();
  
              setTimeout(() => {
  
                const confirm = this.AlertController.create({
                  title: 'แจ้งเตือนจากระบบ',
                  message: 'ลบข้อมูลสำเร็จ',
                  buttons: [
                    {
                      text: 'ตกลง',
                      handler: () => {
                        // console.log('Agree clicked');
                      }
                    }
                  ]
                });
                confirm.present();
                this.GetDataProvider.delete_guest
                loading.dismiss();
              }, 3000);
              for (let i=0;i<this.details_technician.length;i++) {
                this.loop_id = this.details_technician[i].ref_regis_tec
  
                this.GetDataProvider.delete_tec(
                  this.loop_id
                )
                  .then((success) => {
                    this.details_technician.splice(i)
                    console.log(success);
                  }).catch((err) => {
                    console.log(err);
                  })
                console.log(this.loop_id);
              }
            }
          }
        ]
      });
      delete_all.present();

    }//tec_delete_all
  
    checks_all(){
      this.check_all = true
      console.log(this.check_all);
    }

    id_value(val){
      this.ref_tec = val
      // console.log(this.ref_tec);
    }
}
