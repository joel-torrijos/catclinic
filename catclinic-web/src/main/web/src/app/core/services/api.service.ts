import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";

import { catchError } from "rxjs/operators";

@Injectable()
export class ApiService { 
    constructor(private http: HttpClient) { }

    private formatError(error: any) {
        return throwError(error.error);
    }

    get(path: String, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`http:///localhost:8080${path}`, {params}).pipe(catchError(this.formatError));
    }

    post(path: String, body: Object = {}, httpOptions : { headers : HttpHeaders} ): Observable<any> {
        return this.http.post(`http:///localhost:8080${path}`, JSON.stringify(body), httpOptions).pipe(catchError(this.formatError));
    }

    put(path: String, body: Object = {}, httpOptions : { headers : HttpHeaders}): Observable<any> {
        return this.http.put(`http:///localhost:8080${path}`, JSON.stringify(body), httpOptions).pipe(catchError(this.formatError));
    }

}