import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { CheckinService } from '../../services/CheckinService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
    templateUrl: 'compareCheckins.html',
    providers: [CheckinService, AuthStorageHelper]
})
export class CompareCheckinsPage {

    first: any;
    inFirstOnly: any;
    second: any;
    inSecondOnly: any;
    requestDone: boolean = false;

    constructor(
        public viewCtrl: ViewController,
        public params: NavParams,
        private checkinService: CheckinService,
        private ga: GoogleAnalytics,
    ) {
        // get the 2 checkins
        Promise.all([
            new Promise((resolve, reject) => {
                // get first the checkin
                this.checkinService.get({id: params.get('first')})
                    .subscribe(
                        data => {
                            this.first = JSON.parse(data._body);
                            resolve();
                        },
                        err => reject(err)
                    );
            }),
            new Promise((resolve, reject) => {
                // get the second checkin
                this.checkinService.get({id: params.get('second')})
                    .subscribe(
                        data => {
                            this.second = JSON.parse(data._body);
                            resolve();
                        },
                        err => reject(err)
                    );
            })
        ])
        .then(_ => {
            this.compare();
            this.requestDone = true;
        })
        .catch(err => console.log('err', err));
    }

    ionViewDidEnter(){
      this.ga.trackView('compareCheckins')
    }

    /**
     * Compare the 2 checkins and store the difference
     */
    compare() {
        // create two hash with the students's id
        const first_hash = {};
        const second_hash = {};

        this.first.users.map(student => {
            first_hash[student.id] = `${student.first_name} ${student.last_name}`;
        });
        this.second.users.map(student => {
            second_hash[student.id] = `${student.first_name} ${student.last_name}`;
        });

        // loop on first_hash. If key is both on first_hash and second_hash, delete the key
        for (let id in first_hash) {
            if (second_hash[id]) {
                delete first_hash[id];
                delete second_hash[id];
            }
        }

        this.inFirstOnly = Object.keys(first_hash).map(key => first_hash[key]);
        this.inSecondOnly = Object.keys(second_hash).map(key => second_hash[key]);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
