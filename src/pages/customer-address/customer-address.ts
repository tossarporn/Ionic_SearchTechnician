import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { DataRentPage } from '../data-rent/data-rent'
import { CustomerPage } from '../customer/customer';
import { Storage } from '@ionic/storage';


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
  private detail: FormGroup
  address: any = {};
  guest_data: any;

  type_equipment: any = "";
  data_area: any = "";
  area: any = "";
  equipment: any = "";
  data_array: any;
  test_data: any;

  details_guest = {
    name: '',
    last_name: '',
    tel: '',
    num_house: '',
    street: '',
    ditstric: '',
    myDate: '',
  };

  guest: any;
  guest_id: any;

  tech_id:any;


  status: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private GetDataProvider: GetDataProvider,
    private storage: Storage,

  ) {
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
    this.address = this.navParams.get("address_tec");
    let technician_id = this.address.id
    let technician_equipment = this.address.type_name
    let technician_equipmentID = this.address.ref_type
    let tecnician_regisID = this.address.ref_regis_tec
    // console.log(this.address.ref_regis_tec);
    console.log('technician_address=>', this.address);//SendingForTechnician

  
    this.guest = storage.get('guest').then((val) => {
      let data_guest = val
      this.guest_id = data_guest.data_user.id
      // console.log('customer_address_page=>',this.guest_id);
      console.log('customer_address_val=>', val);

    })//get data_user



    this.GetDataProvider.show_area()
      .then((data) => {
        this.data_area = data;
        console.log('area_success=>', this.data_area);

      })
      .catch((error) => {
        console.log('area_error=>', error)
      });//show_area

    // storage.set('tab_status',this.mapTabEnabled)
    // .then((success)=>{
    //     console.log('success=>',success)
    // })
    // .catch((err)=>{
    //   console.log('err=>',err);
    // })

  }//constructor


  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad CustomerAddressPage');
  // }

  submit(address_guest) {
    this.GetDataProvider.builid_guest(
      this.details_guest.name,
      this.details_guest.last_name,
      this.details_guest.tel,
      this.address.type_name,
      this.details_guest.num_house,
      this.details_guest.street,
      this.details_guest.ditstric,
      this.area,
      this.details_guest.myDate,
      this.address.id,
      this.guest_id,
      this.address.ref_regis_tec
    ).then((res) => {
      this.data_array = res;
      let message = this.data_array.message;
      let status = this.data_array.status;
      // this.test


      if (status === true) {
        let tech = this.storage.set('tech', this.address, )
          .then((succ) => {
            let guest_data = this.storage.set('details', this.details_guest)
            this.navCtrl.insert(1,DataRentPage);
            this.navCtrl.popToRoot();
          }).catch((err) => {
            console.log(err);
          })
        alert(message);
        console.log('true=>', message)
      }
      else if (status === false) {
        alert(message);
        console.log('TechForRent_False=>', status);
      }

      else {
        alert('ไม่สามารถติดต่อกลับข้อมูลได้');
      }

    }).catch((err) => {
      console.log('not_insert=>', err);
      alert(JSON.stringify(err))
    })
  }

}
