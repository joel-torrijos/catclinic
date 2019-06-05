import { Component, OnInit } from '@angular/core';
import { PatientService, Patient, AppointmentService, Appointment } from 'src/app/core';
import { of, Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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

  constructor(private appointmentService : AppointmentService,
              private patientService : PatientService,
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

  }

  onSubmit() {
    console.log("lol");
    if(this.appointmentForm.invalid) {
      return;
    }

    this.f['patient'].setValue(this.patient._links.self.href);
    this.appointmentService.save(this.appointmentForm.value).subscribe((response) => this.goBack());
  }


}
