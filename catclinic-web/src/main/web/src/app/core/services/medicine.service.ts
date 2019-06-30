import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Medicines, Medicine } from "../models";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MedicineService {
    constructor(private apiService : ApiService) { }

    getAll(params: HttpParams): Observable<Medicines> {
        return this.apiService.get('/medicines', params);
    }

    get(id: string): Observable<Medicine> {
        return this.apiService.get('/medicines/' + id);
    }

    save(medicine) : Observable<Medicine> {

        if(medicine.id) {
            return this.apiService.put('/medicines/' + medicine.id, medicine, httpOptions).pipe(map(data => data));
        }

        return this.apiService.post('/medicines', medicine, httpOptions).pipe(map(data => data));
    }

    search(name: string): Observable<Medicines> {
        if (!name.trim()) {
            return of({ _embedded: {medicines: []}} as Medicines);
        }

        let params = new HttpParams()
                            .set('name', name);
        return this.getAll(params);
    }
}