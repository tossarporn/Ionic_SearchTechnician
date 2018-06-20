import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import {Camera,CameraOptions, PictureSourceType} from '@ionic-native/camera';

import {Validators, FormBuilder, FormGroup ,AbstractControl,FormControl }from '@angular/forms';

import {GetDataProvider } from '../../../providers/get-data/get-data';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Alert } from 'ionic-angular/components/alert/alert';
import { stringify } from '@angular/compiler/src/util';
import { TechnicianPage } from '../technician';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';

//Geolocation getCurrent location
import { Geolocation } from '@ionic-native/geolocation';



/**
 * Generated class for the BulidRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bulid-room',
  templateUrl: 'bulid-room.html',
})
export class BulidRoomPage {

lat : number= 0 ;
lng : number= 0;
name_store:string='' ;
tel: string='';
time_start:string='' ;
time_end: string='';
cost_begin: string='';
num_house: string='';
street: string='';
images: any="";
area : any="";
area_for : any="";
account:string='';
distric : string='';
type_equipment:any="";
equipment:any='';
tec_id:string="";

data_inputjson:any;//loop
private myform : FormGroup;//new  
res:any;
// id:string="";
// name_area:string="";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public getdataProvider :GetDataProvider, 
              public geolocation:Geolocation,
              private camera: Camera, 
              public alertCtrl:AlertController,
              public actionSheetCtrl: ActionSheetController, 
              private formBuilder: FormBuilder,//new
              private http:HttpClient,
              private storage:Storage
              ) 
{
  
  this.myform = this.formBuilder.group({
    name_stroe: ['', Validators.required],
    account: ['',Validators.required],
    equipment:['',Validators.required],
    tel:['',Validators.required],
    time_start:['',Validators.required],
    time_end:['',Validators.required],
    cost_beging:['',Validators.required],
    num_house:['',Validators.required],
    street:['',Validators.required],
    distric:['',Validators.required],
    area:['',Validators.required],
    // lat:['',Validators.required],
    // lng:['',Validators.required],
    // images :'assets/imgs/photo-camera.png'
  });
  this.lat;
  this.lng;
  this.images = 'assets/imgs/photo-camera.png';
  this.get_data_tech(); 
}
  ionViewCanEnter(){
    this.getdataProvider.show_area()
    .then((data)=>{
      this.area_for = data;
      let tech_area = this.area.area_name;
      let tech_id = this.area.id;
      
      //alert(JSON.stringify(data));
      console.log('area==>',data);
    }).catch((err)=>{
      alert(JSON.stringify(err));
    })//show_area
    
    this.getdataProvider.show_equipment()
    .then((data_typ)=>{
      this.type_equipment = data_typ; 
      let tech_equipment = this.type_equipment.type_name;
      let tech_equipmentID = this.type_equipment.id;
      // alert(JSON.stringify(data_typ));
      console.log('data_typ==>',data_typ);
    })
    .catch((err)=>{
      alert(JSON.stringify(err));
    })//show_equipment
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BulidRoomPage');
    
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
  
  location(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log('success',this.lat,this.lng);
     }).catch((error) => {
      alert(error);
       console.log('Error getting location', error);
});
  }//location
 get_data_tech(){
  this.storage.get('tec').then((val) => {
    this.res = val
    this.tec_id = this.res.data_user.id;
    console.log('build_room_page=>',  this.tec_id );
    })
 }//get_data_tech
  submit(){
    this.getdataProvider.creat_store(this.name_store,this.equipment,this.tel,this.time_start,this.time_end,this.cost_begin,
    this.num_house,this.street,this.distric,this.area,this.account,this.lat,this.lng,this.images,this.tec_id).then((res)=>{
      this.data_inputjson = res;
      let data_text = this.data_inputjson.message;
      let data_status = this.data_inputjson.status;
        if(data_status == true){
            alert(data_text);
            this.navCtrl.push(TechnicianPage);
        }
        else if(data_status == false){
          alert(data_text);
        }
        else{
          alert(JSON.stringify(res))
        }
      })
      .catch((err)=>{ 
        alert("กรุณากรอกข้อมูลให้ครบด้วยครับ");
        console.log(err); 
      })
  }//submit

}//BulidRoomPage
