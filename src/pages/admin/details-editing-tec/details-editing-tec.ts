import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDataProvider } from '../../../providers/get-data/get-data';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the DetailsEditingTecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-editing-tec',
  templateUrl: 'details-editing-tec.html',
})
export class DetailsEditingTecPage {
  get_details_tec: any;
  data_area: any;
  data_equipment: any;

  details_tec = {
    ref_area_name: '',
    ref_type_equipment: '',
    name_store: '',
    account: '',
    tel: '',
    time_start: '',
    time_end: '',
    cost_begin: '',
    num_house: '',
    street: '',
    distric: '',
    ref_id_tec: '',
  }



  constructor
    (
    public navCtrl: NavController,
    public navParams: NavParams,
    private GetDataProvider: GetDataProvider,
    private alertCtrl: AlertController
    ) {

    this.show_details();
    this.show_area();
    this.show_equipment();
    // this.submit();

  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsEditingTecPage');
  }

  show_details() {
    this.get_details_tec = this.navParams.get("details_technician")
    this.details_tec.ref_id_tec = this.get_details_tec.ref_regis_tec
    this.details_tec.ref_area_name = this.get_details_tec.ref_area
    this.details_tec.ref_type_equipment = this.get_details_tec.ref_type
    this.details_tec.name_store = this.get_details_tec.name_store;
    this.details_tec.tel = this.get_details_tec.tel_technician;
    this.details_tec.account = this.get_details_tec.account_bank;
    this.details_tec.time_start = this.get_details_tec.time_start;
    this.details_tec.time_end = this.get_details_tec.time_end;
    this.details_tec.num_house = this.get_details_tec.home_number;
    this.details_tec.cost_begin = this.get_details_tec.cost_begin;
    this.details_tec.distric = this.get_details_tec.district;
    this.details_tec.street = this.get_details_tec.street;
    // console.log("get_details_tec=>", this.get_details_tec);
    // console.log("this.id=>", this.details_tec);

  }

  show_area() {
    this.GetDataProvider.show_area()
      .then((data) => {
        this.data_area = data;
        // console.log('area_success=>', this.data_area); 
      })
      .catch((error) => {
        console.log('area_error=>', error)
      });//show_area
  }

  show_equipment() {
    this.GetDataProvider.show_equipment()
      .then((data) => {
        this.data_equipment = data;
        // console.log('data_equipment=>', this.data_equipment); 
      })
      .catch((error) => {
        console.log('area_error=>', error)
      });//show_area
  }
  submit() {
    this.GetDataProvider.technicain_update_details(
      this.details_tec.ref_id_tec,
      this.details_tec.ref_area_name,
      this.details_tec.ref_type_equipment,
      this.details_tec.name_store,
      this.details_tec.tel,
      this.details_tec.account,
      this.details_tec.time_start,
      this.details_tec.time_end,
      this.details_tec.num_house,
      this.details_tec.cost_begin,
      this.details_tec.distric,
      this.details_tec.street
    ).then((success) => {
      let success_update: any = success;
      let message_update_success = success_update.message
        const message_success = this.alertCtrl.create({
          title: 'แจ้งเตือนจากระบบ',
          subTitle: message_update_success,
          buttons: ['OK']
        });
        message_success.present();

      // console.log("message_update_success=>",message_update_success);
      // console.log("success_submit=>",success_update);
      // console.log("this.details_tec=>",this.details_tec);
    }).catch((error) => {
      console.log("error=>", error);
    })
    console.log("this.details_tec=>",this.get_details_tec);
    
  }

}
