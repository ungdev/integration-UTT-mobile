import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseService } from "./BaseService";

@Injectable()
export class CheckinService extends BaseService {

    constructor (protected http: Http, protected authTokenStorageHelper: AuthStorageHelper) {
        super(http, authTokenStorageHelper);

        this.endpoint += "checkin";
    }

    get(data?: object) { return this._get(this.endpoint, data) }

    post(data: object) { return this._post(this.endpoint, data) }

    putStudent(data: any) {
        const endpoint = `${this.endpoint}/${data.id}/student`;
        let payload = {uid: data.uid};
        if (data.force) {
            payload['force'] = true;
        }
        return this._put(endpoint, payload);
    }

}
