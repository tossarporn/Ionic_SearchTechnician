import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from 'chart.js';
import {ChartsModule} from 'ng2-charts';

/**
 * Generated class for the CustomerAmountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-amount',
  templateUrl: 'customer-amount.html',
})
export class CustomerAmountPage {
  chart=[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) 
  {

    
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerAmountPage');
  }
//   public ChartsLables:string[] = ['มกราคม','กุมภาพันธ','มีนาคม','เมษายน','พฤษภาคม']
// public ChartsData:number[] = [10,20,100,50,10]
// public ChartsType:string = "horizontalBar"
submit(show){
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

  console.log(show)
}
}
