import { Injectable } from "@angular/core";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { ApiService } from "./api.service";
import { Appointment } from "..";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Appointments } from "../models";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AppointmentService { 
    constructor(private apiService: ApiService) { }

    getAll(params: HttpParams): Observable<Appointments> {
        return this.apiService.get('/appointments', params);
    }
    
    save(appointment) : Observable<Appointment> {

        return this.apiService.post('/appointments', appointment, httpOptions).pipe(map(data => data));
    }
}