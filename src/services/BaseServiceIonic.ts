import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseService } from "./BaseService";

import { ENV } from '../config/env.dev';

@Injectable()
export class BaseServiceIonic extends BaseService {

    protected endpoint = "https://api.ionic.io/";

    constructor (
        protected http: Http,
        protected authTokenStorageHelper: AuthStorageHelper
    ) {
        super(http, authTokenStorageHelper);
    }

    /**
     * Get the basic HTTP headers and add the Authorization
     * header. 
     *
     * @return Headers
     */
    protected _prepareRequestHeaders() {
        const headers = this._initRequestHeaders();

        const accessToken = this.authStorageHelper.getAccessToken();
        if (accessToken) {
            headers.append('Authorization', `Bearer ${ENV.IONIC_API_TOKEN}`);
        }

        return headers;
    }

    protected _get(uri, data) {
        return this._makeRequest("get", uri, this._prepareRequestHeaders(), data);
    }

    protected _post(uri, data) {
        return this._makeRequest("post", uri, this._prepareRequestHeaders(), data);
    }

}
