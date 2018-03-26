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
      console.log("success==>",res);
    }).catch((err)=>{
      console.log("error==>",err)
    })
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowTecDetailPage');
  }
  ionViewCanEnter(){
    this.GetDataProvider.show_TecDetail
  //  this.GetDataProvider.showDetail_Technician().
  //  then((data)=>{
  //   this.Detail_for = data;

  //   // for(let i in data){
  //   //   this.loop_detail_area.push(data[i].area_name);
  //   //   this.loop_detail_equipment.push(data[i].type_name)
  //   // }
  //   // if(this.loop_detail_area){

  //   // }
  //   // else{


  //   // }

    
  //   // console.log("Detail_area ==>",typ_nameArea);
  //   // console.log("detail_equipment ==>",typ_equipment);
  //   console.log(this.loop_detail_area);
  //   console.log(this.loop_detail_equipment);
  //  }).catch((error)=>{
  //     console.log("Error=>",error)
  //  })
  }
}
