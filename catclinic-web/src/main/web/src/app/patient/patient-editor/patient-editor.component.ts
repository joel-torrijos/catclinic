import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PatientService, Patient, GenderService, Gender } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { HttpParams } from '@angular/common/http';
 
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
  genderOptions : Gender[];

  constructor(private patientService : PatientService,
              private genderService : GenderService,
              private route : ActivatedRoute,
              private location: Location) { }
  
  ngOnInit() {
    this.patientForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      birthDate: new FormControl('')
    });
    
    this.genderService.getAll({} as HttpParams).subscribe(
      response =>  {
        this.genderOptions = response._embedded.genders;
        this.patientForm.patchValue({gender: this.genderOptions[0].name});
      }
    );

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
      this.patientForm.patchValue({
        firstName: this.patient.firstName, 
        lastName: this.patient.lastName,
        gender: this.patient.gender.name,
        birthDate: this.patient.birthDate.toString().split('T')[0]});
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
    this.patient.birthDate = new Date(this.patientForm.controls.birthDate.value + 'T00:00:00.000Z');
  }

  goBack() {
    this.location.back();
  }

}
