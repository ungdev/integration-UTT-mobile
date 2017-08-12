import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Push } from '@ionic/cloud-angular';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseServiceIonic } from "./BaseServiceIonic";

import { ENV } from '../config/env.dev';

@Injectable()
export class NotificationService extends BaseServiceIonic {

    constructor (
        protected http: Http,
        public push: Push,
        protected authTokenStorageHelper: AuthStorageHelper
    ) {
        super(http, authTokenStorageHelper);

        this.endpoint += "push/notifications";
    }

    post(notification: object, target: string) {
        const data = {
            tokens: [this.push.token.token],
            profile: ENV.PROFILE_TAG,
            notification,
            send_to_all: false
        };

        if (target === "send_to_all") {
            data.send_to_all = true;
        }

        console.log(data);
        //return this._post(this.model, data);
        //return this.makeRequest({uri: this.endpoint, params:data, method:'post'});

        // set request headers
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key');

        const accessToken = this.authStorageHelper.getAccessToken();
        if (accessToken) {
            headers.append('Authorization', `Bearer ${ENV.IONIC_API_TOKEN}`);
        }
        const options = new RequestOptions({ headers });

        return this.postRequest(this.endpoint, data, options);

    }

}
