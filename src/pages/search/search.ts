import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetDataProvider } from '../../providers/get-data/get-data';
import { stringify } from '@angular/compiler/src/util';
import { Item } from 'ionic-angular/components/item/item';
import { Platform } from 'ionic-angular/platform/platform';
import { Searchbar } from 'ionic-angular';
import { TechnicianPage } from '../technician/technician';
import {SearchEquipmentPage} from '../search-equipment/search-equipment'
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  
})
export class SearchPage {
area:any;
area_names:any;
items:any ;
items_area:any;
public isSearchbarOpened = false;
constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public GetDataProvider:GetDataProvider) 
{
    this.GetDataProvider.show_area();
    this.ionViewCanEnter();

}//constructor
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

ionViewCanEnter(){
    
    this.GetDataProvider.show_area().then((DataTyp)=>{
        this.items = DataTyp;
        let name_area = this.items.area_name;
        let area_id = this.items.id;
        // console.log(JSON.stringify(DataTyp));
        console.log(DataTyp);
        // alert(JSON.stringify(DataTyp))
    }).catch((error)=>{
        // alert(JSON.stringify(error));
        console.log(error);
    });
    

}

onInput(ev:any){
    this.items
    let val = ev.target.value;
        if(val&& val.trim()!=''){
        this.items = this.items.filter((item)=>{
            return(item.area_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    }
    else{
        this.ionViewCanEnter();
    }
        console.log(val,this.items.area_name);

        // alert(JSON.stringify(val,this.items))
}
onCancel(ev:any){
    // this.GetDataProvider.show_area
    this.ionViewCanEnter();
    let val = ev.target.value;
        if(val&& val.trim()!=''){
        this.items = this.items.filter((item)=>{
            return(item.area_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    }
        console.log(val,this.items.area_name);
}   


listView(){
    
}
onSearch(event){
console.log(event.target.value);
}
area_name(area_loop){
    // alert(JSON.stringify(area_loop) )
this.navCtrl.push(SearchEquipmentPage,
    {
    area:area_loop.id,
    area_names:area_loop.area_name
    }
);
console.log("Selected Item", area_loop.area_name);
}
}
