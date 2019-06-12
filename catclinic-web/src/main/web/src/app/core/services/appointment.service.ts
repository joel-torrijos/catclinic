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
        return this.apiService.get('/appointments/' + id);
    }
    
    save(appointment) {
        // let formatted = { _links: {}};
        // diagnoses.forEach((diagnosis, index) => {
        //     formatted['_links'][index] = diagnosis._links.self.href;
        // });
        
        console.log("saving");
        // console.log(appointment);
        // console.log(diagnoses);
        // return this.apiService.post('/appointments', appointment, httpOptions).pipe(map(data => data));
        // return this.apiService.post('/appointments', appointment, httpOptions)
        //             .pipe(switchMap(response => {
        //                 return this.saveDiagnoses(response._links.diagnoses, diagnoses);
        //             }));
        return this.apiService.post('/appointments', appointment, httpOptions).pipe(map(data => data._links.diagnoses));
    }

    saveDiagnoses(link : Link, diagnoses: any) {
        // let formatted = { _links: {}};
        // diagnoses.forEach((diagnosis, index) => {
        //     formatted['_links'][index] = diagnosis._links.self.href;
        // });
    
        console.log("saving diagnoses to " + link.href);
        console.log(JSON.stringify(diagnoses));
        return this.apiService.postWithLink(link, diagnoses, httpOptions);
    }
}