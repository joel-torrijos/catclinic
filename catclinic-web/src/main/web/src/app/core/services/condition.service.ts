import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Conditions, Condition } from "../models";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConditionService {
    constructor(private apiService : ApiService) { }

    getAll(params: HttpParams): Observable<Conditions> {
        return this.apiService.get('/conditions', params);
    }

    get(id: string): Observable<Condition> {
        return this.apiService.get('/conditions/' + id);
    }

    save(condition) : Observable<Condition> {

        if(condition.id) {
            const id = +condition.id;
            console.log('edit');
            return this.apiService.put('/conditions/' + id, condition, httpOptions).pipe(map(data => data));
        }

        return this.apiService.post('/conditions', condition, httpOptions).pipe(map(data => data));
    }

    search(name: string): Observable<Conditions> {
        if (!name.trim()) {
            return of({ _embedded: {conditions: []}} as Conditions);
        }

        let params = new HttpParams()
                            .set('name', name);
        return this.getAll(params);
    }
}