import { Component, OnInit } from '@angular/core';
import { PatientService, Patient, AppointmentService, Appointment, ConditionService, Condition, ProcedureService, Procedure, MedicineService, Medicine } from 'src/app/core';
import { Observable, of, empty } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap, switchMap, catchError, mergeMap, take } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { stringify } from 'querystring';


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
  procedures = [];
  editMode = false;
  medicines;

  constructor(private appointmentService : AppointmentService,
              private patientService : PatientService,
              private conditionService : ConditionService,
              private procedureService : ProcedureService,
              private medicineService : MedicineService,
              private fb : FormBuilder,
              private route : ActivatedRoute,
              private location: Location) { }

            
  medicines$ = this.medicineService.getAll(new HttpParams().set('sort','name'));

  ngOnInit() {
    this.patient = '';

    this.appointmentForm = this.fb.group({
      patient: ['', Validators.required],
      subjective: [''],
      objective: [''],
      prescription: this.fb.array([])
    });

    this.route.url.pipe(switchMap(params => {
      if(params[1] && params[2].path == 'diagnose') {
        const id = params[1].path;
        this.editMode = true;
        return this.appointmentService.get(id);
      }
    })).subscribe(x => {
      this.appointment = x;
    });

    this.medicines$.subscribe(x=> {
      this.medicines = x._embedded.medicines;
    })
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

  goBack() { this.location.back(); }

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
        return empty();
      })
    ).subscribe((response) => {
      this.goBack();
    });
  }

  public requestConditions = (name: string): Observable<Condition[]> => {
    let params = new HttpParams().set('name', name);
    return this.conditionService.getAll(params).pipe(map(data => {
      return data._embedded.conditions;
    }));
  };

  onSaveDiagnosis() {
    // console.log(this.appointmentForm.value);
    let diagnosis = { 
      subjective : this.f.subjective.value, 
      objective : this.f.objective.value,
      conditions: this.diagnoses.map(x => x.id),
      procedures: this.procedures.map(x => x.id),
      prescription: this.f.prescription.value};
    console.log(JSON.stringify(diagnosis));
    return this.appointmentService.diagnose(this.appointment._links.diagnose, diagnosis).subscribe(x => this.location.back());
  }

  public requestProcedures = (name: string): Observable<Procedure[]> => {
    let params = new HttpParams().set('name', name);
    return this.procedureService.getAll(params).pipe(map(data => {
      return data._embedded.procedures;
    }));
  };

  // Dynamic addition/removal of medicine
  get prescriptionFormArray() {
    return (<FormArray>this.appointmentForm.get('prescription'));
  }

  createPrescriptionGroup() {
    return this.fb.group({
      medicine: this.medicines[0].id,
      instructions: ''
    });
  }

  addPrescriptionToPrescriptionFormArray() {
    this.prescriptionFormArray.push(this.createPrescriptionGroup());
  }

  removePrescriptionFromPrescriptionFormArray(index) {
    this.prescriptionFormArray.removeAt(index);
  }

  getPrescriptionGroupAtIndex(index) {
    return (<FormGroup>this.prescriptionFormArray.at(index));
  }

  getFormControl() {
    return this.fb.control(null);
  }

  selectedAPIChanged(i) {
    this.getPrescriptionGroupAtIndex(i).addControl('value', this.getFormControl());
  }
}
