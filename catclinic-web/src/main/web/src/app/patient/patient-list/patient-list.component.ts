import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/core/services';
import { Patients, Patient } from 'src/app/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  response : Patients;
  patients : Patient[];

  constructor(private patientService : PatientService) { }

  ngOnInit() {
    this.patientService.getAll().subscribe((response : Patients) => {
      this.response = response;
      this.patients = response._embedded.patients;
    });
  }

}
