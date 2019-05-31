import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PatientService, Patient } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
 
@Component({
  selector: 'app-patient-editor',
  templateUrl: './patient-editor.component.html',
  styleUrls: ['./patient-editor.component.css']
})
export class PatientEditorComponent implements OnInit {
  patient: Patient = {} as Patient;
  editMode : boolean;
  patientForm : FormGroup;
  submitted = false;

  constructor(private patientService : PatientService,
              private route : ActivatedRoute,
              private location: Location) { }
  
  ngOnInit() {
    this.patientForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    });

    this.route.paramMap.pipe(switchMap((params) => {
      if(params.get('id') !== null) {
        const id = params.get('id');
        this.editMode = true;
        return this.patientService.get(id);
      } else {
        this.editMode = false;
        return EMPTY;
      }})
    ).subscribe(patient => {
      this.patient = patient;
      this.patientForm.setValue({
        firstName: this.patient.firstName, 
        lastName: this.patient.lastName});
    });
  }

  get f() { return this.patientForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    if(this.patientForm.invalid) {
      return;
    }

    this.updatePatient(this.patientForm.value);

    this.patientService.save(this.patient).subscribe((response) => this.goBack());
  }

  updatePatient(values: Object) {
    Object.assign(this.patient, values);
  }

  goBack() {
    this.location.back();
  }

}
