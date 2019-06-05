import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { ApiService } from "./api.service";
import { Appointment } from "..";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AppointmentService { 
    constructor(private apiService: ApiService) { }

    save(appointment) : Observable<Appointment> {

        return this.apiService.post('/appointments', appointment, httpOptions).pipe(map(data => data));
    }
}