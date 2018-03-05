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
//send internet
import { GetDataProvider } from '../providers/get-data/get-data';

//upload images
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    CustomerPage,
    TechnicianPage,
    BulidRoomPage,
    ChartRoomPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    CustomerPage,
    TechnicianPage,
    BulidRoomPage,
    ChartRoomPage

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
   
  ]
})
export class AppModule {}
