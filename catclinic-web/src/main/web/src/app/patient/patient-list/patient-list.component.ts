import { Component, OnInit } from '@angular/core';
import { Patients, Patient } from 'src/app/core';
import { PatientService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  response : Patients;
  patients : Patient[];
  pages: number[];

  constructor(private patientService : PatientService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.pipe(switchMap(param=> {
      let httpParams = new HttpParams({ fromObject: param });
      return this.patientService.getAll(httpParams);
    })).subscribe((response : Patients) => {
      this.response = response;
      // this.response.page = response.page;
      this.patients = response._embedded.patients;
      // console.log(response.page);
      this.pages = Array(response.page.totalPages).fill(0).map((x,i) => i);
      // console.log(this.pages);
    });
  }

}
