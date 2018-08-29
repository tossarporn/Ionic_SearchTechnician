import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDataProvider } from '../../../providers/get-data/get-data';
/**
 * Generated class for the DetailsEdtingGuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-edting-guest',
  templateUrl: 'details-edting-guest.html',
})
export class DetailsEdtingGuestPage {
  editng_guest:any
  data_area: any;
  
  detail_guest = {
      id_guest:'',
      guest_name:'',
      guest_lastname:'',
      guest_tel:'',
      guest_num_house:'',
      guest_street:'',
      guest_distric:'',
      guest_area:'',
      username:'',
      password:''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private GetDataProvider: GetDataProvider,
  ) 
  {
    this.details_guest();
    this.show_area();
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsEdtingGuestPage');
  }

  details_guest(){
   this.editng_guest =  this.navParams.get("details_guest")
      this.detail_guest.id_guest =  this.editng_guest.id
      this.detail_guest.guest_name = this.editng_guest.guest_name
      this.detail_guest.guest_lastname =  this.editng_guest.guest_lastname
      this.detail_guest.guest_tel = this.editng_guest.guest_tel
      this.detail_guest.guest_num_house = this.editng_guest.guest_num_house
      this.detail_guest.guest_street = this.editng_guest.guest_street
      this.detail_guest.guest_distric = this.editng_guest.guest_distric
      this.detail_guest.guest_area = this.editng_guest.guest_area
      this.detail_guest.username = this.editng_guest.username
      this.detail_guest.password= this.editng_guest.password
  //  console.log(id);
  //  console.log( this.editng_guest);
  }
  show_area() {
    this.GetDataProvider.show_area()
      .then((data) => {
        this.data_area = data;
        // console.log('area_success=>', this.data_area); 
      })
      .catch((error) => {
        console.log('area_error=>', error)
      });//show_area
  }
  submit(){
    this.GetDataProvider.guest_update_details(
      this.detail_guest.id_guest, 
      this.detail_guest.guest_name, 
      this.detail_guest.guest_lastname,
      this.detail_guest.guest_tel, 
      this.detail_guest.guest_num_house ,
      this.detail_guest.guest_street, 
      this.detail_guest.guest_distric, 
      this.detail_guest.guest_area,  
      this.detail_guest.username,  
      this.detail_guest.password,
    ).then((success)=>{
      let details_success:any = success;
      let message_success = details_success.message
      console.log("message_success=>",message_success);
      console.log("success=>",success);
    }).catch((err)=>{
      console.log("err=>",err);
    })
      console.log("submit=>", this.detail_guest);
  }
}
