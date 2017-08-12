import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseServiceBackend } from "./BaseServiceBackend";

@Injectable()
export class TeamService extends BaseServiceBackend {

    constructor (protected http: Http, protected authTokenStorageHelper: AuthStorageHelper) {
        super(http, authTokenStorageHelper);

        this.endpoint += "team";
    }

    get(data?: object) { return this._get(this.endpoint, data) }

}
