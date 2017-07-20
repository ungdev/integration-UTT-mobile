import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { env } from '../config/env';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';

export class BaseService {

    protected ApiURI = `${env.WEBSITE_URL}api/`;

    constructor (
        protected http: Http,
        protected authStorageHelper: AuthStorageHelper,
    ) {}

    /**
     * Make a request on the website's API
     *
     * @param Object data: information about the request
     * @return Object | Any
     */
    makeRequest(data) {
        // set request headers
        const headers = this.prepareRequestHeaders();
        const options = new RequestOptions({ headers });
        const method = data.method.toUpperCase();

        // create the full uri
        let uri = this.ApiURI + data.route;

        // make the request
        if (method === "GET") {
            return this.getRequest(uri, options);
        } else if (method === "POST") {
            return this.postRequest(uri, data.params, options);
        }
    }

    /**
     * Make a get request
     *
     * @param model string : model name
     * @param id string|null : ressource id
     */
    protected _get(model, data) {

        let route = data.id ? `${model}/${data.id}` : model

        if (data.filter) {
            route += "?filter=" + data.filter;
        }

        return this.makeRequest({
            method: "get",
            route
        });
    }

    /**
     * Prepare the headers for the request. If Authorization is required,
     * set the Authorization header with the token in the localStorage.
     *
     * @return Headers
     */
    protected prepareRequestHeaders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key');

        const accessToken = this.authStorageHelper.getAccessToken();
        if (accessToken) {
            headers.append('Authorization', `Bearer ${accessToken}`);
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
    protected postRequest(uri: string, params, options) {
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
