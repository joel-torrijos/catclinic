import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  constructor(private appointmentService : AppointmentService,
              private route : ActivatedRoute,
              private location: Location) { }

  private readonly response$ = this.route.params.pipe(
    switchMap((params) => 
      this.appointmentService.get(params['id'])
    ));

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
