import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, ToastController, ModalController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { CheckinService } from '../../services/CheckinService';
import { PlatformHelper } from '../../helpers/PlatformHelper';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

import { ProfilePage } from '../profile/profile';
import { SearchStudentPage } from '../searchStudent/searchStudent';

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
        public toastCtrl: ToastController,
        public modalCtrl: ModalController,
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
     * Go through the students of this checkin
     * Check if the studen with the given id is checked
     *
     * @param integer id
     * @return boolean
     */
    alreadyChecked(qrcode) {
        for (let student of this.checkin.students) {
            if (student.qrcode == qrcode && student.pivot.checked) {
                return true;
            }
        }
        return false;
    }

    /**
     * Open the modal to search a student by his name
     * If a Student has been chosen, call this.checkStudent with his id
     */
    searchStudent() {
        let modal = this.modalCtrl.create(SearchStudentPage);

        modal.onDidDismiss(student => {
            // if a student has been selected
            if (student.id) {
                this.checkStudent(student.id);
            }
        });
        modal.present();
    }

    /**
     * If the student is not already checked, send a request to check him
     *
     * @param integer id
     */
    checkStudent(qrcode) {
        // if student already checked, display message
        if (this.alreadyChecked(qrcode)) {
            let toast = this.toastCtrl.create({
                message: "Déjà validé !",
                duration: 3000,
                position: 'bottom'
            });

            toast.present();
        } else {
            // add the scanned user to this checkin and update this checkin
            this.checkinService.putStudent({id: this.checkin.id, qrcode})
                .subscribe(
                     data => {
                         this.checkin = this.sortStudents(JSON.parse(data._body));
                         console.log("STUDENT ADDED",this.checkin);
                     },
                     err => {
                         console.log("ADD err : ", err);
                         // if admin, ask if he want to force the add
                         if (err.status === 403 && this.authStorageHelper.getUserRoles()['admin']) {
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
                                             this.checkinService.putStudent({id: this.checkin.id, qrcode, force: true})
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
        }
    }

    /**
     * Run the barcode plugin
     */
    startScanner() {
        if (this.platformHelper.isMobile(this.platform)) {
            this.barcodeScanner.scan().then((barcodeData) => {
                this.checkStudent(barcodeData.text);
            }, (err) => {
                console.log('scan err', err);
            });
        }
    }

}
