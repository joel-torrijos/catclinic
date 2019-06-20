import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService, Patient, AppointmentService } from 'src/app/core';
import { switchMap} from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  response$ : Patient;
  appointmentPage = '0';

  constructor(private patientService : PatientService,
              private appointmentService : AppointmentService,
              private route : ActivatedRoute,
              private router : Router,
              private location : Location) { }

  patientResponse$ = this.route.params.pipe(switchMap((params) => 
  {
    return this.patientService.get(params['id']);}
    ));

  refreshToken$ = new BehaviorSubject(undefined);
  appointmentResponse$ = 
    combineLatest(this.patientResponse$, this.refreshToken$)
      .pipe(switchMap(([patient]) => {
        console.log(patient);
        let params = new HttpParams()
          .set('patient.id', patient.id.toString())
          .set('sort', 'createdDate,desc')
          .set('page', this.appointmentPage);
        return this.appointmentService.getAll(params);
      }));
  

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  getPageFromService(page) {
    this.appointmentPage = (page - 1).toString();
    this.refreshToken$.next(undefined);
  }

}
