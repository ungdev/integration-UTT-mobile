import { Component } from '@angular/core';
import { NavController, MenuController, ModalController } from 'ionic-angular';

import { CheckinService } from '../../services/CheckinService';

import { CheckinPage } from '../checkin/checkin';
import { CreateCheckinPage } from '../createCheckin/createCheckin';

@Component({
    templateUrl: 'checkins.html',
    providers: [CheckinService]
})
export class CheckinsPage {

    requestDone: boolean = false;
    checkins: any[] = [];

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        public modalCtrl: ModalController,
        private checkinService: CheckinService,
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

    showCreateModal() {
        let modal = this.modalCtrl.create(CreateCheckinPage);
        modal.onDidDismiss(checkin => {
            if (checkin) {
                this.checkins.push(checkin);
            }
        });
        modal.present();
    }

    viewCheckin(id) {
        this.navCtrl.push(CheckinPage, {id})
    }

}
