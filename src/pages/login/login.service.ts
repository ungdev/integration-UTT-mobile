import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { AuthTokenStorageHelper } from '../../helpers/AuthTokenStorageHelper';
import { BaseService } from "../BaseService";

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
            client_id: '6',
            client_secret: 'oV34BcsM5tyjGwxrUUKk1dVRCNQDVkVLl0NsfCc5',
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

}
