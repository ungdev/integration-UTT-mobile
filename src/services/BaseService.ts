import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { AuthStorageHelper } from '../helpers/AuthStorageHelper';

export class BaseService {

    constructor (
        protected http: Http,
        protected authStorageHelper: AuthStorageHelper,
    ) {}

    /**
     * Make a HTTP request
     *
     * @param string method: http method
     * @param string uri: http uri
     * @param Headers headers: http request's headers
     * @param object data: request's data
     *
     * @return Object | Any
     */
    _makeRequest(method, uri, headers, data) {

        const options = new RequestOptions({ headers });
        switch(method.toUpperCase()) {
            case "GET":
                if (data && data.id) {
                    uri += '/' + data.id;
                }
                if (data && data.filters) {
                    uri += "?";
                    for (let filter in data.filters) {
                        uri += `${filter}=${data.filters[filter]}&`;
                    }
                    delete data.filters;
                }

                return this.getRequest(uri, options)
            case "POST":
                return this.postRequest(uri, data, options);
            case "PUT":
                if (data && data.id) {
                    uri += '/' + data.id;
                }

                return this.putRequest(uri, data, options);
            default:
                console.log("can't find your request's method");
        }

        return null;
    }

    /**
     * Return a Headers object with basics http headers needed
     *
     * @return Headers
     */
    protected _initRequestHeaders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key');

        return headers;
    }

    /**
     * Make a put request, using the Http module
     *
     * @param string uri: the requested uri
     * @param object params: post parameters for the request
     * @param RequestOptions options: contains the headers
     * @return Object | Any
     */
    protected putRequest(uri: string, params, options) {
        return this.http.put(uri, params, options)
            .map(this.extractData)
            .catch(this.handleError)
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
