import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetDataProvider } from '../../providers/get-data/get-data';
import { stringify } from '@angular/compiler/src/util';
import { Item } from 'ionic-angular/components/item/item';
import { Platform } from 'ionic-angular/platform/platform';
import { Searchbar } from 'ionic-angular';

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
items:any;
public isSearchbarOpened = false;
constructor(public navCtrl: NavController, public navParams: NavParams, public GetDataProvider:GetDataProvider) 
{
    // this.GetDataProvider.show_area();
    // this.ionViewCanEnter();
    this.initializeItems();
   
}//constructor
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  initializeItems(){
      this.items = [
        {
        id: "1",
        area_name: "เขตพระนคร",
        },
        {
        id: "2",
        area_name: "เขตดุสิต",
        },
        {
        id: "3",
        area_name: "เขตหนองจอก",
        },
        {
        id: "4",
        area_name: "เขตบางรัก",
        },
        {
        id: "5",
        area_name: "เขตบางเขน",
        },
        {
        id: "6",
        area_name: "เขตบางกะปิ",
        },
        {
        id: "7",
        area_name: "เขตปทุมวัน",
        },
        {
        id: "8",
        area_name: "เขตป้อมปราบศัตรูพ่าย ",
        },
        {
        id: "9",
        area_name: "เขตพระโขนง",
        },
        {
        id: "10",
        area_name: "เขตมีนบุรี",
        },
        {
        id: "11",
        area_name: "เขตลาดกระบัง",
        },
        {
        id: "12",
        area_name: "เขตยานนาวา",
        },
        {
        id: "13",
        area_name: "เขตสัมพันธวงศ์",
        },
        {
        id: "14",
        area_name: "เขตพญาไท",
        },
        {
        id: "15",
        area_name: "เขตธนบุรี",
        },
        {
        id: "16",
        area_name: "เขตบางกอกใหญ่",
        },
        {
        id: "17",
        area_name: "เขตห้วยขวาง",
        },
        {
        id: "18",
        area_name: "เขตคลองสาน",
        },
        {
        id: "19",
        area_name: "เขตตลิ่งชัน",
        },
        {
        id: "20",
        area_name: "เขตบางกอกน้อย",
        },
        {
        id: "21",
        area_name: "เขตบางขุนเทียน",
        },
        {
        id: "22",
        area_name: "เขตภาษีเจริญ",
        },
        {
        id: "23",
        area_name: "เขตหนองแขม",
        },
        {
        id: "24",
        area_name: "เขตราษฎร์บูรณะ",
        },
        {
        id: "25",
        area_name: "เขตบางพลัด",
        },
        {
        id: "26",
        area_name: "เขตดินแดง ",
        },
        {
        id: "27",
        area_name: "เขตบึงกุ่ม ",
        },
        {
        id: "28",
        area_name: "เขตสาทร",
        },
        {
        id: "29",
        area_name: "เขตบางซื่อ ",
        },
        {
        id: "30",
        area_name: "เขตจตุจักร",
        },
        {
        id: "31",
        area_name: "เขตบางคอแหลม",
        },
        {
        id: "32",
        area_name: "เขตประเวศ",
        },
        {
        id: "33",
        area_name: "เขตคลองเตย",
        },
        {
        id: "34",
        area_name: "เขตสวนหลวง",
        },
        {
        id: "35",
        area_name: "เขตจอมทอง",
        },
        {
        id: "36",
        area_name: "เขตดอนเมือง",
        },
        {
        id: "37",
        area_name: "เขตราชเทวี",
        },
        {
        id: "38",
        area_name: "เขตลาดพร้าว",
        },
        {
        id: "39",
        area_name: "เขตวัฒนา",
        },
        {
        id: "40",
        area_name: "เขตบางแค",
        },
        {
        id: "41",
        area_name: "เขตหลักสี่ ",
        },
        {
        id: "42",
        area_name: "เขตสายไหม",
        },
        {
        id: "43",
        area_name: "เขตคันนายาว",
        },
        {
        id: "44",
        area_name: "เขตสะพานสูง",
        },
        {
        id: "45",
        area_name: "เขตวังทองหลาง",
        },
        {
        id: "46",
        area_name: "เขตคลองสามวา",
        },
        {
        id: "47",
        area_name: "เขตบางนา",
        },
        {
        id: "48",
        area_name: "เขตทวีวัฒนา",
        },
        {
        id: "49",
        area_name: "เขตทุ่งครุ",
        },
        {
        id: "50",
        area_name: "เขตบางบอน",
        },
        ];
        // this.items = this.initializeItems;
  }
// ionViewCanEnter(){
    
//     this.GetDataProvider.show_area() .then((DataTyp)=>{
//         this.loop_area = DataTyp;
//         let name_area = this.loop_area.area_name;
//         let area_id = this.loop_area.id;
//         console.log(JSON.stringify(DataTyp));
//         console.log(DataTyp);
//         // alert(JSON.stringify(DataTyp))
//     }).catch((error)=>{
//         // alert(JSON.stringify(error));
//         console.log(error);
//     });
    

// }

onInput(ev:any){
this.initializeItems();
    let val = ev.target.value;
        if(val&& val.trim()!=''){
        this.items = this.items.filter((item)=>{
            return(item.area_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    }
        console.log(val,this.initializeItems.length);
        // alert(JSON.stringify(val,this.items.area_name))
}

listView(){
    
}
onSearch(event){
console.log(event.target.value);
}
}
