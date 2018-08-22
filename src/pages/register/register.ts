import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { GetDataProvider } from '../../providers/get-data/get-data'
import { Alert } from 'ionic-angular/components/alert/alert';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { Location } from '@angular/common';


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
  private detail: FormGroup
  // host:string;
  address: any = {};
  guest_data: any;
  data_area: any = "";
  area: any = "";
  status_guest: string
  details_guest = {
    Username: '',
    Password: '',
    name: '',
    last_name: '',
    tel: '',
    num_house: '',
    street: '',
    ditstric: '',
    // myDate: '',
  };
  result: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController,
    public getprovi: GetDataProvider,
    public http: HttpClient,
    private formBuilder: FormBuilder,

  ) {
    this.detail = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      // equipment: ['', Validators.required],
      num_house: ['', Validators.required],
      street: ['', Validators.required],
      ditstric: ['', Validators.required],
      area: ['', Validators.required],
      // myDate: ['', Validators.required],
      tel: ['', Validators.required],
    });
    // this.navParams.get('item');
    this.get_status();
    this.get_area()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  get_area() {
    this.getprovi.show_area()
      .then((data) => {
        this.data_area = data;
        console.log('area_success=>', this.data_area);
      })
      .catch((error) => {
        console.log('area_error=>', error)
      });//show_area
  }
  get_status() {
    this.status_guest = this.navParams.get("item");
    console.log(this.status_guest);
  }

  submit() {
    console.log("details=>", this.details_guest);
    console.log("area=>", this.area);
    console.log("status=>", this.status_guest);
    this.navCtrl.push(HomePage,{status_guest:this.status_guest})
    

      this.getprovi.guest_register(
        this.details_guest.Username,
        this.details_guest.Password,
        this.details_guest.name,
        this.details_guest.last_name,
        this.details_guest.tel,
        this.details_guest.num_house,
        this.details_guest.street,
        this.details_guest.ditstric,
        this.area,
        this.status_guest,

      )
        .then((val) => {
          this.result = val;
          let message = this.result.message;
          let regis_status = this.result.status

          // console.log("message=>",message);
          console.log("success=>", val);
          if (regis_status == true) {
            const sure_alert = this.alert.create({
              title: "แจ้งเตือนจากระบบ",
              subTitle: message,
              buttons: [
                {
                  text: 'ยืนยัน',
                  handler: () => {
                    this.navCtrl.push(HomePage)
                  }
                }
              ]
            })
            sure_alert.present();
          } else {
            const fail_alert = this.alert.create({
              title: "แจ้งเตือนจากระบบ",
              subTitle: message,
              buttons: [
                {
                  text: 'ยืนยัน',
                  handler: () => {
                  }
                }
              ]
            })
            fail_alert.present();
          }
        })
        .catch((err) => {
          console.log("error=>", err);
        })
  }
}



