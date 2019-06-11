import { Component, OnInit } from '@angular/core';
import { Appointments, Appointment, AppointmentService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  response : Appointments;
  appointments : Appointment[];
  pages: number[];
  searchDate: string;
  searchName: string = '';

  constructor(private appointmentService : AppointmentService,
              private route: ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    var today = new Date();
    this.searchDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    this.router.navigate(['/appointments'], { queryParams: { createdDate: new Date(this.searchDate).toISOString() }, queryParamsHandling: 'merge'  });

    this.route.queryParams.pipe(switchMap(param=> {
      let httpParams = new HttpParams({ fromObject: param });
      return this.appointmentService.getAll(httpParams);
    })).subscribe((response : Appointments) => {
      this.response = response;
      this.appointments = response._embedded.appointments;
      this.pages = Array(response.page.totalPages).fill(0).map((x,i) => i);
    });
  }

  onSearch() {
    this.router.navigate(['/appointments'], { queryParams: 
      { createdDate: this.searchDate === '' ? '' : new Date(this.searchDate).toISOString() ,
        patient_firstName: this.searchName, 
        patient_lastName:  this.searchName }
    });
  }

}
