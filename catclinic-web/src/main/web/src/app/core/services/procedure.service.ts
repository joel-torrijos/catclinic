import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Procedures, Procedure } from "../models";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProcedureService {
    constructor(private apiService : ApiService) { }

    getAll(params: HttpParams): Observable<Procedures> {
        return this.apiService.get('/procedures', params);
    }

    get(id: string): Observable<Procedure> {
        return this.apiService.get('/procedures/' + id);
    }

    save(procedure) : Observable<Procedure> {

        if(procedure.id) {
            const id = +procedure.id;
            console.log('edit');
            return this.apiService.put('/procedures/' + id, procedure, httpOptions).pipe(map(data => data));
        }

        return this.apiService.post('/procedures', procedure, httpOptions).pipe(map(data => data));
    }

    search(name: string): Observable<Procedures> {
        if (!name.trim()) {
            return of({ _embedded: {procedures: []}} as Procedures);
        }

        let params = new HttpParams()
                            .set('name', name);
        return this.getAll(params);
    }
}