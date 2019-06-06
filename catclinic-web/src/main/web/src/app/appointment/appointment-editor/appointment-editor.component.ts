import { Component, OnInit } from '@angular/core';
import { PatientService, Patient, AppointmentService, Appointment, ConditionService, Conditions, Condition } from 'src/app/core';
import { Observable, of, empty } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-appointment-editor',
  templateUrl: './appointment-editor.component.html',
  styleUrls: ['./appointment-editor.component.css']
})
export class AppointmentEditorComponent implements OnInit {
  patient: any;
  searching = false;
  searchFailed = false;
  appointmentForm : FormGroup;
  appointment : Appointment;
  diagnoses = [];

  constructor(private appointmentService : AppointmentService,
              private patientService : PatientService,
              private conditionService : ConditionService,
              private fb : FormBuilder) { }

  ngOnInit() {
    this.patient = '';

    this.appointmentForm = this.fb.group({
      patient: ['', Validators.required],
      notes: ['']
    });
  }

  searchA = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.patientService.search(term).pipe(map(response=> response._embedded.patients),
          tap((response) =>  {
            this.searchFailed = false;
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  formatter = (x: Patient) => {
    if(x.firstName && x.lastName)
      return x.firstName + " " + x.lastName;
    return '';
  };
 
  setModel(e: NgbTypeaheadSelectItemEvent, fubi: any) {
    this.patient = e.item;
  }

  get f() { return this.appointmentForm.controls; }

  goBack() {
    let diagnoses = { _links: {}};
    this.diagnoses.forEach((diagnosis, index) => {
      diagnoses['_links'][index] = diagnosis._links.self.href;
    });

    console.log(JSON.stringify(diagnoses));
  }

  onSubmit() {
    if(this.appointmentForm.invalid) {
      return;
    }

    let formatted = { _links: {}};
        this.diagnoses.forEach((diagnosis, index) => {
            formatted['_links'][index] = diagnosis._links.self.href;
        });

    this.f['patient'].setValue(this.patient._links.self.href);
    this.appointmentService.save(this.appointmentForm.value).pipe(
      mergeMap(link => this.appointmentService.saveDiagnoses(link,formatted)),
      catchError((err, caught) => {
        console.log(err);
        return empty();
      })
    ).subscribe((response) => {
      console.log("LOL");
      this.goBack();
    });
    // this.appointmentService.saveDiagnoses({"href": "http://localhost:8080/appointments/2/diagnoses"},formatted).pipe(
    //   catchError((err, caught) => {
    //     console.log(err);
    //     return empty();
    //     })
    // )
    // .subscribe(data => {
    //   console.log("done");});
  }

  public requestConditions = (name: string): Observable<Condition[]> => {
    let params = new HttpParams().set('name', name);
    return this.conditionService.getAll(params).pipe(map(data => {
      // console.log(data._embedded.conditions);
      return data._embedded.conditions;
    }));
  };


}
