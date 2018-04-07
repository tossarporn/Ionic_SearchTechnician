import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetDataProvider} from '../../providers/get-data/get-data';
import {ShowTecDetailPage} from '../show-tec-detail/show-tec-detail'
/**
 * Generated class for the SearchEquipmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-equipment',
  templateUrl: 'search-equipment.html',
})
export class SearchEquipmentPage {
  isSearchbarOpened = false;
  
  items:any;
  // area :string;
  items_area:any;
  items_name:any;
  items_equipmet:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams , 
    private GetDataProvider:GetDataProvider
  ) 
  {
    // this.GetDataProvider.show_equipment();
    this.ionViewCanEnter();
   this.items_area = this.navParams.get('area')
    this.items_name = this.navParams.get('area_names');
  // alert(this.area);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchEquipmentPage');
  }
  ionViewCanEnter(){
   this.GetDataProvider.show_equipment()
   .then((data_equip)=>{
    this.items = data_equip;
    
    console.log(data_equip)
    // alert(JSON.stringify(data_equip));
   }).catch((error)=>{
     console.log(JSON.stringify(error))
   })
  }
  onInput(ev:any){
    this.items
    let val = ev.target.value;
        if(val&& val.trim()!=''){
        this.items = this.items.filter((item)=>{
            return(item.type_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    }
    else{
        this.ionViewCanEnter();
    }
  }

  onCancel(ev:any){
    this.items
    let val = ev.target.value;
        if(val&& val.trim()!=''){
        this.items = this.items.filter((item)=>{
            return(item.type_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    }
    else{
        this.ionViewCanEnter();
    }

  }

  onSearch(event){
    
    console.log(event.target.value);
    }

  equpiment_i(loop_equipment){
    this.navCtrl.push(ShowTecDetailPage,{
      items_area:this.items_area,
      items_equipmet:loop_equipment.id,
      items_name :this.items_name
    });
    console.log("Selected area", this.items_name);
    console.log("Selected equipment",loop_equipment.type_name);
  } 
}
