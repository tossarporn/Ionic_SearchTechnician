import { Component,Input,ViewChild,Output,EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GetDataProvider} from '../../../../providers/get-data/get-data';
import {Storage} from '@ionic/storage';

//chart
import { Platform } from 'ionic-angular/platform/platform';
import {Chart} from 'chart.js';
import {ChartsModule} from 'ng2-charts';

//http
import {HttpClient} from '@angular/common/http'
/**
 * Generated class for the ChartContentCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-chart-content-customer',
  templateUrl: 'chart-content-customer.html',
})
export class ChartContentCustomerPage {
  @ViewChild('chartCanvas') chartCanvas;
  //loop_stars
  @Input() numStars: number = 5;//full star number
  @Input() value: number = 4;//number begin
  @Input() leitura: boolean = false;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();
  stars: string[] = [];//check index value onClick and loop starNumber

get_star:any;
all_stars:any;
//chart
chart=[]; 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private getDataProvider: GetDataProvider,
    private storage:Storage,
    private platform:Platform,
    private http:HttpClient
    
  ) 

  {
    this.storage.get('tec').then((val)=>
    { 
       this.get_star = val.data_user.id
      console.log("get_star=>",this.get_star);
      this.get_rating_star(this.get_star)
    }).catch((err)=>
    { 
      console.log("fail=>",err)
    })//storage_get_tec
  }//constructor

  ionViewDidLoad() {
      console.log('ionViewDidLoad ');
      
    }

    get_rating_star(start){
      this.getDataProvider.get_rating(start).then((val)=>{
        this.all_stars = val
        let loop_count = this.all_stars.map(item=>{
          return item.count_star
        })
        let count_labels =[]
            count_labels.push('จำนวน')
        this.chart = new Chart('canvas',{
          type:'horizontalBar',
          data:{
            labels:loop_count,
            datasets:[
              {
                data:loop_count,
                borderColor:'#3cba9f',
                fill:false
              },

            ]//datasets
          },//data
          options:{
              legend:{
                display:false
              },
          scales:{
              xAxes:[{
                display:true
              }],
              yAxes:[{
                display:true
              }]
            }
          }
        })
        console.log(loop_count)
        console.log("all_stars=>", this.all_stars);
      }).catch((err)=>{
        console.log("err=>",err);
      })
      
    }//get_rating_star



    // ngAfterViewInit() { 
    //   this.calc();
    // }
    // calc() {
    //   this.stars = [];
    //   let tmp = this.value;
    //   for (let i = 0; i <=this.numStars; i++) {
    //     for(let j=0;j<i;j++)
    //     {
    //       this.stars.push("star");
    //     }
    //     // this.stars.push("");
    //   }
    // }
}
