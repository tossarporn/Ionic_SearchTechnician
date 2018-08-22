import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import{GetDataProvider} from'../../../providers/get-data/get-data';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {CallNumber } from '@ionic-native/call-number';
import {Badge} from '@ionic-native/badge';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private getDataProvider:GetDataProvider,
    private http:HttpClient,
    private storage:Storage,
    private callNumber: CallNumber,
    private badge:Badge
  ) 
  
  {
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

}
