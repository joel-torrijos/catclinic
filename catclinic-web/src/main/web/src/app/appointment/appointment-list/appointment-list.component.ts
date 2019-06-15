import { Component, OnInit } from '@angular/core';
import { Appointments, Appointment, AppointmentService, Link } from 'src/app/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { formatDate, DatePipe } from '@angular/common';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { EMPTY } from '@angular/core/src/render3/definition';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  response : Appointments;
  searchDate: string;
  searchName: string = '';

  constructor(private appointmentService : AppointmentService,
              private route: ActivatedRoute,
              private router : Router) { }

  private readonly refreshToken$ = new BehaviorSubject(undefined);

  private readonly response$ = 
    combineLatest(this.route.queryParams, this.refreshToken$)
      .pipe(
        switchMap(([queryParams]) => {
          let httpParams = new HttpParams({ fromObject: queryParams });
          return this.appointmentService.getAll(httpParams);
        }));
  
  ngOnInit() {
    var today = new Date();
    this.searchDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    this.router.navigate(['/appointments'], { queryParams: { createdDate: new Date(this.searchDate).toISOString() }, queryParamsHandling: 'merge'  });
  }

  onSearch() {
    this.router.navigate(['/appointments'], { queryParams: 
      { createdDate: this.searchDate === '' ? '' : new Date(this.searchDate).toISOString() ,
        patient_firstName: this.searchName, 
        patient_lastName:  this.searchName }
    });
  }

  onCancel(appointment : Appointment) {
    this.appointmentService
      .cancel(appointment._links.cancel)
      .subscribe(() => this.refreshToken$.next(undefined));
  }
}
