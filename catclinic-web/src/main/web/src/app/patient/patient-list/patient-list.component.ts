import { Component, OnInit } from '@angular/core';
import { Patients, Patient } from 'src/app/core';
import { PatientService } from 'src/app/core/services';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  response : Patients;
  patients : Patient[];
  pages: number[];

  constructor(private patientService : PatientService) { }

  ngOnInit() {
    this.patientService.getAll().subscribe((response : Patients) => {
      this.response = response;
      // this.response.page = response.page;
      this.patients = response._embedded.patients;
      // console.log(response.page);
      this.pages = Array(response.page.totalPages).fill(0).map((x,i) => i);
      // console.log(this.pages);
    });
  }

}
