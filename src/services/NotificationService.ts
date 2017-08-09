import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Push } from '@ionic/cloud-angular';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseService } from "./BaseService";

import { ENV } from '../config/env.dev';

@Injectable()
export class NotificationService extends BaseService {

    private ionicAPI = "https://api.ionic.io/";

    constructor (
        protected http: Http,
        public push: Push,
        protected authTokenStorageHelper: AuthStorageHelper
    ) {
        super(http, authTokenStorageHelper);
    }

    post(notification: object, target: string) {
        const data = {
            tokens: [this.push.token],
            profile: ENV.PROFILE_TAG,
            notification,
            send_to_all: false
        };

        if (target === "send_to_all") {
            data.send_to_all = true;
        }

        console.log(data);
        //return this._post(this.model, data);
        return this.makeRequest({uri: this.ionicAPI, params:data, method:'post'});
    }

}
