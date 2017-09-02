import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseService } from "./BaseService";

@Injectable()
export class EventService extends BaseService {

    constructor (protected http: Http, protected authTokenStorageHelper: AuthStorageHelper) {
        super(http, authTokenStorageHelper);

        this.endpoint += "event";
    }

    get(data?: object) { return this._get(this.endpoint, data) }

}
