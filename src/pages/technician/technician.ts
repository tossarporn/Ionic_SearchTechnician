import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {BulidRoomPage} from '../technician/bulid-room/bulid-room';
import { HomePage } from '../home/home';
import {ChartRoomPage} from '../technician/chart-room/chart-room';
import {AdminDetailPage} from '../technician/admin-detail/admin-detail';
import {RentPage} from '../technician/rent/rent';
import {Badge} from '@ionic-native/badge';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import{GetDataProvider} from'../../providers/get-data/get-data';


/**
 * Generated class for the TechnicianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-technician',
  templateUrl: 'technician.html',
})
export class TechnicianPage  {
  noit:Number = 10
  res:any;
  get_result:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams ,
    public app:App,
    private badge: Badge,
    private storage:Storage,
    private http:HttpClient,
    private getDataProvider:GetDataProvider,
  ) 
  {
this.get_details_customer();
    
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechnicianPage');
  }
  bulid_room(){
    this.navCtrl.push(BulidRoomPage);
  }
  chart_room(){
    this.navCtrl.push(ChartRoomPage);
    // alert("55555");
  }
  detail_admin(){
  this.navCtrl.push(AdminDetailPage);
  }
   for_rent(){
     
    this.navCtrl.push(RentPage);
  }
  logout(){
    this.navCtrl.setRoot(HomePage);
    let nav_logout = this.app.getRootNav();
    nav_logout.setRoot(HomePage);
    
  }

  get_details_customer(){
    this.storage.get('tec').then((val) => {
      this.res = val
      let data_tec = this.res.data_user.id;
      console.log('tec_page=>', data_tec); 
    
    this.getDataProvider.get_data_rent(data_tec)
    .then((result)=>{
      this.get_result = result
      console.log("result_success=>",this.get_result);
      this.noit = this.get_result.length
    })
    .catch((err)=>{
      console.log("result_err=>",err)
    })
  })
  }
}
