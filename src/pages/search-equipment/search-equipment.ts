import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetDataProvider} from '../../providers/get-data/get-data';
import {ShowTecDetailPage} from '../show-tec-detail/show-tec-detail';
import { Storage } from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
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
  id_tec:any;
  items_equipmet:any;
  details_tecnician:any=[];
  // ratings_for:any;
  show_imgs = "http://10.5.20.1/";
  // rating:string=this.show_imgs+"Final_Project/service/get_rating.php";
  get_details:string=this.show_imgs+"Final_Project/service/get_detailTech.php";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams , 
    private GetDataProvider:GetDataProvider,
    private storage: Storage,
    public http: HttpClient,
  ) 
  {
    
    // this.get_details_tec();
    this.get_area();
    this.guest_details();

  }//constuctor

  guest_details(){
    // this.storage.get('guest').then((val)=>{
    //   let data_guest = val
    //     console.log('searchEquipment_page=>',data_guest);
    // })//guest
  }

  get_area(){
    this.items_area = this.navParams.get("area")
    console.log('area_id=>',this.items_area);
  }


  get_details_tec(){
  //   this.http.get(this.get_details+'?result=').subscribe(res =>{    
  //     this.details_tecnician = res
       
  //  this.id_tec = this.details_tecnician.map(item => {
  //    return item.id
  //  })
  //    console.log("get_details_success=>",this.id_tec);
  //   },(error)=>{
  //    console.log("get_details_fail=>",error);
  //   })//get_detaisl_tec 
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
      items_tec:this.id_tec,
      // details:this.ratings_for
      // items_name :this.items_name,
      // guest_data:this.guest
    });
    // console.log("Selected details", this.ratings_for);
    console.log("Selected idTec=>",this.id_tec);
    console.log("Selected area=>", this.items_area);
    console.log("Selected equipment",loop_equipment.type_name);
    // console.log('sending_guest=>',this.guest);
  } 
}
