import { Component, OnInit } from '@angular/core';
import { Appointments, Appointment, AppointmentService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentCancelModal } from './appointment-cancel-modal.component';
import { AppointmentPayModal } from './appointment-pay-modal.component';

declare var $ : any;

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  statusOptions = [ {value: '', display: 'All'},
    {value: 'PENDING', display: 'Pending'},
    {value: 'FOR PAYMENT', display: 'For Payment'},
    {value: 'PAID', display: 'Paid'},
    {value: 'CANCELLED', display: 'Cancelled'}
  ];
  sortOptions = [ {value: 'status,lastModifiedDate', display: 'Status'} ];
  searchDate: string;
  searchName: string = '';
  searchStatus = this.statusOptions[0];
  sortBy = this.sortOptions[0];
                    
  constructor(private appointmentService : AppointmentService,
              private route: ActivatedRoute,
              private router : Router,
              private modalService : NgbModal) { }

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

  onRemoveFilter() {
    this.searchDate = '';
    this.searchName = '';
    this.searchStatus = this.statusOptions[0];
  }

  openCancelModal(appointment : Appointment){
    const modalRef = this.modalService.open(AppointmentCancelModal);
    modalRef.componentInstance.appointment = appointment;
    modalRef.result.then((result) => this.refreshToken$.next(undefined));
  }

  openPayModal(appointment : Appointment){
    const modalRef = this.modalService.open(AppointmentPayModal);
    modalRef.componentInstance.appointment = appointment;
    modalRef.result.then((result) => this.refreshToken$.next(undefined));
  }

  getPageFromService(page) {
    this.router.navigate(['/appointments'], { queryParams: { page: +page -1 }, queryParamsHandling: 'merge'  });
  }
  
}
