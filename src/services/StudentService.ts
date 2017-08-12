import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseServiceBackend } from "./BaseServiceBackend";

@Injectable()
export class StudentService extends BaseServiceBackend {

    constructor (protected http: Http, protected authTokenStorageHelper: AuthStorageHelper) {
        super(http, authTokenStorageHelper);

        this.endpoint += "student";
    }

    get(data?: object) { return this._get(this.endpoint, data) }

}
