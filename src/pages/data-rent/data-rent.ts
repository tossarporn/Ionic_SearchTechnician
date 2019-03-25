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
  test_details_tec :any = {}
  all:string
  
  //segment disable
  Disabled_data_rent:boolean ;
  Disabled_status:boolean;
  section:any;
  //segment display
  display_rent:boolean;
  display_status:boolean;

  //segment_status
    seg_status:string="rent";
    check_tus:string = "อยู่ระหว่างการซ่อม";
    wait_rents:any;
    success_rents:any
    display_wait:boolean
    images: any="";
    icon:any="";
  // guest_address:string="http://10.5.6.42/Final_Project/service/CustomerForRent.php";
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
    this. ionViewWillEnter();
  }//constructor

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DataRentPage');
  // }

  onSegmentChanged(segmentButton: '') {
   
  }

  onSegmentSelected(segmentButton: '') {
    
  }

  ionViewWillEnter(){
    this.storage.get('details_tec')
    .then((details_tec_succ)=>{
      this.test_details_tec = details_tec_succ
     
      if(this.test_details_tec == null){
        this.display_rent = true
        this.Disabled_status = true
        this.section = "for_rents"
      }
      else{

      this.storage.get('details_gue')
      .then((details_gue_succ)=>{
      this.test_details_gue = details_gue_succ;

      let month = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
      let date = this.test_details_gue.mydate.split("-")

      let year = date[0]
      let month_parse = month[parseInt(date[1])-1];
      let day = date[2];

      this.all = day+"-"+month_parse+"-"+year
      this.GetDataProvider.show_data_rent
                (
                  this.test_details_gue.guest_id
                ).then((success_rent)=>{
                  let rent_data = success_rent["0"].status_seg
                  this.wait_rents = success_rent["0"].check_tus
                  this.success_rents = success_rent["0"].check_tus
                  if( rent_data == "rent"){
                      this.Disabled_data_rent = true
                      this.Disabled_status = false
                      this.section = "for_status"
                      if(this.wait_rents == "อยู่ระหว่างการซ่อม" )
                      {
                          this.display_wait = true
                      }
                     else if(this.wait_rents == "การซ่อมเสร็จสิ้น" )
                      {
                        this.display_wait = false
                      }
                    }
                    
                    else{
                      this.display_rent = false
                      this.Disabled_status = true
                      this.section = "for_rents"
                    }
                }
                ).catch((fail_rent)=>{
                  console.log("fail_rent=>",fail_rent);
                  
                })
      
    })
    .catch((details_gue_err)=>{
      console.log('details_gue_err=>',details_gue_err);
    })//details_gue

      }
      // console.log('details_tec_succ=>',details_tec_succ);
    })
    .catch((details_tec_err)=>{
      console.log('details_tec_err=>',details_tec_err);
    })//details_tec
    
  }//ionViewWillEnter


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
          text: 'เลือกรูปภาพ',
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
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }//image


  submit_rent(){
    
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการจอง',
      message: 'คุณต้องการยืนยันการจองใช่ ?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {

            this.GetDataProvider.builid_guest(
              this.test_details_gue.guest_name,
              this.test_details_gue.guest_lastname, 
              this.test_details_gue.guest_tel,
              this.test_details_tec.type_name,
              this.test_details_gue.guest_num_house,
              this.test_details_gue.guest_street,
              this.test_details_gue.guest_distric,
              this.test_details_gue.guest_area,
              this.test_details_gue.mydate,
              this.test_details_tec.id,
              this.test_details_gue.guest_id,
              this.test_details_tec.ref_regis_tec,
              this.seg_status,
              this.check_tus
            ).then((res) => {
              
              let loading = this.loadingCtrl.create({
                content: 'กรุณารอสักครู่ ...'
              });
            
              loading.present();
            
              setTimeout(() => {
                this.data_array = res;
                let message = this.data_array.message;
                let status = this.data_array.status;
               
                console.log("this.data_array=>",this.data_array);
                
                console.log("message=>",message);
                console.log("status=>",status);

                const confirm = this.alertCtrl.create({
                  title: 'แจ้งเตือนจากระบบ',
                  message: message,
                  buttons: [
                    {
                      text: 'ตกลง',
                      handler: () => {
                        this.navCtrl.setRoot(this.navCtrl.getActive().component);
                      }
                    }
                  ]
                });
                loading.dismiss();
                confirm.present();
              }, 3000);

              }).catch((val_err)=>{
                console.log(val_err);
              })//guest_data

            console.log('yes clicked');
          }
        }
      ]
    });
    alert.present();
  }

  cancle_submit(){


    const cancel = this.alertCtrl.create({
      title: 'ยืนยันยกเลิกการจองหรือไม่?',
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
              this.GetDataProvider.cut_confirm_rent(
                this.test_details_tec.id,
                this.test_details_gue.guest_id,
                this.test_details_tec.ref_regis_tec
              )
              .then((cut_success)=>{
                let message_success:any = cut_success

                const confirm = this.alertCtrl.create({
                  title: message_success.message,
                  buttons: [
                    {
                      text: 'ตกลง',
                      handler: () => {
                         this.navCtrl.setRoot(this.navCtrl.getActive().component);
                         this.storage.remove('details_gue')
                         this.storage.remove('details_tec');
                      }
                    }
                  ]
                });
                confirm.present();
              }).catch((cut_err)=>{
                console.log("cut_err=>",cut_err);
              })

              loading.dismiss();
            }, 3000);
          }
        }
      ]
    });
    cancel.present();

    
  }

  submit(rating) {
    
      let new_date = new Date()
      let new_year = new_date.getFullYear ().toString()
      let new_month = new_date.getMonth().toString()
      let array_month = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
      let new_days = new_date.getDate().toString()

      let date_img = new_days+"-"+array_month[new_month]+"-"+new_year;
    
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
                      this.storage.remove('details_gue')
                      this.storage.remove('details_tec');
                      
                      this.GetDataProvider.rating(
                                  rating,
                                  this.test_details_tec.id,
                                  this.test_details_gue.guest_id,
                                  this.test_details_tec.ref_regis_tec
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

                        this.GetDataProvider.insert_img_taxinvoice(
                        this.test_details_tec.id,
                        this.test_details_tec.ref_regis_tec,
                        this.test_details_gue.guest_id,
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

    this.callNumber.callNumber(this.call_tecnician, true)
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
