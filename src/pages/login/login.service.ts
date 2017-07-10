import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {

    private authUri = 'http://integration-utt/';

    constructor (private http: Http) {}

    newcomerLogin(login, password) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers });
        let data = {
            grant_type: 'password',
            client_id: '6',
            client_secret: 'oV34BcsM5tyjGwxrUUKk1dVRCNQDVkVLl0NsfCc5',
            username: login,
            password,
            scope: ''
        }

        return this.http.post(this.authUri + 'oauth/token', data, options)
            .map(this.extractData)
            .catch(this.handleError)
    }

    private extractData(res: Response) {
        return res;
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }

}
