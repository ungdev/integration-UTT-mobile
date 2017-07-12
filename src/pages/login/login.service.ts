import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { AuthTokenStorageHelper } from '../../helpers/AuthTokenStorageHelper';
import { BaseService } from "../BaseService";

import { env } from '../../config/env';

@Injectable()
export class LoginService extends BaseService {

    constructor (protected http: Http, protected authTokenStorageHelper: AuthTokenStorageHelper) {
        super(http, authTokenStorageHelper);
    }

    /**
     * Make a login request
     *
     * @param string login
     * @param string password
     * @return object
     */
    newcomerLogin(login: string, password: string) {
        const params = {
            grant_type: 'password',
            client_id: env.CLI_ID,
            client_secret: env.CLI_SECRET,
            username: login,
            password,
            scope: ''
        }

        return this.makeRequest('website', {
            method: "post",
            route: "oauth/token",
            params
        });
    }

    /**
     * Make a request to refresh the access token, using the refresh token
     *
     * @param string refreshToken
     * @return object
     */
    refreshAccessToken(refreshToken) {
        const params = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: env.CLI_ID,
            client_secret: env.CLI_SECRET,
            scope: ''
        }

        return this.makeRequest('website', {
            method: "post",
            route: "oauth/token",
            params
        });
    }

}
