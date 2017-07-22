import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseService } from "./BaseService";

@Injectable()
export class TeamService extends BaseService {

    private model = "team";

    constructor (protected http: Http, protected authTokenStorageHelper: AuthStorageHelper) {
        super(http, authTokenStorageHelper);
    }

    get(data?: object) { return this._get(this.model, data) }

}
