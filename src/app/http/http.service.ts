import { Injectable }     from '@angular/core';
import {Http} from '@angular/http';
import { Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'


/**
 * HTTP service for all the usualls calls to the Angualr2 HTTP Deamon.
 */
@Injectable()
export class HTTPService {

    /**
     * constructor
     */
    constructor(private _http: Http) {
    }

    /**
     * Does a post request with the specified payload, url and headers.
     */
    public doPost(body: Object, url: string): Observable<Object[]>{
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        let bodyString = JSON.stringify(body);
        let options = new RequestOptions({ headers: headers });

        return this._http.post(url, bodyString, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    /**
     * Does a patch request with the specified payload, url and headers.
     */
    public doPatch(body: Object, url: string): Observable<Response>
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        let bodyString = JSON.stringify(body);
        let options = new RequestOptions({ headers: headers });

        return this._http.patch(url, bodyString, options)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    /**
     * Does a get request with the specified url and headers.
     */
    public doGet(url: string): Observable<Object[]>{
 
        let headers = new Headers();
        headers.append('Accept', 'application/json');

        let options = new RequestOptions({ headers: headers });

        return this._http.get(url, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    /**
     * Does a get request with the specified url and headers.
     */
    public doDelete(url: string): Observable<Response>
    {
        let headers = new Headers();

        let options = new RequestOptions({ headers: headers });

        return this._http.delete(url, options)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    /**
     * Does a get request with the specified payload, url and headers.
     */
    public doPut(body:Object,url: string): Observable<Response>
    {
        let headers = new Headers();

        let options = new RequestOptions({ headers: headers });

        return this._http.put(url,body, options)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}