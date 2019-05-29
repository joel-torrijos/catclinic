import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Patients } from "../models";
import { Observable } from "rxjs";


@Injectable()
export class PatientService {
    constructor(private apiService : ApiService) { }

    getAll(): Observable<Patients> {
        return this.apiService.get('/patients');
    }
}