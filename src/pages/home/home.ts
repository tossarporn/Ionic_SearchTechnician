import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
//page
import { RegisterPage } from '../register/register';
import {CustomerPage} from'../customer/customer';
import {TechnicianPage} from'../technician/technician';

//Internet
import {GetDataProvider } from '../../providers/get-data/get-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
}) 
export class HomePage {
  username:string="";
  password:string="";
  res :any;
  constructor(
    public navCtrl:NavController,
    public navParam:NavParams,
    public getprovi:GetDataProvider,
    ){

    }
  alert(_item) {
      this.navCtrl.push(RegisterPage,{item:_item});
  }
  login(_item_login){
   this.getprovi.login_provider(this.username,this.password) 
   .then((data)=>{
      this.res = data;
      let status_user = this.res.data_user.status;
      // alert(status_user)
      if(status_user == 1){
         this.navCtrl.push(CustomerPage);
        //  alert(JSON.stringify(status_user))
        alert("ยินดีต้อนรับเข้าสู่ระบบ");
      }else if(status_user == 2){
         this.navCtrl.push(TechnicianPage);
        //  alert(JSON.stringify(status_user))
        alert("ยินดีต้อนรับเข้าสู่ระบบ");
      }else{
        alert("กรุณากรอกรหัสผ่านด้วยครับ"); 
      }
   })
   .catch((err)=>{
    alert(JSON.stringify(err));
   })
    // this.navCtrl.push(CustomerPage,{item_login:_item_login});
    // alert(_item_login);
  }
}

