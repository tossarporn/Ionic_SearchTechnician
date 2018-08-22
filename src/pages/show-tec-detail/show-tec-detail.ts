import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetDataProvider } from '../../providers/get-data/get-data';
import {DetailTecPage} from '../detail-tec/detail-tec';
import {HttpClient} from '@angular/common/http'
import { Storage } from '@ionic/storage';
import { Refresher } from 'ionic-angular/components/refresher/refresher';


/**
 * Generated class for the ShowTecDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-tec-detail',
  templateUrl: 'show-tec-detail.html',
})
export class ShowTecDetailPage {
  show_imgs = "http://10.5.20.202/";
  Detail_for:any;
  ratings_for:any;
  Detail_area:string;
  detail_equipment:string;   
  detail_items_name:string;
  detail_technicain:any;
  showDetail:string=this.show_imgs+"Final_Project/service/get_detailTech.php";
  rating:string=this.show_imgs+"Final_Project/service/get_rating.php";
  guest:any;
  count = 1;
  get_tec:any; 
  
//  tec_id:any;
area_id:any;
equip_id:any;
   constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private GetDataProvider:GetDataProvider,
    public http: HttpClient,
    private storage: Storage
  ) 
  {
    this.get_details_tec();

    storage.get('guest').then((val)=>{
      let data_guest = val
        console.log('show_tec_detail_page=>',data_guest);
    })//storage_guest  

  }//constructor


  get_details_tec(){
    this.area_id =  this.navParams.get("items_area");
    this.equip_id = this.navParams.get("items_equipmet");
    // let tecnician_id:any = this.navParams.get("items_tec");
    console.log('area==>',this.area_id )
    console.log('equipment==>', this.equip_id)
    // console.log("tecnician_id=>",tecnician_id)

 this.GetDataProvider.showDetail_Technician(this.area_id,this.equip_id)
    .then((res)=>{
      this.Detail_for = res;
      this.show_imgs;
      console.log("Detail_for =>",this.Detail_for);      
    }).catch((err)=>{ 
      console.log("error==>",err)
    })//Provider
      
  }//get_details_tec


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowTecDetailPage');
  }

  detail_tec(details_tec:any){
    this.navCtrl.push(DetailTecPage,{
      details_tec:details_tec,
      data_guest:this.guest
    });  
    console.log("sending=>",details_tec);
    
  }//detail_tec

  doRefresh(refresher) {
    this.get_details_tec();
    console.log('Begin async doRefresh');

    setTimeout(()=>{
      let details_refresh=[];
      for(let i=0 ; i<30;i++){
        details_refresh.push(this.get_details_tec.length)
      }
      refresher.complete()
      console.log('Async operation has ended');
    },3000);
  }//pull refresher

  doInfinite(infiniteScroll) {
    this.get_details_tec();
    console.log('Begin async operation');

    setTimeout(() => {
      let technician = []
      for(let i=0;i<30; i++){
        technician.push(this.get_details_tec.length);
      }
      infiniteScroll.complete();
      console.log('Async operation has ended');
    }, 3000);

  }//Scroll refresher

}
