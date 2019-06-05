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
    // time:''
  };

  retn_store = "for_rents"
  check_tus ="อยู่ระหว่างการซ่อม"
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
    private badge: Badge,
    public appCtrl: App

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
      // time: ['', Validators.required],
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
              this.storage.set('guest',this.data_guest).then(
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
  //  console.log("this.address.id=>",this.address.id);
  //  console.log("this.retn_store=>",this.retn_store);
  //  console.log("this.check_tus=>",this.check_tus);
  //  console.log("this.address.type_name=>",this.address.type_name)
  //  console.log("this.address.ref_regis_tec=>",this.address.ref_regis_tec);
   
  //  console.log("val_detail.guest_id=>",val_detail.guest_id);
  //  console.log("val_detail.guest_name=>",val_detail.guest_name);
  //  console.log("val_detail.guest_lastname=>",val_detail.guest_lastname);
  //  console.log("val_detail.guest_num_house=>",val_detail.guest_num_house);
  //  console.log("val_detail.guest_street=>",val_detail.guest_street);
  //  console.log("val_detail.guest_distric=>",val_detail.guest_distric);
  //  console.log("val_detail.guest_area=>",val_detail.guest_area);
  //  console.log("val_detail.guest_tel=>",val_detail.guest_tel);
  //  console.log("val_detail.mydate=>",val_detail.mydate);
   
   
  //  this.navCtrl.popToRoot();
  //  this.navCtrl.parent.select(1);
   
  let loading = this.loadingCtrl.create({
    content: 'กรุณารอสักครู่.....'
  });

  loading.present();

  setTimeout(() => {
this.GetDataProvider.insert_rent
(  
  val_detail.guest_name,
  val_detail.guest_lastname,
  this.address.type_name,
  val_detail.guest_num_house, 
  val_detail.guest_street,
  val_detail.guest_distric,
  val_detail.guest_area,
  val_detail.guest_tel,
  val_detail.mydate, 
  this.address.id,
  val_detail.guest_id,
  this.address.ref_regis_tec,
  this.check_tus,
)
.then((rent_succ)=>{
  this.navCtrl.popToRoot();
   this.navCtrl.parent.select(1);
  console.log("rent_succ=>",rent_succ);
})
.catch((rent_err)=>{
  console.log("rent_err=>",rent_err);
  
})

    
    loading.dismiss();
  }, 1000);
                
  }

  cancel_rent(){
    this.navCtrl.popToRoot();
  }

}
