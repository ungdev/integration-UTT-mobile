import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import axios from 'axios'
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';
import { ENV } from '../../config/env.dev';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [AuthStorageHelper]
})
export class HomePage {

    username: string;
    roles: Object;
    navMenu: Object;
    scores: any;

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        private authStorageHelper: AuthStorageHelper,
        private ga: GoogleAnalytics,
    ) {
        this.username = this.authStorageHelper.getUserName();

        this.menu.enable(true);
        this.scores = []
        this.getScore()
    }

    ionViewDidEnter(){
      this.ga.trackView('home')
    }


    getScore() {
      const accessToken = this.authStorageHelper.getAccessToken();
      const api = axios.create({ baseURL: ENV.BACKEND_API_URL });
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      api
          .get('points')
          .then((res) => {
            console.log('result : ', res)
            this.scores = res.data
          })
          .catch(err => console.error(err));
    }

}
