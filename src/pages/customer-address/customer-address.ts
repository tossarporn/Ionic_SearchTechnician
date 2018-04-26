import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup ,AbstractControl,FormControl }from '@angular/forms';
import {GetDataProvider} from'../../providers/get-data/get-data';
import {DataRentPage} from '../data-rent/data-rent'
import {CustomerPage} from '../customer/customer';
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
  private detail : FormGroup
  address:any={};
  guest_data:any={};

  type_equipment:any="";
  data_area:any="";
  area:any ="";
  equipment:any ="";
  data_array:any;

  test_data:any;

  details_guest={
    name:'',
    last_name:'',
    tel:'',
    num_house:'',
    street:'',
    ditstric:'',
    myDate:'',
  };
  
  guest:any;
  guest_id:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private GetDataProvider: GetDataProvider,
    private storage: Storage
  ) 
  {
    this.detail = this.formBuilder.group({
      name:['', Validators.required],
      last_name:['', Validators.required], 
      equipment:['', Validators.required],
      num_house: ['', Validators.required],
      street: ['',Validators.required],
      ditstric: ['',Validators.required],
      area: ['',Validators.required],
      myDate: ['',Validators.required],
      tel: ['',Validators.required],
    });
    this.address = this.navParams.get("address_tec");
    let technician_id = this.address.id
    let technician_equipment = this.address.type_name
    let technician_equipmentID = this.address.ref_type
    console.log('technician_address=>', this.address);//SendingForTechnician


   this.guest = storage.get('guest').then((val)=>{ 
        let data_guest = val   
        this.guest_id = data_guest.data_user.id 
          // console.log('customer_address_page=>',this.guest_id);
          console.log('customer_address_val=>',val);
          
          // console.log('id_guest=>',this.guest_id); 
      })//get data_user

   

    // this.GetDataProvider.show_equipment()
    // .then((data_typ)=>{
    //   this.type_equipment = data_typ;
    //   let tech_equipment = this.type_equipment.type_name;
    //   let tech_equipmentID = this.type_equipment.id;
    //   // console.log('data_typ==>',   this.type_equipment);
    // })
    // .catch((err)=>{
    //   alert(JSON.stringify(err));
    // })//show_equipment

    
    this.GetDataProvider.show_area()
    .then((data)=>{
        this.data_area = data;
      // console.log('area_success=>', this.data_area);
     
    })
    .catch((error)=>{
      console.log('area_error=>',error)
    });

      
  }
  

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad CustomerAddressPage');
  // }

  submit(address_guest){
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
    ).then((res)=>{ 
      this.data_array = res;
      let message = this.data_array.message;
      let status = this.data_array.status;
      // console.log('insert=>',res);
      // console.log('details_address=>',this.address)
      // console.log('address_id=>',this.address.id)
      if(status === true){
        this.storage.set('tech',this.address).then((succ)=>{
          this.navCtrl.push(DataRentPage)
          console.log(succ);
        }).catch((err)=>{
          console.log(err);
        })
        alert(message);
        console.log('TechForRent_Success=>',status);
      }
      else if(status === false){
        alert(message);
        console.log('TechForRent_False=>',status);
      }

      else{
        alert('ไม่สามารถติดต่อกลับข้อมูลได้');
      }
      
    }).catch((err)=>{ 
      console.log('not_insert=>',err);   
      alert(JSON.stringify(err))
    })
    
    // this.navCtrl.push(DataRentPage,{
    //   // address_guest_name:this.details_guest.name,
    //   // address_guest_lastname: this.details_guest.last_name,
    //   // address_guest_telname: this.details_guest.tel,
    //   // address_guest_type_name: this.address.type_name,
    //   // address_guest_num_house: this.details_guest.num_house,
    //   // address_guest_street: this.details_guest.street,
    //   // address_guest_ditstric: this.details_guest.ditstric,
    //   // address_guest_area: this.area,
    //   // address_guest_myDate: this.details_guest.myDate
    //   address_guest:this.address.id
    // }).then((succ)=>{
    //   console.log('sending_success=>',this.address.id);
    // }).catch((fals)=>{
    //   console.log('sending_false=>',fals);
    // })
    // console.log("detail_guest=>",this.details_guest);
    // console.log("address=>",this.address.id); 
    // console.log("area=>", this.area);
    // console.log('customer_address_page=>',this.guest_id);
    // console.log('technician_equipment=>',this.address.type_name);
    // console.log('technician_equipmentID=>',this.address.ref_type);
    // console.log("guest_id=>",this.guest_id);
    // this.navCtrl.push(DataRentPage,{address_guest})
    // console.log(address_guest);
    
  }
}
