import { Injectable } from '@angular/core';

import { AuthTokenStorageHelper } from '../helpers/AuthTokenStorageHelper';
import { BaseService } from "./BaseService";

import { env } from '../config/env';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class AuthService extends BaseService {

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

        return this.makeRequest({
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

        return this.makeRequest({
            method: "post",
            route: "oauth/token",
            params
        });
    }

    revokeAccessToken(accessToken) {
        return this.makeRequest({
            method: "post",
            route: "oauth/token/revoke",
            params: {
                access_token: accessToken
            }
        });
/*
        return this.makeRequest({
            method: "delete",
            route: "oauth/tokens/" + accessToken
        });*/

    }

    getTokens() {
        return this.makeRequest({
            method: "get",
            route: "oauth/tokens"
        });
    }

}
