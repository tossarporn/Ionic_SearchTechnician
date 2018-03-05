import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import {GetDataProvider } from '../../providers/get-data/get-data'
import { Alert } from 'ionic-angular/components/alert/alert';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
// host:string;
username:string = "";
password:string = "";
status_technician:any ='2';
status_customer:any = '1';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alert:AlertController,
    public getprovi:GetDataProvider,
    public http:HttpClient

  ) {
    // this.navParams.get('item');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  custom(status){
      let alert_customer = this.alert.create({
        title: 'ยืนยันการสมัครสมาชืกแบบลูกค้าหรือไม่',
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.getprovi.register_provi(this.username,this.password,status).then((res)=>{
              // console.log('Success_custom',(res))
              alert(JSON.stringify(res))
             
            }).catch((err)=>{
              // console.log("custom_err",(err))
              alert(JSON.stringify(err))
            })
            this.navCtrl.push(HomePage);
          }
        }
      ]
    });
      alert_customer.present() 
  
  }
 
  technician(status){
    let alert_technician = this.alert.create({
      title: 'ยืนยันการสมัครสมาชืกแบบช่างหรือไม่',
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.getprovi.register_provi(this.username,this.password,status).then((res)=>{
              // console.log('Success_technician',(res))
              alert(JSON.stringify(res))
              
            }).catch((err)=>{
              // console.log("technician_err",(err))
              alert(JSON.stringify(err))
            })
            this.navCtrl.push(HomePage); 
          }
        }
      ]
    });

    alert_technician.present();

    }
  }
    // registers(status){
      
    //   // alert(status+" "+this.username+" "+this.password)
    //   this.getprovi.register_provi(this.username,this.password,status).then((res)=>{
    //     // alert(JSON.stringify(res))
    //     console.log("success",(res))
    //   }).catch((err)=>{
    //     // alert(JSON.stringify(err))
    //     console.log("error",(err)) 
    //   })
    
  

