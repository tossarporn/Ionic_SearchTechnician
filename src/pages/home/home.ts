import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

//page
import { RegisterPage } from '../register/register';
import {TechnicianPage} from'../technician/technician';
import {CustomerPage} from '../customer/customer';
import { SearchPage } from '../search/search';
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
    private storage: Storage,
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
      console.log('data_guest=>',data);
      
      if(status_user == 1 ){
        this.storage.set('guest',this.res).then((succ)=>{
          // console.log('success_home=>',succ)
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
}

