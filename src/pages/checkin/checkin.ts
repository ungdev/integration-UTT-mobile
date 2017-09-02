import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { CheckinService } from '../../services/CheckinService';
import { PlatformHelper } from '../../helpers/PlatformHelper';

import { ProfilePage } from '../profile/profile';

@Component({
    templateUrl: 'checkin.html',
    providers: [CheckinService, PlatformHelper]
})
export class CheckinPage {

    requestDone: boolean = false;
    checkin: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public platform: Platform,
        private checkinService: CheckinService,
        private barcodeScanner: BarcodeScanner,
        private platformHelper:PlatformHelper,
    ) {
        let id = this.navParams.get('id');

        // get the checkin
        this.checkinService.get({id})
            .subscribe(
                data => {
                    this.checkin = JSON.parse(data._body);
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

    /**
     * Run the barcode plugin
     */
    startScanner() {
        if (this.platformHelper.isMobile(this.platform)) {
            this.barcodeScanner.scan().then((barcodeData) => {
                // add the scanned user to this checkin and update this checkin
                this.checkinService.putStudent({id: this.checkin.id, email: barcodeData.text})
                    .subscribe(
                         data => {
                             this.checkin = JSON.parse(data._body);
                             console.log("STUDENT ADDED",this.checkin);
                         },
                         err => console.log("ADD err : ", err)
                    );
            }, (err) => {
                console.log('scan err', err);
            });
        }
    }

}
