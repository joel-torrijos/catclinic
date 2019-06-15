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
  statusOptions = [ {value: '', display: 'All'},
    {value: 'PENDING', display: 'Pending'},
    {value: 'FOR PAYMENT', display: 'For Payment'},
    {value: 'PAID', display: 'Paid'},
    {value: 'CANCELLED', display: 'Cancelled'}
  ];
  sortOptions = [ {value: 'status', display: 'Status'} ];
  searchDate: string;
  searchName: string = '';
  searchStatus = this.statusOptions[0];
  sortBy = this.sortOptions[0];
                    
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

    this.router.navigate(['/appointments'], { queryParams: { createdDate: new Date(this.searchDate).toISOString(), sort : this.sortBy.value }, queryParamsHandling: 'merge'  });
  }

  onSearch() {
    this.router.navigate(['/appointments'], { queryParams: 
      { createdDate: this.searchDate === '' ? '' : new Date(this.searchDate).toISOString() ,
        patient_firstName: this.searchName, 
        patient_lastName:  this.searchName,
        status: this.searchStatus.value,
        sort: this.sortBy.value }
    });
  }

  onCancel(appointment : Appointment) {
    this.appointmentService
      .cancel(appointment._links.cancel)
      .subscribe(() => this.refreshToken$.next(undefined));
  }

  onRemoveFilter() {
    this.searchDate = '';
    this.searchName = '';
    this.searchStatus = this.statusOptions[0];
  }
}
