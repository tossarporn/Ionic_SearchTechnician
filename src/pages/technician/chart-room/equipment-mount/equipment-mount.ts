import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Platform } from 'ionic-angular/platform/platform';
import {Chart} from 'chart.js';
import {ChartsModule} from 'ng2-charts';
import {GetDataProvider} from '../../../../providers/get-data/get-data';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the EquipmentMountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipment-mount',
  templateUrl: 'equipment-mount.html',
})
export class EquipmentMountPage {
  @ViewChild('chartCanvas') chartCanvas;
  chart=[];
  get_equipment:any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private calendar: Calendar,
    private platform:Platform,
    private GetDataProvider:GetDataProvider,
    private storage:Storage,

  ) 
  { 
    this.storage.get('tec').then((val)=>
    { 
       this.get_equipment = val.data_user.id
      console.log("get_star=>",this.get_equipment);
      // this.submit(show_myDate,Equipment)
    }).catch((err)=>
    { 
      console.log("fail=>",err)
    })//storage_get_tec
   
    
    
  }//constructor
// public ChartsLables:string[] = ['พัดลม','ตู้เย็น','ทีวี']
// public ChartsData:number[] = [10,20,100]
// public ChartsType:string = "doughnut"
// date_time(show_time){
//     alert()
// } 

// myDate(){
//   alert(555555)
// }
All_GetEquipment(){
  
}
submit(show_myDate){
  this.GetDataProvider.get_data_equipment(this.get_equipment,show_myDate)
  .then((result)=>{
    let success = result
    console.log("success=>",success)
  })
  .catch((error)=>{
    console.log(error)
  })
  this.chart = new Chart('canvas',{
    type:'horizontalBar',
    data:{
      labels:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],
      datasets:[
        {
          label:["จำนวนคะแนน"],
          data:[5,6,7,8,5,6,7,8,5,6,7,8],
          backgroundColor: [
            'rgb(128, 255, 0)',
            'rgb(0, 255, 191)',
            'rgb(0, 0, 255)',
            'rgb(255, 0, 191)',
            'rgb(255, 0, 0)',
            'rgb(128, 255, 0)',
            'rgb(0, 255, 191)',
            'rgb(0, 0, 255)',
            'rgb(255, 0, 191)',
            'rgb(255, 0, 0)',
            'rgb(0, 255, 191)',
            'rgb(0, 0, 255)',
            
          ],//backgroundColor
          fill:false
        }
      ]//datasets
    },//data
    options:{
      legend:{
        display:false
      },
      layout:{
        padding:{
                left: 10,
                right: 10,
                top: 0,
                bottom:0
        },
      },
      scales: {
        xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
            stacked: true,
        }]
      }
    }
  })
  console.log(show_myDate)
  }
}
