import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { Storage } from '@ionic/storage';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { AlertController } from 'ionic-angular';
import { CustomerPage } from '../customer/customer';
// import {HttpClient} from '@angular/common/http';

/**
 * Generated class for the DataRentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-rent',
  templateUrl: 'data-rent.html',
})
export class DataRentPage {

  details: any;

  tec_id: any;
  details_tecID: any;
  Detail_for: any={};
  rating: string = "";
  guest: any; 
  guest_id: any;
  mydata: any = {};

  test: any = {};
  address: any = {};
  // guest_address:string="http://10.5.6.42/Final_Project/service/CustomerForRent.php";
  // id_tec:any;

  rating_complacent:any={}

  @Input() numStars: number = 5;//full star number
  @Input() value: number = 4;//number begin
  @Input() leitura: boolean = false;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();
  stars: string[] = [];//check index value onClick and loop starNumber

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storeage: Storage,
    private GetDataProvider: GetDataProvider,
    public alertCtrl: AlertController,
    private storage: Storage,
    // private http:HttpClient

  ) {
    

    this.guest = this.storage.get('guest').then((val) => {
      let data_guest = val
      this.guest_id = data_guest.data_user.id
      // console.log('customer_address_page=>',data_guest);
      // console.log('id_guest=>',val); 
    }).catch((err) => { 
      console.log('fail=>', err);
    })

    


  }//constructor

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DataRentPage');
  // }
  ionViewWillEnter(){

    this.details = this.storage.get('details').then((success) => {
      this.mydata = success;
      // console.log('get_detail=>', success);
    }).catch((fail) => {
      console.log('fail=>', fail);
    })//details

    this.tec_id = this.storeage.get('tech').then((succ) => {
      this.Detail_for = succ
      let id_tec = this.Detail_for.id;
      console.log('ID_TEC=>', this.Detail_for);

    }).catch((err) => {
      console.log('false_get_tech=>', err);
    })//tech
  }

  ngAfterViewInit() {
    this.calc();
  }
  calc() {
    this.stars = [];
    let tmp = this.value;
    for (let i = 0; i < this.numStars; i++ , tmp--) {
      if (tmp >= 1) {
        this.stars.push("star");
      }
      else if (tmp > 0 && tmp < 1) {
        this.stars.push("star-half");
      }
      else {
        this.stars.push("star-outline");
      }
    }
  }
  starClicked(index) {

    this.value = index + 1;
    this.ionClick.emit(this.value);
    this.calc();
    // console.log(this.value);

  }

  submit(rating, refresher) {
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการประเมินหรือไม่?',
      // message: 'เมื่อยืนยันการประเมินข้อมูลนี้จะถูกลบออกจากรายการ',
      buttons: [
        {
          text: 'ไม่',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.storage.remove('tech')
            this.storage.remove('details')
            // this.navCtrl.insert(0,CustomerPage);
            this.ionViewWillEnter();
            this.navCtrl.popToRoot();
            this.GetDataProvider.rating(
              rating,
              this.Detail_for.id,
              this.guest_id
            ).then((result) => {
              console.log('result=>', result)
              this.rating_complacent = result;
              let ratings = this.rating_complacent.message
              console.log('ratings', ratings)
              alert(ratings);
            }).catch((err) => {
              console.log('fail', err)
            })
          }
        }
      ]
    });
    confirm.present();
  }

}//calss
