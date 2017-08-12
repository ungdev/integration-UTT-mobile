import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

}
