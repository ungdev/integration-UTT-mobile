import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { EventService } from '../../services/EventService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
    selector: 'page-event',
    templateUrl: 'event.html',
    providers: [EventService, AuthStorageHelper]
})
export class EventPage {

    requestDone: boolean = false;
    event: any;

    constructor(
        public navParams: NavParams,
        private eventService: EventService,
        public viewCtrl: ViewController,
        private ga: GoogleAnalytics,
    ) {
        let id = this.navParams.get('id');

        // get the checkin
        this.eventService.get({id})
            .subscribe(
                data => {
                    this.event = JSON.parse(data._body);
                    this.requestDone = true;
                    console.log("event", data, this.event)
                    this.event.start_at *= 1000
                    this.event.end_at *= 1000
                },
                err => console.log("err : ", err)
            );
    }

    ionViewDidEnter(){
      this.ga.trackView('event')
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
