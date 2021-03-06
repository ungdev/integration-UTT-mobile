import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

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
import { RallyePage } from '../pages/rallye/rallye';
import { LocationPage } from '../pages/location/location';
import { CalendarPage } from '../pages/calendar/calendar';
import { EventPage } from '../pages/event/event';
import { SearchStudentPage } from '../pages/searchStudent/searchStudent'
import { OneSignal } from '@ionic-native/onesignal'
import { GoogleAnalytics } from '@ionic-native/google-analytics'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { Geolocation } from '@ionic-native/geolocation';
// import { GoogleMaps } from '@ionic-native/google-maps';

// import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/* const cloudSettings: CloudSettings = {
    'core': {
        'app_id': 'd0bc3cc8'
    },
    'push': {
        'sender_id': '935939627079',
        'pluginConfig': {
            'ios': {
                'badge': true,
                'sound': true
            },
            'android': {
                'iconColor': '#343434',
                'vibrate': true,
                'forceShow': true
            }
        }
    }
}; */

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
    RallyePage,
    LocationPage,
    CalendarPage,
    EventPage,
    SearchStudentPage,
  ],
  imports: [
      BrowserModule,
      HttpModule,
      IonicModule.forRoot(MyApp),
//      CloudModule.forRoot(cloudSettings)
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
    RallyePage,
    LocationPage,
    CalendarPage,
    EventPage,
    SearchStudentPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    BarcodeScanner,
    DocumentViewer,
    File,
    FileTransfer,
    GoogleAnalytics,
 //   Geolocation,
 //   GoogleMaps
  ]
})
export class AppModule {}
