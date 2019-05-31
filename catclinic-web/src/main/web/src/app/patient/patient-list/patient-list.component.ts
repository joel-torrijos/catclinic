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
  pages: number[];

  constructor(private patientService : PatientService) { }

  ngOnInit() {
    console.log("zz");
    this.patientService.getAll().subscribe((response : Patients) => {
      console.log(response);
      this.response = response;
      // this.response.page = response.page;
      this.patients = response._embedded.patients;
      console.log(response.page);
      this.pages = Array(response.page.totalPages).fill().map((x,i) => i);
      console.log(this.pages);
    });
  }

}
