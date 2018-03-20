import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

//page
import { RegisterPage } from '../register/register';
import {TechnicianPage} from'../technician/technician';
import {CustomerPage} from '../customer/customer';
//Internet
import {GetDataProvider } from '../../providers/get-data/get-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  
}) 
export class HomePage {
  private todo : FormGroup;//new

  username:string="";
  password:string="";
  res :any;
  constructor(
    public navCtrl:NavController,
    public navParam:NavParams,
    public getprovi:GetDataProvider,

    private formBuilder: FormBuilder//new
    
    ){
      this.todo = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['',Validators.required],
      });
    }
    logForm(){
      console.log(this.todo.value)  
    }
  alert(_item) {
      this.navCtrl.push(RegisterPage,{item:_item});
  }
  login(_item_login){
   this.getprovi.login_provider(this.username,this.password) 
   .then((data)=>{
      this.res = data;
      let status_user = this.res.data_user.status;
      let message_user = this.res.message;
      console.log(data);
      // alert(status_user)
      if(status_user == 1 ){
         this.navCtrl.push(CustomerPage);
        //  alert(JSON.stringify(status_user))
        alert(message_user);
      }else if(status_user == 2 ){
         this.navCtrl.push(TechnicianPage);
        //  alert(JSON.stringify(status_user))
        alert(message_user);
      }else{
        // alert("กรุณากรอกรหัสผ่านด้วยครับ"); 
        alert(message_user);
      }
   })
   .catch((err)=>{
    alert(JSON.stringify(err));
   })
    // this.navCtrl.push(CustomerPage,{item_login:_item_login});
    // alert(_item_login);
  }
}

