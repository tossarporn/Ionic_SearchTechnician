import { Component, Input, Output, EventEmitter,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,LoadingController,ActionSheetController } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { Storage } from '@ionic/storage';
import { GetDataProvider } from '../../providers/get-data/get-data';
import { AlertController } from 'ionic-angular';
import { CustomerPage } from '../customer/customer';
import { CallNumber } from '@ionic-native/call-number';
import{ CustomerAddressPage } from '../customer-address/customer-address'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import {Pipe,PipeTransform} from '@angular/core';
import {SubCustomerAddressPage} from '../data-rent/sub-customer-address/sub-customer-address';
import {Camera,CameraOptions, PictureSourceType} from '@ionic-native/camera';
// import { Pipe, PipeTransform } from '@angular/core';
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

export class DataRentPage implements OnInit {
  pet: string ="puppies";
  countDown;
  counter = 10;
  tick = 1000;
  ngOnInit() {
    this.countDown = Observable.timer(0, this.tick)
      .take(this.counter)
      .map(() => --this.counter)
  }


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
  data_guest:any
  data_array: any;
 

  test_details_gue:any = {}
  test_details_tec:any
  all:string
  
  //segment disable
  Disabled_data_rent:boolean ;
  Disabled_status:boolean;
  section:any;
  //segment display
  display_rent:boolean;
  display_status:boolean;

  //segment_status
    // seg_status:string="rent";
    check_tus:string="";
    wait_rents:any;
    success_rents:any
    display_wait:boolean
    images: any="";
    icon:any="";

    details_home:string="";

    details_tech = {
      details_name_store:"",
      details_home:"",
      details_street:"",
      details_distric:"",
      details_area:"",
      details_tel:"",
      details_img:"",
      details_account:"",
      details_name_account:"",
      details_lastname_account:"",
    }
    show_img = "http://128.199.132.30"
  // guest_address:string="http://10.5.6.42//service/CustomerForRent.php";
  // id_tec:any;

  formatted:any
  rating_complacent:any={}
  call_tecnician:any;
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
    private callNumber: CallNumber,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,  
  ) 
  {
    this.images = 'assets/imgs/photo.png';
    // this.ionViewWillEnter();
    // this.test_details_gue = this.navParams.get('guest_details');
    // console.log("get_details=>", this.test_details_gue);
  }//constructor

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DataRentPage');
  // }

  onSegmentChanged(segmentButton: '') {
   
  }

  onSegmentSelected(segmentButton: '') {
    
  }

  ionViewWillEnter(){
   
    


    this.storage.get('tec')
    .then((tec_success)=>{
      this.test_details_tec = tec_success
      // this.all = this.test_details_gue.data_user.guest_area
      console.log("tec_success=>",this.test_details_tec);
    })
    .catch((tec_fail)=>{
      console.log("tec_fail=>",tec_fail);
      
    })
    
    this.storage.get('guest')
    .then((details_gue_succ)=>{
      this.test_details_gue = details_gue_succ
      console.log("details_gue_succ=>",this.test_details_gue.data_user.id);
      console.log("details_gue_succ=>",this.test_details_gue.data_user.guest_area);
      this.GetDataProvider.show_data_rent
                        (
                          this.test_details_gue.data_user.id
                        )
                        .then((success_rent)=>{
                          // let rent_data = success_rent["0"].status_seg
                          this.wait_rents = success_rent["0"].check_tus;
                          this.details_tech.details_name_store = success_rent['0'].details_store['0'].name_store;
                          this.details_tech.details_home = success_rent['0'].details_store['0'].home_number;
                          this.details_tech.details_street = success_rent['0'].details_store['0'].street;
                          this.details_tech.details_distric = success_rent['0'].details_store['0'].district;
                          this.details_tech.details_area = success_rent['0'].details_store['0'].area_name;
                          this.details_tech.details_tel = success_rent['0'].details_store['0'].tel_technician;
                          this.details_tech.details_img = success_rent['0'].details_store['0'].image_name;
                          this.details_tech.details_account = success_rent['0'].details_store['0'].account_bank;
                          this.details_tech.details_name_account = success_rent['0'].details_store['0'].name_account;
                          this.details_tech.details_lastname_account = success_rent['0'].details_store['0'].lastname_account;
                          console.log(this.details_tech.details_img);
                          
                          // this.success_rents = success_rent["0"].check_tus
                          // console.log("rent_data=>",this.details_tech.details_name_store);

                          if(this.wait_rents == ""){
                            this.display_rent = false
                            console.log("space");
                          }
                          else if( this.wait_rents == "อยู่ระหว่างการซ่อม"){
                            this.display_rent = true
                            this.display_wait = true
                            console.log("for_rents");
                          }
                          else if(this.wait_rents == "การซ่อมเสร็จสิ้น"){
                            this.display_rent = true
                            this.display_wait = false
                            console.log("rent");
                            
                          }
                          
                          // console.log("success_rent_district=>",success_rent['0'].details_store['0'].district);
                          // console.log("success_rent_home_number=>",success_rent['0'].details_store['0'].home_number);
                          // console.log("success_rent_name_store=>",success_rent['0'].details_store['0'].name_store);
                          // console.log("success_rent_street=>",success_rent['0'].details_store['0'].street);
                          // console.log("success_rent_tel_technician=>",success_rent['0'].details_store['0'].tel_technician);
                          console.log("success_rent_account_bank=>",success_rent['0'].details_store['0'].account_bank);
                          console.log("success_rent_name_account=>",success_rent['0'].details_store['0'].name_account);
                          console.log("success_rent_lastname_account=>",success_rent['0'].details_store['0'].lastname_account);
                          console.log("success_rent=>",success_rent);
                          
                        })
                        .catch((fail_rent)=>{
                          console.log("fail_rent=>",fail_rent);
                        })
    })
    .catch((details_gue_fail)=>{
      console.log("details_gue_fail=>",details_gue_fail);
      
    })
  }

  modify_details(){

    this.navCtrl.push(SubCustomerAddressPage);
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

  image(){
    let alert = this.actionSheetCtrl.create({
      title: 'กรุณาเลือกรูปภาพ',
      buttons: [
        {
          text: 'เลือกรูปภาพ SD Card',
          icon: 'ios-folder-open-outline',
          handler: () => {
            const options: CameraOptions = {
              quality: 50,
              targetWidth:180,
              targetHeight:120,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            }
            
            this.camera.getPicture(options).then((imageData) => {
             // imageData is either a base64 encoded string or a file URI
             // If it's base64:
             let base64Image = 'data:image/jpeg;base64,' + imageData;
             this.images = base64Image;
            }, (err) => {
             // Handle error
            });
            console.log('choose images');
          }
        },
        {
          // icon	:this.icon,
          text: 'เปิดกล้องโทรศัพท์',
          icon: 'md-tablet-portrait',
          handler: () => {
            const options:CameraOptions =
              {
                quality:50,
                destinationType:this.camera.DestinationType.DATA_URL,
                encodingType:this.camera.EncodingType.JPEG,
                mediaType:this.camera.MediaType.PICTURE
              }
                this.camera.getPicture(options).then((image_data)=>{
                let base64Image = 'data:image/jpeg;base64,'+image_data;
                this.images = base64Image;
               
            },(err)=>{
              console.log('opne camera');
            });
            
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon:'md-close'
        }
      ]
    });
    alert.present();
  }//image


  cancle_submit(){
    this.storage.remove('guest')
    this.storage.remove('tec');
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  submit(rating) {
      let new_date = new Date()
      let new_year = new_date.getFullYear ().toString()
      let new_month = new_date.getMonth().toString()
      let array_month = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
      let new_days = new_date.getDate().toString()

      let date_img = new_days+"-"+array_month[new_month]+"-"+new_year;
      console.log("date_img=>",date_img);
      
    
            const cancel = this.alertCtrl.create({
              title: 'ยืนยันการส่งข้อมูลหรือไม่?',
              buttons: [
                {
                  text: 'ยกเลิก',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: 'ยืนยัน',
                  handler: () => {
                    let loading = this.loadingCtrl.create({
                      content: 'กรุณารอสักครู่.....'
                    });
                  
                    loading.present();

                    setTimeout(() => {
                      this.navCtrl.setRoot(this.navCtrl.getActive().component);
                      this.GetDataProvider.rating(
                              rating,
                              this.test_details_tec.data_user.id, 
                              this.test_details_gue.data_user.id,
                              this.test_details_gue.data_user.ref_store,
                                ).then((result) => {
                                  console.log('result=>', result)
                                  this.rating_complacent = result;
                                  let ratings = this.rating_complacent.message
                                  // console.log('ratings', ratings)
                                  const alert = this.alertCtrl.create({
                                    title: ratings,
                                    buttons: ['OK']
                                  });
                                  alert.present();
                                }).catch((err) => {
                                  console.log('fail', err)
                                })
                        this.GetDataProvider.technician_update_rents
                        (
                          this.test_details_gue.data_user.ref_store,
                          this.test_details_gue.data_user.id,
                          this.check_tus
                        ).then((update_success)=>{
                          console.log("update_success=>",update_success);
                        }).catch((update_fail)=>{
                          console.log("update_fail=>",update_fail);
                        })

                        this.GetDataProvider.insert_img_taxinvoice(
                          this.test_details_gue.data_user.ref_store,
                          this.test_details_tec.data_user.id,
                          this.test_details_gue.data_user.id,
                          this.images,
                          date_img
                      ).then((insert_img_Tax_success)=>{
                        console.log("insert_img_Tax_success=>",insert_img_Tax_success);
                        
                      })
                      .catch((insert_img_Tax_false)=>{
                        console.log("insert_img_Tax_false=>",insert_img_Tax_false);
                      })
                                 
                      console.log('Agree clicked');
                      loading.dismiss();
                    }, 3000);
                  }
                }
              ]
            });
            cancel.present();
  }//submit


  call_tec(){
// console.log(this.details_tech.details_tel);

    this.callNumber.callNumber(this.details_tech.details_tel, true)
    .then((res)=>{
        console.log('tel_success=>',res);
    })
    .catch((error)=>{
      console.log('tel_error=>',error);
    })
    
  }//call_tec

}//calss
@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }

}