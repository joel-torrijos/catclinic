import { Injectable, SystemJsNgModuleLoader } from "@angular/core";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { ApiService } from "./api.service";
import { Appointment } from "..";
import { Observable, empty } from "rxjs";
import { map, switchMap, mergeMap, tap, catchError } from "rxjs/operators";
import { Appointments, Link, Condition } from "../models";
import { ConditionService } from "./condition.service";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AppointmentService { 
    constructor(private apiService: ApiService) { }

    getAll(params: HttpParams): Observable<Appointments> {
        return this.apiService.get('/appointments', params);
    }

    get(id: string): Observable<Appointment> {
        const params = new HttpParams().set('projection', 'appointmentProjection');
        return this.apiService.get('/appointments/' + id, params);
    }
    
    save(appointment) {
        // console.log("saving");
        return this.apiService.post('/appointments', appointment, httpOptions).pipe(map(data => data._links.diagnoses));
    }

    saveDiagnoses(link : Link, diagnoses: any) {
        // console.log("saving diagnoses to " + link.href);
        // console.log(JSON.stringify(diagnoses));
        return this.apiService.post(link, diagnoses, httpOptions);
    }

    cancel(link : Link) {
        return this.apiService.post(link, {}, httpOptions);
    }

    diagnose(link: Link, diagnosis: any) {
        return this.apiService.post(link, diagnosis, httpOptions);
    }

    pay(link: Link, amountPaid: {number}) {
        return this.apiService.post(link, amountPaid, httpOptions);
    }
}