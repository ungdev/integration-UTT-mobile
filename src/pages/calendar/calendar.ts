import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';

import { EventService } from '../../services/EventService';
import axios, { AxiosStatic, AxiosInstance } from 'axios';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';
import moment from 'moment'
import { EventPage } from '../event/event';
import { ENV } from '../../config/env.dev';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

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
        private ga: GoogleAnalytics,
    ) {
        // Setup webservice API
        const accessToken = this.authStorageHelper.getAccessToken();
        const api = axios.create({ baseURL: ENV.BACKEND_API_URL });
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        api
          .get('event', { params: { student: this.authStorageHelper.getUserId() }})
          .then((res) => {
            console.log(res)
            const sortedEvents = {};
            for (let event of res.data) {
                event.start_at *= 1000;
                event.startDay = moment(event.start_at).format('dddd DD')
                .replace('Monday', 'Lundi')
                .replace('Tuesday', 'Mardi')
                .replace('Wednesday', 'Mercredi')
                .replace('Thursday', 'Jeudi')
                .replace('Friday', 'Vendredi')
                .replace('Saturday', 'Samedi')
                .replace('Sunday', 'Dimanche')
                event.end_at *= 1000;
                event.endDay = moment(event.end_at).format('dddd DD')
                .replace('Monday', 'Lundi')
                .replace('Tuesday', 'Mardi')
                .replace('Wednesday', 'Mercredi')
                .replace('Thursday', 'Jeudi')
                .replace('Friday', 'Vendredi')
                .replace('Saturday', 'Samedi')
                .replace('Sunday', 'Dimanche')
                if (event.startDay in sortedEvents) {
                    sortedEvents[event.startDay].push(event);
                } else {
                    sortedEvents[event.startDay] = [event];
                }
            }
            this.calendar = sortedEvents;
            this.days = Object.keys(this.calendar);
            console.log('calendar', this.calendar, this.days)

            this.requestDone = true;
          })
          .catch(err => console.error(err));

        // get the checkin
        /*this.eventService.get({ student: this.authStorageHelper.getUserId() })
            .subscribe(
                data => {
                   console.log('response :', JSON.parse(data._body))
                    const sortedEvents = {};
                    for (let event of JSON.parse(data._body)) {
                        event.start_at *= 1000;
                        event.startDay = moment(event.start_at).format('dddd DD')
                        .replace('Monday', 'Lundi')
                        .replace('Tuesday', 'Mardi')
                        .replace('Wednesday', 'Mercredi')
                        .replace('Thursday', 'Jeudi')
                        .replace('Friday', 'Vendredi')
                        .replace('Saturday', 'Samedi')
                        .replace('Sunday', 'Dimanche')
                        event.end_at *= 1000;
                        event.endDay = moment(event.end_at).format('dddd DD')
                        .replace('Monday', 'Lundi')
                        .replace('Tuesday', 'Mardi')
                        .replace('Wednesday', 'Mercredi')
                        .replace('Thursday', 'Jeudi')
                        .replace('Friday', 'Vendredi')
                        .replace('Saturday', 'Samedi')
                        .replace('Sunday', 'Dimanche')
                        if (event.startDay in sortedEvents) {
                            sortedEvents[event.startDay].push(event);
                        } else {
                            sortedEvents[event.startDay] = [event];
                        }
                    }
                    this.calendar = sortedEvents;
                    this.days = Object.keys(this.calendar);
                    console.log('calendar', this.calendar, this.days)

                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );*/
    }

    ionViewDidEnter(){
      this.ga.trackView('calendar')
    }

    viewEvent(id) {
        let modal = this.modalCtrl.create(EventPage, {id});
        modal.present();
    }

}
