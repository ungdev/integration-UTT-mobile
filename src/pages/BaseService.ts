import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { env } from '../config/env';

import { AuthTokenStorageHelper } from '../helpers/AuthTokenStorageHelper';

export class BaseService {

    protected WebsiteURI = env.WEBSITE_URL;
    protected ApiURI = `${this.WebsiteURI}api/`;

    constructor (protected http: Http, protected authTokenStorageHelper: AuthTokenStorageHelper) {}

    /**
     * Make a request on the website or website's API
     *
     * @param String target: website or api
     * @param Object data: information about the request
     * @return Object | Any
     */
    makeRequest(target: string, data) {
        target = target.toUpperCase();

        // set request headers
        const headers = this.prepareRequestHeaders(target === "API");
        const options = new RequestOptions({ headers });

        // create the full uri
        let uri = target === "API" ? this.ApiURI: this.WebsiteURI;
        uri += data.route;

        // make the request
        if (data.method.toUpperCase() === "GET") {
            return this.getRequest(uri, options);
        } else {
            return this.postRequest(uri, data.params, options);
        }

    }

    /**
     * Prepare the headers for the request. If Authorization is required,
     * set the Authorization header with the token in the localStorage.
     *
     * @param boolean authorization_required
     * @return Headers
     */
    private prepareRequestHeaders(authorization_required: boolean) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if (authorization_required) {
            headers.append('Authorization', `Bearer ${this.authTokenStorageHelper.getToken()}`);
        }

        return headers;
    }

    /**
     * Make a post request, using the Http module
     *
     * @param string uri: the requested uri
     * @param object params: post parameters for the request
     * @param RequestOptions options: contains the headers
     * @return Object | Any
     */
    private postRequest(uri: string, params, options) {
        return this.http.post(uri, params, options)
            .map(this.extractData)
            .catch(this.handleError)
    }

    /**
     * Make a get request, using the Http module
     *
     * @param string uri: the requested uri
     * @param RequestOptions options: contains the headers
     * @return Object | Any
     */
    private getRequest(uri: string, options) {
        return this.http.get(uri, options)
            .map(this.extractData)
            .catch(this.handleError)
    }

    private extractData(res: Response | any) {
        return res;
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }

}
