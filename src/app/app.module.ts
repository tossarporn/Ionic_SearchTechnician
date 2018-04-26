import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular-trial';
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
import {TechnicianPage} from'../pages/technician/technician';
import {BulidRoomPage} from '../pages/technician/bulid-room/bulid-room';
import {ChartRoomPage} from '../pages/technician/chart-room/chart-room';
import {AdminDetailPage} from '../pages/technician/admin-detail/admin-detail';
import {RentPage} from '../pages/technician/rent/rent';
import {ChartContentCustomerPage}from '../pages/technician/chart-room/chart-content-customer/chart-content-customer';
import{EquipmentMountPage} from'../pages/technician/chart-room/equipment-mount/equipment-mount'
import {CustomerAmountPage} from '../pages/technician/chart-room/customer-amount/customer-amount';
import {CustomerPage} from '../pages/customer/customer';
import {SearchPage} from '../pages/search/search'
import {DataRentPage} from '../pages/data-rent/data-rent'
import {SearchEquipmentPage} from '../pages/search-equipment/search-equipment'
import {ShowTecDetailPage} from '../pages/show-tec-detail/show-tec-detail'
import {DetailTecPage} from '../pages/detail-tec/detail-tec'
import {CustomerAddressPage} from '../pages/customer-address/customer-address';

//send internet
import { GetDataProvider } from '../providers/get-data/get-data';
import {ChartsModule} from 'ng2-charts';
import {GoogleMaps} from '@ionic-native/google-maps';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import {AppRate} from '@ionic-native/app-rate';


//upload images
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Calendar } from '@ionic-native/calendar';

//components
import {IonRatingComponent} from '../components/ion-rating/ion-rating'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    TechnicianPage,
    BulidRoomPage,
    ChartRoomPage,
    AdminDetailPage,
    RentPage,
    ChartContentCustomerPage,
    EquipmentMountPage,
    CustomerAmountPage,
    CustomerPage,
    SearchPage,
    DataRentPage,
    SearchEquipmentPage,
    ShowTecDetailPage,
    DetailTecPage,
    CustomerAddressPage,
    IonRatingComponent
    
  ],
  imports: [ 
    FormsModule, 
    MbscModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChartsModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    TechnicianPage,
    BulidRoomPage,
    ChartRoomPage,
    AdminDetailPage,
    RentPage,
    ChartContentCustomerPage,
    EquipmentMountPage,
    CustomerAmountPage,
    CustomerPage,
    SearchPage,
    DataRentPage,
    SearchEquipmentPage,
    ShowTecDetailPage,
    DetailTecPage,
    CustomerAddressPage,
    IonRatingComponent
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
    GoogleMaps,
    CallNumber,
    AppRate 
  ]
})
export class AppModule {}
