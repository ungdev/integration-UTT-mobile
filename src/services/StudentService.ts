import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseService } from "./BaseService";

@Injectable()
export class StudentService extends BaseService {

    constructor (protected http: Http, protected authTokenStorageHelper: AuthStorageHelper) {
        super(http, authTokenStorageHelper);

        this.endpoint += "student";
    }

    get(data?: object) { return this._get(this.endpoint, data) }

    put(data: object) { return this._put(this.endpoint, data) }

}
