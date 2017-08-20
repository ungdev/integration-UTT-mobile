import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseService } from "./BaseService";

@Injectable()
export class NotificationService extends BaseService {

    constructor (protected http: Http, protected authTokenStorageHelper: AuthStorageHelper) {
        super(http, authTokenStorageHelper);

        this.endpoint += "notification";
    }

    post(data: object) { return this._post(this.endpoint, data) }

}
