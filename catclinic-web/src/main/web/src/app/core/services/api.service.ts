import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";

import { catchError } from "rxjs/operators";
import { Link } from "../models";

@Injectable()
export class ApiService { 
    constructor(private http: HttpClient) { }

    private formatError(error: any) {
        console.log(error);
        return throwError(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        console.log(`${environment.api_url}`);
        return this.http.get(`${environment.api_url}${path}`, {params}).pipe(catchError(this.formatError));
    }

    post(path: string | Link, body: Object = {}, httpOptions : { headers : HttpHeaders} ): Observable<any> {
        if(typeof path === 'string') 
            return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), httpOptions).pipe(catchError(this.formatError));

        return this.http.post(path.href, JSON.stringify(body), httpOptions).pipe(catchError(this.formatError));
    }

    put(path: string, body: Object = {}, httpOptions : { headers : HttpHeaders}): Observable<any> {
        return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body), httpOptions).pipe(catchError(this.formatError));
    }

}