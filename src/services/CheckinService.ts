import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseServiceBackend } from "./BaseServiceBackend";

@Injectable()
export class CheckinService extends BaseServiceBackend {

    constructor (protected http: Http, protected authTokenStorageHelper: AuthStorageHelper) {
        super(http, authTokenStorageHelper);

        this.endpoint += "checkin";
    }

    get(data?: object) { return this._get(this.endpoint, data) }

    post(data: object) { return this._post(this.endpoint, data) }

    putStudent(data: any) {
        const endpoint = `${this.endpoint}/${data.id}/student`;
        return this._put(endpoint, {email: data.email});
    }

}
