import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';


//page
import { RegisterPage } from '../register/register';
import { TechnicianPage } from '../technician/technician';
import { CustomerPage } from '../customer/customer';
import { SearchPage } from '../search/search';
import {AdminPage} from '../admin/admin'
//Internet
import { GetDataProvider } from '../../providers/get-data/get-data';
import { stringify } from '@angular/compiler/src/util';
import { RequiredValidator } from '@angular/forms/src/directives/validators';
import { Select } from 'ionic-angular/components/select/select';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  private check_login : FormGroup;//new

  username: string = "";
  password: string = "";
  status:any;
  value:any;
  

  res: any;
  alert_message: any
  checklists:any
  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    public getprovi: GetDataProvider,
    public AlertController: AlertController,
    private storage: Storage,
    private formBuilder: FormBuilder,//new

  ) 
  {
    
   this.check_login = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    status:['', Validators.required]
    });
    
    
  }//constructor
  register_guest(_item) {
    this.navCtrl.push(RegisterPage, { item: _item });
    console.log(_item);
    }
  login() {
    this.getprovi.login_provider(this.username, this.password,this.status)
      .then((data) => {
        this.res = data;
        this.status = this.res.data_user.status;
        let message_user = this.res.message;

        if (this.status == 1) {
          console.log(this.status);
          const confirm = this.AlertController.create({
            title: 'ยินดีต้อนรับลูกค้าทุกท่าน',
            message: message_user,
            buttons: [
              {
                text: 'ยืนยัน',
                handler: () => {
                  this.storage.set('guest',this.res).then((succ) => {
                    this.navCtrl.push(CustomerPage)
                  }).catch((err) => {
                    console.log('error_home=>', err)
                  })
                }
              }
            ]
          });//setData_guest
          confirm.present();
          
        }  else if(this.status == 2) {
          const confirm = this.AlertController.create({
            title: 'ยินดีต้อนรับช่างทุกท่าน',
            message: message_user,
            buttons: [
              {
                text: 'ยืนยัน',
                handler: () => {
                  this.storage.set('tec', this.res).then((val) => {
                    this.navCtrl.push(TechnicianPage);
                  }).catch((err) => {
                    console.log('error_home_tec=>', err)
                  })
                }
              }
            ]
          });
          confirm.present();
        } 
       else if (this.status == 3) {
          const confirm = this.AlertController.create({
            title: 'ยินดีต้อนรับผู้ดูแลระบบ',
            message: message_user,
            buttons: [
              {
                text: 'ยืนยัน',
                handler: () => {
                  this.storage.set('admin', this.res).then((succ) => {
                    this.navCtrl.push(AdminPage)
                  }).catch((err) => {
                    console.log('error_home=>', err)
                  })
                }
              }
            ]
          });
          confirm.present();
        }
        else {
          const fail = this.AlertController.create({
            title: 'แจ้งเตือนจากระบบ',
            message: message_user,
            buttons: [
              {
                text: 'ยืนยัน',
                handler: () => {
                  this.check_login.reset()
                }
              }
            ]
          });
          fail.present();
        }
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      })
  }
  
  register_construct(status_construct) {
    let resgster_promt = this.AlertController.create({
      title: 'สมัครสมาชิกแบบช่าง',
      inputs: [
        {
          name:'ConstructUsername',
          placeholder: 'Username',
          type:'text',
          id:'ConstructUsername'
        },

        {
          name: 'ConstructPassword',
          placeholder: 'Password',
          type:'password',
          id:'ConstructPassword',
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
            if (data.ConstructUsername=="" || data.ConstructPassword=="")  {
                  let alarm = this.AlertController.create({
                    title: 'แจ้งเตือนจากระบบ',
                    subTitle: 'กรุณากรอกข้อมูล',
                    buttons: ['OK']
                  });
                  alarm.present();
                  return false
            }
            else {
              this.getprovi.register_provi(data.ConstructUsername, data.ConstructPassword,status_construct)
                .then((result) => {
                  this.alert_message = result
                  let success_message = this.alert_message.message
                  let alert_status = this.alert_message.status
                  console.log (this.alert_message);
                  
                  if(alert_status == true && data.ConstructUsername==!"" || data.ConstructPassword==!""){
                    const fail_alarm = this.AlertController.create({
                      title: 'แจ้งเตือนจากระบบ',
                      subTitle:success_message,
                      buttons: ['OK']
                    });
                     fail_alarm.present();
                    return false
                  }else if(alert_status == false && data.ConstructUsername==!"" || data.ConstructPassword==!""){
                    const fail_alarm = this.AlertController.create({
                      title: 'แจ้งเตือนจากระบบ',
                      subTitle:success_message,
                      buttons: ['OK']
                    });
                     fail_alarm.present();
                     return false
                  }
                  else{
                    const error_alarm = this.AlertController.create({
                      title: 'แจ้งเตือนจากระบบ',
                      subTitle:success_message,
                      buttons: ['OK']
                    });
                    error_alarm.present();
                  }
                })
                .catch((nosucc) => {
                  console.log("not_result=>", nosucc);
                })
              console.log("username=>",data.ConstructUsername,"password=>",data.ConstructPassword,"status=>",status_construct);
            }
          }
        }
      ]
    });
    resgster_promt.present();
  }
}

