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
  details_customer = 
  {
    guest_id:'',
    guest_name:'',
    guest_lastname:'',
    guest_area:'',
    guest_distric: '',
    guest_num_house:'',
    guest_street:'',
    guest_tel:'',
  }




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

  details_guest = {
    name: '',
    last_name: '',
    tel: '',
    num_house: '',
    street: '',
    ditstric: '',
    myDate: '',
  };


  tech_id: any;
  val_guest:any;

  todo;
  nav;
  todoIndex;
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
      area: [{value:this.data_area,disabled:true}, Validators.required],
      myDate: ['', Validators.required],
      tel: ['', Validators.required],
    });
    
    
    
      

    this.GetDataProvider.show_area()
      .then((data) => {
        this.data_area = data;
        console.log('area_success=>', this.data_area);

      })
      .catch((error) => {
        console.log('area_error=>', error)
      });//show_area

      // this.navCtrl.setRoot(this.navCtrl.getActive().component)
    this.address = this.navParams.get("address_tec");
    let technician_id = this.address.id
    let technician_equipment = this.address.type_name
    let technician_equipmentID = this.address.ref_type
    let tecnician_regisID = this.address.ref_regis_tec
    console.log(this.address.ref_regis_tec);
    console.log('technician_address=>',  this.address);//SendingForTechnician
      let guest_d = this.navParams.get("details_tes");
      let dd = guest_d
      console.log("guest_d",dd);
      
      

    let tech = this.storage.set('tech',this.address,) .then((succ) => 
    {
    let guest_data = this.storage.set('details', this.details_guest)
    })
  .catch((err) => {
    console.log(err);
  })//tech
 

    this.ionViewWillEnter()
  }//constructor
  ionViewDidLoad(){
    
    console.log('ionViewDidLoad CustomerAddressPage');
  }


   ionViewWillEnter(){
      let guest = this.storage.get('guest').then((val) => {
      let data_guest = val
      this.details_customer.guest_id = data_guest.data_user.id
      this.details_customer.guest_name = data_guest.data_user.guest_name
      this.details_customer.guest_lastname = data_guest.data_user.guest_lastname
      this.details_customer.guest_tel = data_guest.data_user.guest_tel
      this.details_customer.guest_num_house = data_guest.data_user.guest_num_house
      this.details_customer.guest_street= data_guest.data_user.guest_street
      this.details_customer.guest_distric = data_guest.data_user.guest_distric
      this.details_customer.guest_area = data_guest.data_user.guest_area
      console.log('customer_address_val=>', this.details_customer)
    console.log(data_guest);
    
    })//get data_user
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }


  
 submit(val_detail) {
    
  
    const confirm = this.alertCtrl.create({
      title: 'ลูกค้าต้องการที่จะทำการจองหรือไม่ ?',
      buttons: [
        {
          text: 'ไม่',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'จอง',
          handler: () => {
              let customer_update= this.GetDataProvider.updates_guest(
              this.details_customer.guest_id, 
              this.details_customer.guest_name,
              this.details_customer.guest_lastname, 
              this.details_customer.guest_tel, 
              this.details_customer.guest_num_house, 
              this.details_customer.guest_street,
              this.details_customer.guest_distric,
              this.details_customer.guest_area
            )
              .then((result)=>{

                console.log(customer_update);
                
                let loading = this.loadingCtrl.create({
                    content: 'Please wait...'
                  });
                
                  loading.present();
                
                  setTimeout(() => {
                    let val:any = result
                    let message_val =val.message
                    const confirm = this.alertCtrl.create({
                      title: 'แจ้งเตือนจากระบบ',
                      message: message_val,
                      buttons: [
                        {
                          text: 'ตกลง',
                          handler: () => {
                            let guest = this.storage.get('guest').then((val) => {
                             this.navCtrl.insert(1, DataRentPage);
                             this.navCtrl.popToRoot();
                             loading.dismiss(); 
                           })//get data_user
                            
                          console.log('Agree clicked');
                          }
                        }
                      ]
                    });
                    confirm.present();
                    
                    console.log("val_detials",val);
                  }, 3000);
              })
              .catch((err)=>{
                console.log("val_detials_err",err);
              })//updates_guest


              this.GetDataProvider.builid_guest(
                this.details_customer.guest_name,
                this.details_customer.guest_lastname, 
                this.details_customer.guest_tel,
                this.address.type_name,
                this.details_customer.guest_num_house,
                this.details_customer.guest_street,
                this.details_customer.guest_distric,
                this.details_customer.guest_area,
                this.details_guest.myDate,
                this.address.id,
                this.details_customer.guest_id,
                this.address.ref_regis_tec,
              ).then((res) => {
                this.data_array = res;
                let message = this.data_array.message;
                let status = this.data_array.status;

                let loading = this.loadingCtrl.create({
                  content: 'Please wait...'
                });
              
                loading.present();
              
                setTimeout(() => {
                  if (status === true) {
                    const confirm = this.alertCtrl.create({
                      title: 'แจ้งเตือนจากระบบ',
                      message: message,
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
                  }
            
                  else if (status === false) {
  
                    const confirm = this.alertCtrl.create({
                      title: 'แจ้งเตือนจากระบบ',
                      message: message,
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
                    console.log('TechForRent_False=>', status);
                  }
            
                  else {
                    alert('ไม่สามารถติดต่อกลับข้อมูลได้');
                  }
                  loading.dismiss();
                }, 3000);
                
              }).catch((err) => {
                console.log('not_insert=>', err);
                const confirm = this.alertCtrl.create({
                  title: 'แจ้งเตือนจากระบบ',
                  message: err,
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
              })
              console.log('Agree clicked');//builid_guest
          }
        }
      ]
    });
    confirm.present();
                // this.details_customer.guest_id, 
                // this.details_customer.guest_name,
                // this.details_customer.guest_lastname, 
                // this.details_customer.guest_tel, 
                // this.details_customer.guest_num_house, 
                // this.details_customer.guest_street,
                // this.details_customer.guest_distric,
                // this.details_customer.guest_area,
                // this.details_guest.myDate,
                // this.address.id,
                // this.address.type_name,
                // this.address.ref_regis_tec
                // // console.log(this.details_customer,this.address.id,this.address.type_name,this.address.ref_regis_tec,this.details_guest.myDate);
                // console.log(this.address.type_name);
                
  }

}
