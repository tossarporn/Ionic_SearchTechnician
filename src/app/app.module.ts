import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Dialogs } from '@ionic-native/dialogs';
import { HttpClientModule} from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';

//page controller
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import {CustomerPage} from'../pages/customer/customer';
import {TechnicianPage} from'../pages/technician/technician';
import {BulidRoomPage} from '../pages/technician/bulid-room/bulid-room';
import {ChartRoomPage} from '../pages/technician/chart-room/chart-room';
import {AdminDetailPage} from '../pages/technician/admin-detail/admin-detail';
import {RentPage} from '../pages/technician/rent/rent';
import {ChartContentCustomerPage}from '../pages/technician/chart-room/chart-content-customer/chart-content-customer';
import{EquipmentMountPage} from'../pages/technician/chart-room/equipment-mount/equipment-mount'
import {CustomerAmountPage} from '../pages/technician/chart-room/customer-amount/customer-amount';
import{SerachPage} from '../pages/customer/serach/serach';

//send internet
import { GetDataProvider } from '../providers/get-data/get-data';
import {ChartsModule} from 'ng2-charts';
import {GoogleMaps} from '@ionic-native/google-maps';


//upload images
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Calendar } from '@ionic-native/calendar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    CustomerPage,
    TechnicianPage,
    BulidRoomPage,
    ChartRoomPage,
    AdminDetailPage,
    RentPage,
    ChartContentCustomerPage,
    EquipmentMountPage,
    CustomerAmountPage,
    SerachPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    CustomerPage,
    TechnicianPage,
    BulidRoomPage,
    ChartRoomPage,
    AdminDetailPage,
    RentPage,
    ChartContentCustomerPage,
    EquipmentMountPage,
    CustomerAmountPage,
    SerachPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    Geolocation,
    File,
    FileTransfer,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetDataProvider,
    Calendar,
    GoogleMaps
  ]
})
export class AppModule {}
