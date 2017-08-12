import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseService } from "./BaseService";

import { ENV } from '../config/env.dev';

@Injectable()
export class BaseServiceBackend extends BaseService {

    protected endpoint = ENV.BACKEND_API_URL;

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
     * @param boolean auth: add the Authorization header only if auth is true
     * @return Headers
     */
    protected _prepareRequestHeaders(auth) {
        const headers = this._initRequestHeaders();

        if (auth === true) {
            const accessToken = this.authStorageHelper.getAccessToken();
            if (accessToken) {
                headers.append('Authorization', `Bearer ${accessToken}`);
            }
        }

        return headers;
    }

    protected _get(uri, data, auth = true) {
        return this._makeRequest("get", uri, this._prepareRequestHeaders(auth), data);
    }

    protected _post(uri, data, auth = true) {
        return this._makeRequest("post", uri, this._prepareRequestHeaders(auth), data);
    }

}
