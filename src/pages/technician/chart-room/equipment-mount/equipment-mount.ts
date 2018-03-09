import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Platform } from 'ionic-angular/platform/platform';
/**
 * Generated class for the EquipmentMountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipment-mount',
  templateUrl: 'equipment-mount.html',
})
export class EquipmentMountPage {
  event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private calendar: Calendar,
    private platform:Platform
  ) 
  { 
    
}

}
