import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { CheckinService } from '../../services/CheckinService';

import { ProfilePage } from '../profile/profile';

@Component({
    templateUrl: 'checkin.html',
    providers: [CheckinService]
})
export class CheckinPage {

    requestDone: boolean = false;
    checkin: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private checkinService: CheckinService,
        private barcodeScanner: BarcodeScanner
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

    /**
     * Run the barcode plugin
     */
    startScanner() {
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
