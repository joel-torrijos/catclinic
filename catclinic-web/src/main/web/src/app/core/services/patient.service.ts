import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Patients, Patient } from "../models";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpHeaders } from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PatientService {
    constructor(private apiService : ApiService) { }

    getAll(): Observable<Patients> {
        return this.apiService.get('/patients?sort=id');
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
}