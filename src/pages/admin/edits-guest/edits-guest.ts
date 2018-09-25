import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GetDataProvider } from '../../../providers/get-data/get-data';
import { AlertController } from 'ionic-angular';
import { DetailsEdtingGuestPage } from '../details-edting-guest/details-edting-guest';
import { Storage } from '@ionic/storage';
import {AdminPage} from '../admin';

/**
 * Generated class for the EditsGuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edits-guest',
  templateUrl: 'edits-guest.html',
})
export class EditsGuestPage {
  guest_editing: boolean;
  check_all: boolean;
  details_guset: any;
  phobia: any;

  get_details: any;
  loop_id: any;
  message_success: any

  constructor
    (
    public navCtrl: NavController,
    public navParams: NavParams,
    public AlertController: AlertController,
    private GetDataProvider: GetDataProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController

    ) {
    this.guest_editing = false
    this.get_guest()
  }//constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditsGuestPage');
  }

  get_guest() {
    this.GetDataProvider.get_loop_detail_guest()
      .then((data) => {
        this.details_guset = data
        console.log("data_success", this.details_guset);
      }).catch((error) => {
        console.log("error=>", error);
      })
  }

  guest_delete() {
    const confirm = this.AlertController.create({
      title: 'แจ้งเตือนจากระบบ',
      message: 'คุณต้องการลบข้อมูลหรือไม่?',
      buttons: [
        {
          text: 'ไม่',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            this.GetDataProvider.delete_guest(
              this.get_details
            )
              .then((success) => {
                let loading = this.loadingCtrl.create({
                  content: 'กรุณารอสักครู่...',
                  spinner: 'bubbles'
                });

                loading.present();

                setTimeout(() => {
                  let details_message: any = success
                  this.message_success = details_message.message
                  const confirm = this.AlertController.create({
                    title: 'แจ้งเตือนจากระบบ?',
                    message: this.message_success,
                    buttons: [
                      {
                        text: 'ตกลง',
                        handler: () => {
                          this.navCtrl.setRoot(this.navCtrl.getActive().component);//refresh page
                          console.log('Agree clicked');
                        }
                      }
                    ]
                  });
                  confirm.present();

                  loading.dismiss();
                }, 1000);
                console.log(success);
              }).catch((err) => {
                console.log(err);
              })
            console.log(this.get_details);
          }
        }
      ]
    });
    confirm.present();
  }//guest_delete

  guest_delete_all() {
    const delete_all = this.AlertController.create({
      title: 'แจ้งเตือนจากระบบ',
      message: 'คุณต้องการลบข้อมูลหรือไม่?',
      buttons: [
        {
          text: 'ไม่',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'กรุณารอสักครู่...',
              spinner: 'bubbles'
            });

            loading.present();

            setTimeout(() => {

              const confirm = this.AlertController.create({
                title: 'แจ้งเตือนจากระบบ',
                message: 'ลบข้อมูลสำเร็จ',
                buttons: [
                  {
                    text: 'ตกลง',
                    handler: () => {
                      // console.log('Agree clicked');
                    }
                  }
                ]
              });
              confirm.present();
              this.GetDataProvider.delete_guest
              loading.dismiss();
            }, 3000);
            for (let i = 0; i < this.details_guset.length; i++) {
              this.loop_id = this.details_guset[i].id

              this.GetDataProvider.delete_guest(
                this.loop_id
              )
                .then((success) => {
                  this.details_guset.splice(i)
                  console.log(success);
                }).catch((err) => {
                  console.log(err);
                })
              console.log(this.loop_id);
            }
          }
        }
      ]
    });
    delete_all.present();
  }//guest_delete_all

  checks_all() {
    this.check_all = true
    console.log(this.check_all);
  }

  submit(eve: any) {
    this.navCtrl.push(DetailsEdtingGuestPage,
      {
        details_guest: eve
      })
    console.log(eve);
  }
  bia(_item) {
    this.get_details = _item
  }

  back_technician(){
    this.navCtrl.push(AdminPage);
  }
}
