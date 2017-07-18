import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseService } from "./BaseService";

import { env } from '../config/env';

@Injectable()
export class StudentService extends BaseService {

    private model = "student";

    constructor (protected http: Http, protected authTokenStorageHelper: AuthStorageHelper) {
        super(http, authTokenStorageHelper);
    }

    get(id? :string) { return this._get(this.model, id) }

}
