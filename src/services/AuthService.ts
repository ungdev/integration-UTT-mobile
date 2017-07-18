import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';
import { BaseService } from "./BaseService";

import { env } from '../config/env';

@Injectable()
export class AuthService extends BaseService {

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
        const params = {
            grant_type: 'password',
            client_id: env.CLI_ID,
            client_secret: env.CLI_SECRET,
            username: login,
            password,
            scope: ''
        }

        return this.makeRequest({
            method: "post",
            route: "oauth/token",
            params
        });
    }

    /**
     * Make a request to get the EtuUtt login page url
     *
     * @return object
     */
    getEtuUTTLoginUrl() {
        return this.makeRequest({
            method: "get",
            route: "oauth/etuutt/link"
        });
    }

    /**
     * Make a request to send the received authorization code to
     * the API in order to authenticate the user
     *
     * @param string authorization_code
     * @return object
     */
    sendAuthorizationCode(authorization_code) {
        return this.makeRequest({
            method: "post",
            route: "oauth/etuutt/callback",
            params: {
                authorization_code
            }
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

        return this.makeRequest({
            method: "post",
            route: "oauth/token",
            params
        });
    }

    /**
     * Make a request to check if the access token is
     * not revoked
     */
    checkAccessToken(accessToken) {
        return this.makeRequest({
            method: "post",
            route: "oauth/token/check"
        });
    }

    /**
     * Make a request to revoke the given access token
    -*
     * @param accessToken: the token to revoke
     * @return object
     */
    revokeAccessToken(accessToken) {
        return this.makeRequest({
            method: "post",
            route: "oauth/token/revoke",
            params: {
                access_token: accessToken
            }
        });
    }

}
