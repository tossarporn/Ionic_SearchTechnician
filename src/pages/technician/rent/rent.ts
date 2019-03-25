import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import{GetDataProvider} from'../../../providers/get-data/get-data';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {CallNumber } from '@ionic-native/call-number';
import {Badge} from '@ionic-native/badge';
import {TechnicianPage} from '../technician';
import {CheckImgTaxPage} from './check-img-tax/check-img-tax'
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
    //show_display
    editing = false;

    check_all:boolean;
    rent_val:any;
    loop_id:any;
    rents:string="อยู่ระหว่างการซ่อม"
    ref_register:any
    count:any
    number_picture:any
    count_picture:any

    ref_val_id_tec:any
    ref_val_ref_regis:any
    ref_val_ref_tec:any
    ref_val_id:any
    all:any
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
    // this.count_img();
    
  }//constructor

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RentPage');
  }
 get_detais_tec(){
    this.storage.get('tec').then((val) => {
      this.res = val
      let data_tec = this.res.data_user.id;
      // console.log('tec_page=>', data_tec); 
      // console.log('details_tec=>',this.res);
      
    this.getDataProvider.get_data_rent(data_tec)
    .then((result)=>{
      this.get_result = result
      
      for(let i=0;i< this.get_result.length;i++){
        this.ref_register = this.get_result[i];
        let month = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
        let date = this.ref_register.date_service.split("-")

      let year = date[0]
      let month_parse = month[parseInt(date[1])-1]; 
      let day = date[2];

      this.all = day+"-"+month_parse+"-"+year

      // console.log(this.all);
      this.get_result[i].date_service = this.all;
      
      }//for
    })
    .catch((err)=>{
      const confirm = this.AlertController.create({
        title: 'แจ้งเตือนจากระบบ',
        message: 'ไม่มีข้อมูลทีท่านเรียก',
        buttons: [
          {
            text: 'ตกลง',
            handler: () => {
              console.log("ไม่มีข้อมูลทีท่านเรียก");
            }
          }
        ]
      });
      confirm.present();
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
  this.ref_val_id = this.rent_val.id
  this.ref_val_ref_tec =  this.rent_val.ref_tec
  this.ref_val_id_tec =  this.rent_val.ref_id_tec
  this.ref_val_ref_regis =  this.rent_val.ref_regis 
  
  console.log(this.ref_val_id);
  console.log(this.ref_val_ref_tec);
  console.log(this.ref_val_id_tec);
  console.log(this.ref_val_ref_regis);
  
console.log(this.rent_val);
}

back_technician(){
  this.navCtrl.push(TechnicianPage);
}

tec_delete(){

  console.log(this.rent_val);
  console.log(this.ref_val_ref_tec);
  console.log(this.ref_val_id_tec);
  console.log(this.ref_val_ref_regis);
  // const confirm = this.AlertController.create({
  //   title: 'แจ้งเตือนจากระบบ',
  //   message: 'คุณต้องการลบข้อมูลหรือไม่?',
  //   buttons: [
  //     {
  //       text: 'ไม่',
  //       handler: () => {
  //         console.log('Disagree clicked');
  //       }
  //     },
  //     {
  //       text: 'ตกลง',
  //       handler: () => {
  //         this.getDataProvider.delete_details_rent(
  //           this.ref_val_id
  //         )
  //           .then((success) => {
  //             let loading = this.loadingCtrl.create({
  //               content: 'กรุณารอสักครู่...',
  //               spinner: 'bubbles'
  //             });

  //             loading.present();

  //             setTimeout(() => {
  //               let details_message: any = success
  //               let message_success = details_message.message
  //               const confirm = this.AlertController.create({
  //                 title: 'แจ้งเตือนจากระบบ?',
  //                 message: message_success,
  //                 buttons: [
  //                   {
  //                     text: 'ตกลง',
  //                     handler: () => {
  //               this.storage.remove('details_gue')
  //               this.storage.remove('details_tec');
  //               this.getDataProvider.delete_imgs_banking(
  //               this. ref_val_ref_tec,
  //               this. ref_val_id_tec,
  //               this. ref_val_ref_regis
  //             )
  //             .then((delete_imgs_banking)=>{
  //               this.navCtrl.setRoot(this.navCtrl.getActive().component);//refresh page
  //               console.log("delete_imgs_banking=>",delete_imgs_banking);
  //             })
  //             .catch((delete_imgs_banking_fail)=>{
  //               console.log("delete_imgs_banking_fail=>",delete_imgs_banking_fail);
  //             })
  //                       console.log('Agree clicked');
  //                     }
  //                   }
  //                 ]
  //               });
  //               confirm.present();

  //               loading.dismiss();
  //             }, 1000);
  //             console.log(success);
              
  //           }).catch((err) => {
  //             console.log(err);
  //           })
  //         console.log(this.rent_val);
  //       }
  //     }
  //   ]
  // });
  // confirm.present();

}//tec_delete

tec_delete_all(){

  for(let i=0;i<this.get_result.length;i++){
    let looping_ref_id = this.get_result[i].ref_id_tec
    let looping_ref_regis = this.get_result[i].ref_regis
    let looping_ref_tec= this.get_result[i].ref_tec
    console.log(looping_ref_tec);
    console.log(looping_ref_id);
    console.log(looping_ref_regis);
    
  }
  
  
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
                   
                  }
                }
              ]
            });
            confirm.present();
            this.getDataProvider.delete_guest
            loading.dismiss();
          }, 3000);
          for (let i=0;i<this.get_result.length;i++) {
            this.loop_id = this.get_result[i].id;
            let looping_ref_id = this.get_result[i].ref_id_tec;
            let looping_ref_regis = this.get_result[i].ref_regis;
            let looping_ref_tec= this.get_result[i].ref_tec;
            // console.log(looping_ref_id);
            //   console.log(looping_ref_regis);
            //   console.log(looping_ref_tec);
            this.getDataProvider.delete_details_rent(
              this.loop_id
            )
              .then((success) => {
                     this.storage.remove('details_gue')
                    this.storage.remove('details_tec');
                    this.getDataProvider.delete_imgs_banking(
                      looping_ref_tec,
                      looping_ref_id,
                      looping_ref_regis,
                      
                    )
                    .then((delete_imgs_banking)=>{
                      this.get_result.splice(i)
                      console.log("delete_imgs_banking=>",delete_imgs_banking);
                    })
                    .catch((delete_imgs_banking_fail)=>{
                      console.log("delete_imgs_banking_fail=>",delete_imgs_banking_fail);
                    })
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

select_rents(get_result){


  let loading = this.loadingCtrl.create({
    content: 'กรุณารอสักครู่...'
  });

  loading.present();

  setTimeout(() => {
this.getDataProvider.technician_update_rents(
    get_result.ref_id_tec,
    get_result.ref_regis,
    get_result.ref_tec,
    this.rents
  ).then((update_sucess)=>{
    let status_message:any = update_sucess
    
    const confirm = this.AlertController.create({
      title: 'แจ้งเตือนจากระบบ',
      message: status_message.message,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
    console.log("update_sucess=>",status_message);
    
    console.log("update_sucess=>",status_message.message);
  }).catch((update_false)=>{
    console.log("update_false=>",update_false);
})//tec_update_status_rents
    loading.dismiss();
  }, 3000);
  // 
}//select_rents

check(details_tecnician){
  this.getDataProvider.get_picture_tax(details_tecnician.ref_tec,details_tecnician.ref_id_tec,details_tecnician.ref_regis)
         .then((picture_success)=>{
          this.count_picture = picture_success
         console.log(this.count_picture);
         
          
           this.navCtrl.push(
             CheckImgTaxPage,
             {customer_details:details_tecnician,
              tax_picture:this.count_picture['0'].name_img_tax_invoice,
              date_picture:this.count_picture['0'].date_img
            })
        }).catch((picture_error)=>{
         
            const confirm = this.AlertController.create({
              title: 'แจ้งเตือนจากระบบ',
              message: 'ไม่มีข้อมูลทีท่านเรียก',
              buttons: [
                {
                  text: 'ตกลง',
                  handler: () => {
                    console.log("ไม่มีข้อมูลทีท่านเรียก");
                  }
                }
              ]
            });
            confirm.present();
        })
}

}
