import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { CheckinService } from '../../services/CheckinService';
import { PlatformHelper } from '../../helpers/PlatformHelper';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

import { ProfilePage } from '../profile/profile';

@Component({
    templateUrl: 'checkin.html',
    providers: [CheckinService, PlatformHelper, AuthStorageHelper]
})
export class CheckinPage {

    requestDone: boolean = false;
    checkin: any;

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public navParams: NavParams,
        public platform: Platform,
        private checkinService: CheckinService,
        private barcodeScanner: BarcodeScanner,
        private platformHelper: PlatformHelper,
        private authStorageHelper: AuthStorageHelper,
    ) {
        let id = this.navParams.get('id');

        // get the checkin
        this.checkinService.get({id})
            .subscribe(
                data => {
                    this.checkin = this.sortStudents(JSON.parse(data._body));
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

    /**
     * Sort the students of the given checkin (not checked ones first)
     *
     * @param Checkin checkin
     * @param Checkin
     */
    private sortStudents(checkin) {
        let checked = [];
        let notChecked = [];
        checkin.students.map(student => student.pivot.checked ? checked.push(student) : notChecked.push(student));
        checkin.students = notChecked.concat(checked);
        return checkin;
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
                             this.checkin = this.sortStudents(JSON.parse(data._body));
                             console.log("STUDENT ADDED",this.checkin);
                         },
                         err => {
                             console.log("ADD err : ", err);
                             // if admin, ask if he want to force the add
                             if (this.authStorageHelper.getUserRoles()['admin']) {
                                 let alert = this.alertCtrl.create({
                                     title: "Pas dans la liste",
                                     message: "Ajouter cet étudiant ?",
                                     buttons: [
                                         {
                                             text: "Non",
                                             role: "cancel",
                                             handler: () => {
                                                 console.log("Cancel clicked");
                                             }
                                         },
                                         {
                                             text: "Ajouter",
                                             handler: () => {
                                                 this.checkinService.putStudent({id: this.checkin.id, email: barcodeData.text, force: true})
                                                     .subscribe(
                                                          data => {
                                                              this.checkin = this.sortStudents(JSON.parse(data._body));
                                                              console.log("STUDENT ADDED",this.checkin);
                                                          },
                                                          err => console.log("Failed to force add")
                                                      );
                                             }
                                         }
                                     ]
                                 });
                                 alert.present();
                             }
                         }
                    );
            }, (err) => {
                console.log('scan err', err);
            });
        }
    }

}
