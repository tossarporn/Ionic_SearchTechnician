import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';


//page
import { RegisterPage } from '../register/register';
import {TechnicianPage} from'../technician/technician';
import {CustomerPage} from '../customer/customer';
import { SearchPage } from '../search/search';
//Internet
import {GetDataProvider } from '../../providers/get-data/get-data';
import { stringify } from '@angular/compiler/src/util';
 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
}) 
export class HomePage {
  // private todo : FormGroup;//new

  username:string="";
  password:string="";


  res :any;
  alert_message:any
  constructor(
    public navCtrl:NavController,
    public navParam:NavParams,
    public getprovi:GetDataProvider,
    public AlertController:AlertController,
    private storage: Storage,
    private formBuilder: FormBuilder//new
    
    )
    {
      
    }//constructor
  alert(_item) {
      this.navCtrl.push(RegisterPage,{item:_item});
  }
  login(_item_login){
     
   this.getprovi.login_provider(this.username,this.password)  
   .then((data)=>{
       this.res = data;
      let status_user = this.res.data_user.status;
      let message_user = this.res.message;
      console.log('data_guest=>',data);
      
      if(status_user == 1 ){
        this.storage.set('guest',this.res).then((succ)=>{
          alert(message_user);
          this.navCtrl.push(CustomerPage)     
        }).catch((err)=>{
          console.log('error_home=>',err)
        })//setData_guest
       
      }else if(status_user == 2 ){
        this.storage.set('tec',this.res).then((val)=>
        {
          this.navCtrl.push(TechnicianPage);
          alert(message_user);
        }).catch((err)=>
        {
          console.log('error_home_tec=>',err)
        })
         
      }else{
        alert(message_user);
      }
   })
   .catch((err)=>{
    alert(JSON.stringify(err));
   })
  }

  register_construct(construct){
    let resgster_promt = this.AlertController.create({
      title: 'สมัครสมาชิกแบบช่าง',
      inputs: [
        {
          name: 'ConstructUsername',
          placeholder: 'Username'
        },
        
        {
          name: 'ConstructPassword',
          placeholder: 'Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: data => {
            if(data.ConstructUsername == "" || data.ConstructPassword == ""){
              alert("กรุณากรอกข้อมูล");
            }
            else{
              this.getprovi.register_provi(data.ConstructUsername,data.ConstructPassword,construct)
              .then((result)=>{
                this.alert_message = result
                let success_message = this.alert_message.message
                alert(success_message)
                this.navCtrl.push(TechnicianPage);
              })
              .catch((nosucc)=>{
                    console.log("not_result=>",nosucc);
              })  
            // console.log("username=>",data.ConstructUsername,"password=>",data.ConstructPassword,"status=>",construct);
            }
          }
        }
      ]
    });
   resgster_promt.present();
  }
}

