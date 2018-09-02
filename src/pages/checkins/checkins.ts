import { Component } from '@angular/core';
import { NavController, MenuController, ModalController, ToastController } from 'ionic-angular';

import { CheckinService } from '../../services/CheckinService';

import { CheckinPage } from '../checkin/checkin';
import { CreateCheckinPage } from '../createCheckin/createCheckin';
import { CompareCheckinsPage } from '../compareCheckins/compareCheckins';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
    selector: 'page-checkins',
    templateUrl: 'checkins.html',
    providers: [CheckinService]
})
export class CheckinsPage {

    requestDone: boolean = false;
    checkins: any[] = [];
    selectedCheckins: any = [];

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        private checkinService: CheckinService,
        private ga: GoogleAnalytics,
    ) {
        // get all the newcomers
        this.checkinService.get()
            .subscribe(
                data => {
                    this.checkins = JSON.parse(data._body);
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

    ionViewDidEnter(){
      this.ga.trackView('checkins')
    }

    /**
     * Handle click on the checkin
     *
     * @param string id : the checkin's id
     */
    selectCheckin(id) {
        // if the checkin is already in the selected, remove it
        if (this.selectedCheckins.includes(id)) {
            this.selectedCheckins = this.selectedCheckins.filter(x => x != id);
            return;
        }

        // replace the oldest (if exists) by the lastest added
        if (this.selectedCheckins[0]) {
            this.selectedCheckins[1] = this.selectedCheckins[0];
        }

        // add the new selected checkin
        this.selectedCheckins[0] = id;
    }

    compare() {
        let modal = this.modalCtrl.create(CompareCheckinsPage, {first: this.selectedCheckins[0], second: this.selectedCheckins[1]});
        modal.present();
    }

    showCreateModal() {
        let modal = this.modalCtrl.create(CreateCheckinPage);
        modal.onDidDismiss(checkin => {
            if (checkin) {
                this.checkins.push(checkin);
                // show succcess toast
                let toast = this.toastCtrl.create({
                    message: 'Nouveau checkin créé !',
                    duration: 3000
                });
                toast.present();
            }
        });
        modal.present();
    }

    viewCheckin(id) {
        this.navCtrl.push(CheckinPage, {id})
    }

}
