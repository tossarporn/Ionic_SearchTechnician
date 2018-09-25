import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import{GetDataProvider} from'../../../providers/get-data/get-data';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {CallNumber } from '@ionic-native/call-number';
import {Badge} from '@ionic-native/badge';
import {TechnicianPage} from '../technician';
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
    get_for_rent:string="";
    res:any;
    get_result:any;
    editing = false;
    check_all:boolean;
    rent_val:any;
    loop_id:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private getDataProvider:GetDataProvider,
    private http:HttpClient,
    private storage:Storage,
    private callNumber: CallNumber,
    private badge:Badge,
    public AlertController:AlertController,
    public loadingCtrl: LoadingController
  ) 
  
  {
    this.editing = false
    this.get_detais_tec();
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentPage');
  }
 get_detais_tec(){
    this.storage.get('tec').then((val) => {
      this.res = val
      let data_tec = this.res.data_user.id;
      console.log('tec_page=>', data_tec); 
    
    this.getDataProvider.get_data_rent(data_tec)
    .then((result)=>{
      this.get_result = result
      console.log("result_success=>",this.get_result);
      for(let i=0;i< this.get_result.length;i++){
        console.log(i+1);
      }
    })
    .catch((err)=>{
      console.log("result_err=>",err)
    })
  })
}

tel_guest(guest:any){
  this.callNumber.callNumber(guest, true)
    .then((res)=>{
      console.log('tel_success=>'+res);
    })
    .catch((error)=>{
      console.log('tel_error=>'+error);
    })
}
checks_all(){
  this.check_all = true
  console.log(this.check_all);
}
id_value(val_rent){
  this.rent_val = val_rent
console.log(this.rent_val);
}

back_technician(){
  this.navCtrl.push(TechnicianPage);
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
          this.getDataProvider.delete_details_rent(
            this.rent_val
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
          console.log(this.rent_val);
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
            this.getDataProvider.delete_guest
            loading.dismiss();
          }, 3000);
          for (let i=0;i<this.get_result.length;i++) {
            this.loop_id = this.get_result[i].id

            this.getDataProvider.delete_details_rent(
              this.loop_id
            )
              .then((success) => {
                this.get_result.splice(i)
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


}
