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
  get_details:any
  show_equip:any
  equipment:string;
  myDate:string;
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
       this.get_details = val.data_user.id
      console.log("get_star=>",this.get_details);
      this.All_GetEquipment(this.get_details)
      // this.submit(show_myDate,Equipment)
    }).catch((err)=>
    { 
      console.log("fail=>",err)
    })//storage_get_tec
   

  }//constructor

All_GetEquipment(details){
  this.GetDataProvider.show_details_equipment(details)
    .then((result)=>{
      this.show_equip = result;
      console.log("result=>", this.show_equip);
    })
    .catch((err)=>{
      console.log("error=>",err);
    })
}
submit(){
  console.log("this.get_details=>",this.get_details)
  console.log("show_myDate=>", this.myDate);
  console.log("show_equpimennt=>",this.equipment);
  
  
  this.GetDataProvider.get_count_equipment(this.get_details,this.myDate,this.equipment)
  .then((result)=>{
    let success = result
    this.chart = new Chart('canvas',{
      type:'horizontalBar',
      data:{
        labels:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],
        datasets:[
          {
            label:["จำนวนคนที่มาใช้บริการ"],
            data:success,
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
    console.log("success=>",success)
  })
  .catch((error)=>{
    console.log(error)
  })
  
  }
}
