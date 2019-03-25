import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController,App  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { DataRentPage } from '../data-rent/data-rent'
import { CustomerPage } from '../customer/customer';
import { Storage } from '@ionic/storage';
import { Badge } from '@ionic-native/badge';

/**
 * Generated class for the CustomerAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-address',
  templateUrl: 'customer-address.html',
})
export class CustomerAddressPage {

  editng: boolean
  private detail: FormGroup
  address: any = {};
  guest_data: any;

  type_equipment: any = "";
  data_area: any = "";
  area: any = "";
  equipment: any = "";
  data_array: any;
  data_guest: any;
  show_details:any;

  ng_details_guest = {
    guest_id:'',
    guest_name:'',
    guest_lastname:'',
    guest_area:'',
    guest_distric: '',
    guest_num_house:'',
    guest_street:'',
    guest_tel:'',
    mydate: '',
    // retn_store:"for_rents"
  };

  retn_store = "for_rents"
  // tech_id: any;
  // val_guest:any;

  // todo;
  // nav;
  // todoIndex;
  status: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private GetDataProvider: GetDataProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public app: App,
    private badge: Badge

  ) {

    this.editng = false;
    
    this.detail = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      equipment: ['', Validators.required],
      num_house: ['', Validators.required],
      street: ['', Validators.required],
      ditstric: ['', Validators.required],
      area: ['', Validators.required],
      mydate: ['', Validators.required],
      tel: ['', Validators.required],
      // retn_store:['for_rents', Validators.required],
    });
    
    
    this.GetDataProvider.show_area()
      .then((data) => {
        this.data_area = data;
        console.log('area_success=>', this.data_area);

      })
      .catch((error) => {
        console.log('area_error=>', error)
      });//show_area

    this.address = this.navParams.get("address_tec");
    let technician_id = this.address.id
    let technician_equipment = this.address.type_name
    let technician_equipmentID = this.address.ref_type
    let tecnician_regisID = this.address.ref_regis_tec
    console.log(this.address.ref_regis_tec);
    console.log('technician_address=>',  this.address);//SendingForTechnician
      // let guest_d = this.navParams.get("details_tes");
      // let dd = guest_d
      // console.log("guest_d",dd);
      
  //   let tech = this.storage.set('tech',this.address) .then((succ) => 
  //   {
  //   console.log(succ);
    
  //   })
  // .catch((err) => {
  //   console.log(err);
  // })//tech

  this.details_guest()

  
  }//constructor
  // ionViewDidLoad(){
    
  //   console.log('ionViewDidLoad CustomerAddressPage');
  // }


  ionViewWillEnter() {

     
    
  }

  details_guest(){
     this.storage.get('guest').then((val) => {
      this.data_guest = val
      this.ng_details_guest.guest_id = this.data_guest.data_user.id
      this.ng_details_guest.guest_name = this.data_guest.data_user.guest_name
      this.ng_details_guest.guest_lastname = this.data_guest.data_user.guest_lastname
      this.ng_details_guest.guest_tel = this.data_guest.data_user.guest_tel
      this.ng_details_guest.guest_num_house = this.data_guest.data_user.guest_num_house
      this.ng_details_guest.guest_street= this.data_guest.data_user.guest_street
      this.ng_details_guest.guest_distric = this.data_guest.data_user.guest_distric
      this.ng_details_guest.guest_area = this.data_guest.data_user.guest_area
      console.log('customer_address_val=>', this.ng_details_guest)
    console.log(this.data_guest);
    })//get data_user
  }

  update_details(val_update){
    console.log("update_details=>",val_update.guest_area);
    const confirm = this.alertCtrl.create({
      title: 'ลูกค้าต้องการที่จะทำการอัปเดตข้อมูลหรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('clicked_cancle');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
              this.storage.set('details_gue',this.data_guest).then(
                (success)=>{
                  this.GetDataProvider.updates_guest(
                    val_update.guest_id,
                    val_update.guest_name,
                    val_update.guest_lastname,
                    val_update.guest_distric,
                    val_update.guest_num_house,
                    val_update.guest_street,
                    val_update.guest_tel,
                    val_update.guest_area,
                 ).then((result)=>{
                  let loading = this.loadingCtrl.create({
                    content: 'กรุณารอสักครู่'
                    
                  });
                  loading.present();

                  setTimeout(() => {
                    let title_message:any = result
                    let message_success = title_message.message
                    const confirm = this.alertCtrl.create({
                      title: message_success,
                      buttons: [
                        {
                          text: 'ตกลง',
                          handler: () => {
                            // this.navCtrl.insert(0,DataRentPage)
                            // this.navCtrl.popToRoot();
                          }
                        }
                      ]
                    });
                    confirm.present();
                loading.dismiss();
              }, 1000);

                   console.log(result);
                 }).catch((no_result)=>{
                   console.log(no_result);
                 })//updates_guest
                    console.log(success);
                }).catch(
                  (err)=>{
                    console.log(err);
                  })
            console.log('clicked_update');
          }
        }
      ]
    });
    confirm.present();
  
  }


  
 submit(val_detail) {
  //  console.log(this.ng_details_guest.mydate);
   
  //  console.log(val_detail.mydate);
  //  console.log(val_detail);
  //  console.log(this.retn_store);
   
  // val_detail.myDate = new Date();

  // var month = val_detail.myDate.toString();
  // var ArrayMonth = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"]
  // console.log(ArrayMonth[month]);
  // console.log(month);
  
  
   
// console.log("submi_guest_id=>",val_detail.guest_id);
// console.log("details_tec_id_store=>",this.address.id)
// console.log("details_tec_id_ref_regis_tec=>",this.address.ref_regis_tec)
// console.log("retn_store=>",this.retn_store);


// console.log("submit=>",val_detail.myDate);
// console.log("submit=>",val_detail);
// console.log("submit=>",val_detail);

// console.log("details_tec=>",this.address)
// console.log("details_tec=>",this.address)

  let loading = this.loadingCtrl.create({
    content: 'กรุณารอสักครู่.....'
  });

  loading.present();

  setTimeout(() => {
this.GetDataProvider.insert_rent
(
  this.address.id,
  val_detail.guest_id,
  this.address.ref_regis_tec,
  this.retn_store,
).then((rent_succ)=>{
  // this.navCtrl.push(DataRentPage,{guest_details:val_detail,details_tec:this.address})
  this.navCtrl.insert(0,DataRentPage)
    .then((success)=>{
      this.navCtrl.popToRoot();
      this.storage.set('details_tec',this.address)
      this.storage.set('details_gue',val_detail)
      console.log(success);
    })
    .catch((fail)=>{
      console.log(fail);
    })
  console.log("rent_succ=>",rent_succ);
  

}).catch((rent_err)=>{
  console.log("rent_err=>",rent_err);
  
})

    
    loading.dismiss();
  }, 1000);
    
    // const confirm = this.alertCtrl.create({
    //   title: 'ลูกค้าต้องการที่จะทำการจองหรือไม่ ?',
    //   buttons: [
    //     {
    //       text: 'ไม่',
    //       handler: () => {
    //         console.log('Disagree clicked');
    //       }
    //     },
    //     {
    //       text: 'จอง',
    //       handler: () => {
    //           let customer_update= this.GetDataProvider.updates_guest(
    //           this.details_customer.guest_id, 
    //           this.details_customer.guest_name,
    //           this.details_customer.guest_lastname, 
    //           this.details_customer.guest_tel, 
    //           this.details_customer.guest_num_house, 
    //           this.details_customer.guest_street,
    //           this.details_customer.guest_distric,
    //           this.details_customer.guest_area
    //         )
    //           .then((result)=>{

    //             console.log(customer_update);
                
    //             let loading = this.loadingCtrl.create({
    //                 content: 'Please wait...'
    //               });
                
    //               loading.present();
                
    //               setTimeout(() => {
    //                 let val:any = result
    //                 let message_val =val.message
    //                 const confirm = this.alertCtrl.create({
    //                   title: 'แจ้งเตือนจากระบบ',
    //                   message: message_val,
    //                   buttons: [
    //                     {
    //                       text: 'ตกลง',
    //                       handler: () => {
    //                         let guest = this.storage.get('guest').then((val) => {
    //                          this.navCtrl.insert(1, DataRentPage);
    //                          this.navCtrl.popToRoot();
    //                          loading.dismiss(); 
    //                        })//get data_user
                            
    //                       console.log('Agree clicked');
    //                       }
    //                     }
    //                   ]
    //                 });
    //                 confirm.present();
                    
    //                 console.log("val_detials",val);
    //               }, 3000);
    //           })
    //           .catch((err)=>{
    //             console.log("val_detials_err",err);
    //           })//updates_guest


    //           this.GetDataProvider.builid_guest(
    //             this.details_customer.guest_name,
    //             this.details_customer.guest_lastname, 
    //             this.details_customer.guest_tel,
    //             this.address.type_name,
    //             this.details_customer.guest_num_house,
    //             this.details_customer.guest_street,
    //             this.details_customer.guest_distric,
    //             this.details_customer.guest_area,
    //             this.details_guest.myDate,
    //             this.address.id,
    //             this.details_customer.guest_id,
    //             this.address.ref_regis_tec,
    //           ).then((res) => {
    //             this.data_array = res;
    //             let message = this.data_array.message;
    //             let status = this.data_array.status;
                
    //             let guest_data = this.storage.set('details',this.details_guest.myDate).then((val)=>{
    //               let date = val
    //               console.log(date);
    //             }).catch((val_err)=>{
    //               console.log(val_err);
    //             })//guest_data

    //             let loading = this.loadingCtrl.create({
    //               content: 'Please wait...'
    //             });
              
    //             loading.present();
              
    //             setTimeout(() => {
    //               if (status === true) {
    //                 const confirm = this.alertCtrl.create({
    //                   title: 'แจ้งเตือนจากระบบ',
    //                   message: message,
    //                   buttons: [
    //                     {
    //                       text: 'ตกลง',
    //                       handler: () => {
                            
    //                         console.log('Agree clicked');
    //                       }
    //                     }
    //                   ]
    //                 });
    //                 confirm.present();
    //               }
            
    //               else if (status === false) {
  
    //                 const confirm = this.alertCtrl.create({
    //                   title: 'แจ้งเตือนจากระบบ',
    //                   message: message,
    //                   buttons: [
    //                     {
    //                       text: 'ตกลง',
    //                       handler: () => {
    //                         console.log('Agree clicked');
    //                       }
    //                     }
    //                   ]
    //                 });
    //                 confirm.present();
    //                 console.log('TechForRent_False=>', status);
    //               }
            
    //               else {
    //                 alert('ไม่สามารถติดต่อกลับข้อมูลได้');
    //               }
    //               loading.dismiss();
    //             }, 3000);
                
    //           }).catch((err) => {
    //             console.log('not_insert=>', err);
    //             const confirm = this.alertCtrl.create({
    //               title: 'แจ้งเตือนจากระบบ',
    //               message: err,
    //               buttons: [
    //                 {
    //                   text: 'ตกลง',
    //                   handler: () => {
    //                     console.log('Agree clicked');
    //                   }
    //                 }
    //               ]
    //             });
    //             confirm.present();
    //           })
    //           console.log('Agree clicked');//builid_guest
    //       }
    //     }
    //   ]
    // });
    // confirm.present();
    //             this.details_customer.guest_id, 
    //             this.details_customer.guest_name,
    //             this.details_customer.guest_lastname, 
    //             this.details_customer.guest_tel, 
    //             this.details_customer.guest_num_house, 
    //             this.details_customer.guest_street,
    //             this.details_customer.guest_distric,
    //             this.details_customer.guest_area,
    //             this.details_guest.myDate,
    //             this.address.id,
    //             this.address.type_name,
    //             this.address.ref_regis_tec
    //             // // console.log(this.details_customer,this.address.id,this.address.type_name,this.address.ref_regis_tec,this.details_guest.myDate);
    //             // console.log(this.address.type_name);
    //           //  console.log(this.details_guest.myDate);
                
  }

}
