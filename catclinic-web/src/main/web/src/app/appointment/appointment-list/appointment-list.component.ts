import { Component, OnInit } from '@angular/core';
import { Appointments, Appointment, AppointmentService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  response : Appointments;
  appointments : Appointment[];
  pages: number[];

  constructor(private appointmentService : AppointmentService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.pipe(switchMap(param=> {
      let httpParams = new HttpParams({ fromObject: param });
      return this.appointmentService.getAll(httpParams);
    })).subscribe((response : Appointments) => {
      this.response = response;
      this.appointments = response._embedded.appointments;
      this.pages = Array(response.page.totalPages).fill(0).map((x,i) => i);
    });
  }

}
