import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import {Camera,CameraOptions, PictureSourceType} from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {Validators, FormBuilder, FormGroup ,AbstractControl,FormControl }from '@angular/forms';

import {GetDataProvider } from '../../../providers/get-data/get-data';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Alert } from 'ionic-angular/components/alert/alert';
import { stringify } from '@angular/compiler/src/util';
import { TechnicianPage } from '../technician';




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

// latlng:any;
public lat : number= 0;
public lng : number= 0;
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

data_inputjson:any;
private myform : FormGroup;//new  

// id:string="";
// name_area:string="";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public getdataProvider :GetDataProvider, 
              private geolocation:Geolocation,
              private camera: Camera, 
              public alertCtrl:AlertController,
              public actionSheetCtrl: ActionSheetController, 
              private formBuilder: FormBuilder//new
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
    lat:['',Validators.required],
    lng:['',Validators.required],
  });
this.images = 'assets/imgs/photo-camera.png'; 
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
                quality:100,
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
      // resp.coords.latitude
      // resp.coords.longitude
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log('success',resp);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }//location
 
  submit(){
    // alert(this.area);
    // alert(this.equipment);
    // alert(this.image_base64);

    this.getdataProvider.creat_store(this.name_store,this.equipment,this.tel,this.time_start,this.time_end,this.cost_begin,
    this.num_house,this.street,this.distric,this.area,this.account,this.lat,this.lng,this.images
    ).then((res)=>{
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
        // alert(JSON.stringify(res))
        // console.log(res);
      })
      .catch((err)=>{ 
        alert("กรุณากรอกข้อมูลให้ครบด้วยครับ");
        console.log(err); 
      })
      //upload_imges
      // this.getdataProvider.creat_img(this.images).then((res)=>{
        // 
        // alert(JSON.stringify(res));
        // alert("success");
      //   console.log(res);
      // }).catch((err)=>{
        // alert(JSON.stringify(err));
        // alert('fail');
        // console.log(err); 
      // })
  }//submit

}//BulidRoomPage
