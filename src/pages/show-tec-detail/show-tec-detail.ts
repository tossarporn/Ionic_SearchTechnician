import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetDataProvider } from '../../providers/get-data/get-data';
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
  show_imgs = "http://10.5.10.183";
  Detail_for:any;
  Detail_area:string;
  detail_equipment:string;
  detail_items_name:string;
 loop_detail_area:any = [];
 loop_detail_equipment:any = [];
   constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private GetDataProvider:GetDataProvider
  ) 
  {
   let area_id:any = this.Detail_area = this.navParams.get("items_area")
    let equip_id:any = this.detail_equipment = this.navParams.get("items_equipmet");
    // this.detail_items_name = this.navParams.get("items_name");
    console.log('area==>',area_id)
    console.log('equipment==>',equip_id)
    // console.log(JSON.stringify(this.detail_items_name))
    // console.log(JSON.stringify(this.navParams))  
    
    // alert(this.Detail);
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
  ionViewCanEnter(){

  }
}
