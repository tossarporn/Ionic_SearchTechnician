import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CheckImgTaxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-img-tax',
  templateUrl: 'check-img-tax.html',
})
export class CheckImgTaxPage {
  show_imgs = "http://10.5.8.74"
  details:any
  img:any
  day_picture:string
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
  this.details_tax();
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckImgTaxPage');
  }
  details_tax(){
    this.details = this.navParams.get('customer_details')
    console.log(this.details);
    this.img = this.navParams.get('tax_picture');
    console.log(this.img);
    this.day_picture = this.navParams.get('date_picture')
    console.log(this.day_picture);
    
    // let imges = this.navParams.get('count_imgs')
    // console.log("imges=>",imges);
    
    // console.log(this.img.length);
    // console.log(this.img);
    // for(let i=0; i<this.img.length;i++){
    //     let count_img = this.img[i]
    //     console.log(count_img);
        
    // }
  }
}//class
