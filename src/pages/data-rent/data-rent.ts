import { Component,Input,Output,EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchPage} from '../search/search';
import { Storage } from '@ionic/storage';
import {GetDataProvider} from'../../providers/get-data/get-data';

/**
 * Generated class for the DataRentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-rent',
  templateUrl: 'data-rent.html',
})
export class DataRentPage {
  tec_id:any;
  details_tecID:any={};
  Detail_for:any={};
  // id_tec:any;

  @Input() numStars: number = 5;//full star number
  @Input() value: number = 4;//number begin
  @Input() leitura: boolean = false;

  @Output() ionClick:EventEmitter<number> = new EventEmitter<number>();
  stars:string[]=[];//check index value onClick and loop starNumber

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storeage:Storage,
    private GetDataProvider:GetDataProvider
  ) 
  {
    this.tec_id = storeage.get('tech').then((succ)=>{
      this.Detail_for = succ
      let id_tec= this.Detail_for.id;
        console.log(this.Detail_for);
        console.log(id_tec);
      
    }).catch((err)=>{
      console.log('false_get_tech=>',err);
    })

    
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataRentPage');
  }

ngAfterViewInit(){
    this.calc();
  }
  calc(){
    this.stars = [];
    let tmp = this.value;
    for(let i=0; i<this.numStars; i++,tmp--){
      if(tmp >= 1){
        this.stars.push("star");
      }
      else if(tmp > 0 && tmp < 1){
        this.stars.push("star-half");
      }
      else{
        this.stars.push("star-outline");
      }
    }
  }
  starClicked(index){
    if(!this.leitura){
    this.value = index + 1;
    this.ionClick.emit(this.value);
    this.calc();    
    console.log(this.value);
  }
  }
}//calss
