import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup ,AbstractControl,FormControl }from '@angular/forms';
import {GetDataProvider} from'../../providers/get-data/get-data';
import {DataRentPage} from '../data-rent/data-rent'

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
  type_equipment:any="";
  data_area:any="";

  name:string="";
  last_name:string="";
  tel:string="";
  equipment:string="";
  num_house:string="";
  nastreetme:string="";
  ditstric:string="";
  area:string="";
  myDate:string="";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private GetDataProvider: GetDataProvider
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
    console.log('customer_address=>',this.address);

    this.GetDataProvider.show_equipment()
    .then((data_typ)=>{
      this.type_equipment = data_typ;
      let tech_equipment = this.type_equipment.type_name;
      let tech_equipmentID = this.type_equipment.id;
      // alert(JSON.stringify(data_typ));
      console.log('data_typ==>',data_typ);
    })
    .catch((err)=>{
      alert(JSON.stringify(err));
    })//show_equipment

    
    this.GetDataProvider.show_area()
    .then((data)=>{
        this.data_area = data;
        let tect_areaName = this.data_area.area_name;
        let tect_areaID = this.data_area.id;

      console.log('area_success=>',this.data_area)
    })
    .catch((error)=>{
      console.log('area_error=>',error)
    });
      
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerAddressPage');
  }

  submit(tec_address){
    this.navCtrl.push(DataRentPage,{
      tec_address:this.address
    })
    this.GetDataProvider

    console.log('select_tec=>',this.address);
  }
}
