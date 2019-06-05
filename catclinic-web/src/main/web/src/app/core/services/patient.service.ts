import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Patients, Patient } from "../models";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PatientService {
    constructor(private apiService : ApiService) { }

    getAll(params: HttpParams): Observable<Patients> {
        return this.apiService.get('/patients', params);
    }

    get(id: string): Observable<Patient> {
        return this.apiService.get('/patients/' + id);
    }

    save(patient) : Observable<Patient> {

        if(patient.id) {
            const id = +patient.id;
            console.log('edit');
            return this.apiService.put('/patients/' + id, patient, httpOptions).pipe(map(data => data));
        }

        return this.apiService.post('/patients', patient, httpOptions).pipe(map(data => data));
    }

    search(name: string): Observable<Patients> {
        if (!name.trim()) {
            return of({ _embedded: {patients: []}} as Patients);
        }
        
        let params = new HttpParams()
                            .set('firstName', name)
                            .set('lastName', name);
        return this.getAll(params);
    }
}