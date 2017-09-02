import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';

import { EventService } from '../../services/EventService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

import { EventPage } from '../event/event';

@Component({
    templateUrl: 'calendar.html',
    providers: [EventService, AuthStorageHelper]
})
export class CalendarPage {

    requestDone: boolean = false;
    calendar: any;
    days: any[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public platform: Platform,
        private eventService: EventService,
        private authStorageHelper:AuthStorageHelper,
        public modalCtrl: ModalController,
    ) {
        // get the checkin
        this.eventService.get({ student: this.authStorageHelper.getUserId() })
            .subscribe(
                data => {
                    const sortedEvents = {};
                    for (let event of JSON.parse(data._body)) {
                        event.start_at *= 1000;
                        event.end_at *= 1000;
                        if (event.start_at in sortedEvents) {
                            sortedEvents[event.start_at].push(event);
                        } else {
                            sortedEvents[event.start_at] = [event];
                        }
                    }
                    this.calendar = sortedEvents;
                    this.days = Object.keys(this.calendar);

                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

    viewEvent(id) {
        let modal = this.modalCtrl.create(EventPage, {id});
        modal.present();
    }

}
