import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';


//page
import { RegisterPage } from '../register/register';
import { TechnicianPage } from '../technician/technician';
import { CustomerPage } from '../customer/customer';
import { SearchPage } from '../search/search';
//Internet
import { GetDataProvider } from '../../providers/get-data/get-data';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  // private todo : FormGroup;//new

  username: string = "";
  password: string = "";
  status:any;

  res: any;
  alert_message: any
  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    public getprovi: GetDataProvider,
    public AlertController: AlertController,
    private storage: Storage,
    private formBuilder: FormBuilder//new

  ) {
    
   

  }//constructor
  register_guest(_item) {
    this.navCtrl.push(RegisterPage, { item: _item });
    console.log(_item);
  }
  login(_item_login) {
    
    console.log("username=>",this.username,"password=>",this.password,"status=>",this.status);
    // let status_guest = this.navParam.get("item")

    this.getprovi.login_provider(this.username, this.password,this.status)
      .then((data) => {
        this.res = data;
        this.status = this.res.data_user.status;
        let message_user = this.res.message;
        console.log('data_guest=>', data);

        if (this.status == 1) {

          const confirm = this.AlertController.create({
            title: 'ยินดีต้อนรับลูกค้าทุกท่าน',
            message: message_user,
            buttons: [
              {
                text: 'ยืนยัน',
                handler: () => {
                  this.storage.set('guest', this.res).then((succ) => {
                    this.navCtrl.push(CustomerPage)
                  }).catch((err) => {
                    console.log('error_home=>', err)
                  })
                }
              }
            ]
          });//setData_guest
          confirm.present();
        } else if (this.status == 2) {

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
        } else {
          const fail = this.AlertController.create({
            title: 'แจ้งเตือนจากระบบ',
            message: message_user,
            buttons: [
              {
                text: 'ยืนยัน',
                handler: () => {
                  console.log('Agree clicked');
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
            if (data.ConstructUsername == "" || data.ConstructPassword == "") {
              alert("กรุณากรอกข้อมูล");
            }
            else {
              this.getprovi.register_provi(data.ConstructUsername, data.ConstructPassword,status_construct)
                .then((result) => {
                  this.alert_message = result
                  let success_message = this.alert_message.message
                  alert(success_message)
                  this.navCtrl.push(TechnicianPage);
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

