import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Genders } from "../models";
import { Observable } from "rxjs";
import { HttpHeaders, HttpParams } from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GenderService {
    constructor(private apiService : ApiService) { }

    getAll(params: HttpParams): Observable<Genders> {
        return this.apiService.get('/genders', params);
    }
}