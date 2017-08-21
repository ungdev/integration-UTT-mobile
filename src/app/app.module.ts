import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { StudentsPage } from '../pages/students/students';
import { TeamsPage } from '../pages/teams/teams';
import { TeamPage } from '../pages/team/team';
import { CheckinsPage } from '../pages/checkins/checkins';
import { CheckinPage } from '../pages/checkin/checkin';
import { CreateCheckinPage } from '../pages/createCheckin/createCheckin';
import { CompareCheckinsPage } from '../pages/compareCheckins/compareCheckins';
import { PushMessagesPage } from '../pages/pushMessages/pushMessages';
import { AuthQRCodePage } from '../pages/authQRCode/authQRCode';
import { ChatPage } from '../pages/chat/chat';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': 'd0bc3cc8'
    },
    'push': {
        'sender_id': '403744287486',
        'pluginConfig': {
            'ios': {
            'badge': true,
            'sound': true
        },
            'android': {
                'iconColor': '#343434'
            }
        }
    }
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage,
    StudentsPage,
    TeamsPage,
    TeamPage,
    PushMessagesPage,
    CheckinsPage,
    CheckinPage,
    CreateCheckinPage,
    AuthQRCodePage,
    CompareCheckinsPage,
    ChatPage,
  ],
  imports: [
      BrowserModule,
      HttpModule,
      IonicModule.forRoot(MyApp),
      CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage,
    StudentsPage,
    TeamsPage,
    TeamPage,
    PushMessagesPage,
    CheckinsPage,
    CheckinPage,
    CreateCheckinPage,
    AuthQRCodePage,
    CompareCheckinsPage,
    ChatPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    BarcodeScanner,
    Geolocation,
  ]
})
export class AppModule {}
