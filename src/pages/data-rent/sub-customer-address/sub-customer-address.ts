import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController,App  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import {DataRentPage} from '../data-rent';
import { GetDataProvider } from '../../../providers/get-data/get-data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SubCustomerAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-customer-address',
  templateUrl: 'sub-customer-address.html',
})
export class SubCustomerAddressPage {
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
    myDate: '',
  }
  private detail:FormGroup
  test_tec:any;
  test_gues:any;
  data_area: any = "";
  // details_guest = {
  //   name: '',
  //   last_name: '',
  //   tel: '',
  //   num_house: '',
  //   street: '',
  //   ditstric: '',
  //   myDate: '',
  // };

  test_details_gue:any = {}
  test_details_tec :any = {}

  constructor
  (
    public navCtrl: NavController, 
    public navParams: NavParams,
    private GetDataProvider: GetDataProvider,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public app: App,
    public alertCtrl: AlertController,
    private storage: Storage,
  ) 
  {
      this.details_tech();
      this.details_gues();
      this.vailadators();
      this.area();

    //  let get_customer =  this.navParams.get('customer');
    //  console.log(get_customer);
     
    // this.test_tec = navParams.get('tec_detis');
    // console.log(this.test_tec);
    

    

  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCustomerAddressPage');
  }
  arrow_back(){
    this.navCtrl.push(DataRentPage);
  }
  vailadators(){
    this.detail = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      equipment: ['', Validators.required],
      num_house: ['', Validators.required],
      street: ['', Validators.required],
      ditstric: ['', Validators.required],
      area: ['', Validators.required],
      myDate: ['', Validators.required],
      tel: ['', Validators.required],
    });
  }

  area(){
    this.GetDataProvider.show_area()
    .then((data) => {
      this.data_area = data;
      console.log('area_success=>', this.data_area);

    })
    .catch((error) => {
      console.log('area_error=>', error)
    });//show_area
  }
  details_tech(){

    this.storage.get('details_tec')
    .then((details_tec_succ)=>{
      this.test_details_tec = details_tec_succ
      console.log('details_tec_succ=>',details_tec_succ);
    })
    .catch((details_tec_err)=>{
      console.log('details_tec_err=>',details_tec_err);
    })//details_tec

    // this.test_tec = this.navParams.get('tec_detis');
    // console.log(this.test_tec);
  }


  details_gues(){

    this.storage.get('details_gue')
    .then((details_gue_succ)=>{
      this.test_details_gue = details_gue_succ;
      console.log(this.test_details_gue);
    })
    .catch((details_gue_err)=>{
      console.log('details_gue_err=>',details_gue_err);
    })//details_gue

    // this.test_gues = this.navParams.get('customer');
    // let area_guest = this.test_gues.guest_area
    // // console.log(area_guest);
    // // console.log(this.test_gues);
    // console.log(this.test_gues);
    
  }

  details_click(value_details){
    // console.log(value_details);
  
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
              this.storage.set('details_gue',value_details).then(
                (success)=>{
                  this.GetDataProvider.updates_guest(
                    value_details.guest_id,
                    value_details.guest_name,
                    value_details.guest_lastname,
                    value_details.guest_tel,
                    value_details.guest_num_house,
                    value_details.guest_street,
                     value_details.guest_distric,
                    value_details.guest_area,
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
                            this.navCtrl.insert(0,DataRentPage)
                            this.navCtrl.popToRoot();
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
}
