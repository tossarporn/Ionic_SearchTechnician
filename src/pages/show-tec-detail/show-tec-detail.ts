import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetDataProvider } from '../../providers/get-data/get-data';
import {DetailTecPage} from '../detail-tec/detail-tec';
import {HttpClient} from '@angular/common/http'


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
  show_imgs = "http://10.5.1.57";
  Detail_for:any;
  Detail_area:string;
  detail_equipment:string;
  detail_items_name:string;
  detail_technicain:string;
  showDetail:string="http://10.5.1.57/Final_Project/service/get_detailTech.php";
  count = 1;
  headers: any =  
    {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };

   constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private GetDataProvider:GetDataProvider,
    public http: HttpClient
  ) 
  {
   let area_id:any =  this.navParams.get("items_area")
    let equip_id:any = this.navParams.get("items_equipmet");
    console.log('area==>',area_id)
    console.log('equipment==>',equip_id)
     

    this.GetDataProvider.showDetail_Technician(area_id,equip_id).then((res)=>{
      this.Detail_for = res; 
      this.show_imgs
      console.log("success==>",res);
    }).catch((err)=>{
      console.log("error==>",err)
    })
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowTecDetailPage');
  }
  

  detail_tec(details_tec:any){
    this.navCtrl.push(DetailTecPage,{
      details_tec:details_tec
    });
  }
   doRefresh(refresher) {
    this.http.get('http://10.5.1.57/Final_Project/service/get_detailTech.php?results='+this.count)
    .subscribe(res =>{
      this.Detail_for= res;
      this.count+=1;
      refresher.complete();
      console.log("refresher=>",res)
    },(error)=>{
      console.log("error=>",error)
    })
  }

  doInfinite(infiniteScroll) {
    this.http.get('http://10.5.1.57/Final_Project/service/get_detailTech.php?results='+this.count)
    .subscribe(res =>{
      this.Detail_for= res;
      this.count+=1;
      infiniteScroll.complete();
      console.log("infiniteScroll=>",res)
    },(error)=>{
      console.log("infiniteScroll=>",error)
    })

      infiniteScroll.complete();
  }

}
