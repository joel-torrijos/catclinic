import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
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
}