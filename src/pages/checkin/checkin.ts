import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import { CheckinService } from '../../services/CheckinService';

import { ProfilePage } from '../profile/profile';

@Component({
    templateUrl: 'checkin.html',
    providers: [CheckinService]
})
export class CheckinPage {

    requestDone: boolean = false;
    checkin: object;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private checkinService: CheckinService,
        private qrScanner: QRScanner
    ) {
        let id = this.navParams.get('id');

        // get the checkin
        this.checkinService.get({id})
            .subscribe(
                data => {
                    this.checkin = JSON.parse(data._body);
                    console.log("CHECKIN",this.checkin);
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

    /**
     * navigate to the profile page of the user given in parameter
     *
     * @param integer id : the student id
     */
    viewStudent(id) {
        this.navCtrl.push(ProfilePage, {id});
    }

    startScanner() {


       // Optionally request the permission early
this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted
       console.log("okkkk");

       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
     }, err => console.log("scann err : ", err));

       // show camera preview
       this.qrScanner.show();

       // wait for user to scan something, then the observable callback will be called

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
    }

}
