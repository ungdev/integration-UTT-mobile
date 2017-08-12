import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseServiceBackend } from "./BaseServiceBackend";

import { ENV } from '../config/env.dev';

@Injectable()
export class AuthService extends BaseServiceBackend {

    constructor (protected http: Http, protected authTokenStorageHelper: AuthStorageHelper) {
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
        const data = {
            grant_type: 'password',
            client_id: ENV.CLI_ID,
            client_secret: ENV.CLI_SECRET,
            username: login,
            password,
            scope: ''
        }

        return this._post(this.endpoint + "oauth/token", data, false);
    }

    /**
     * Make a request to get the EtuUtt login page url
     *
     * @return object
     */
    getEtuUTTLoginUrl() {
        return this._get(this.endpoint + "oauth/etuutt/link", {}, false);
    }

    /**
     * Make a request to send the received authorization code to
     * the API in order to authenticate the user
     *
     * @param string authorization_code
     * @return object
     */
    sendAuthorizationCode(authorization_code) {
        return this._post(this.endpoint + "oauth/etuutt/callback",
            {
                authorization_code
            }, false);
    }

    /**
     * Make a request to refresh the access token, using the refresh token
     *
     * @param string refreshToken
     * @return object
     */
    refreshAccessToken(refreshToken) {
        const data = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: ENV.CLI_ID,
            client_secret: ENV.CLI_SECRET,
            scope: ''
        }

        return this._post(this.endpoint + "oauth/token", data, false);
    }

    /**
     * Make a request to check if the access token is
     * not revoked
     */
    checkAccessToken(accessToken) {
        return this._post(this.endpoint + "oauth/token/check", {});
    }

    /**
     * Make a request to revoke the given access token
    -*
     * @param accessToken: the token to revoke
     * @return object
     */
    revokeAccessToken(accessToken) {
        return this._post(this.endpoint + "oauth/token/revoke", {
                access_token: accessToken
            });
    }

}
