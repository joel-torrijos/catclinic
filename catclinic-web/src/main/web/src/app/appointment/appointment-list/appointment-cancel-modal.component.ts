import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Appointment, AppointmentService } from "src/app/core";

@Component({
    selector: 'appointment-cancel-modal',
    template: `
      <div class="modal-header">
        <h4 class="modal-title">Confirm Cancel Appointment</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Are you sure to cancel the appointment of <strong>{{appointment.patient.firstName}} {{appointment.patient.lastName}}</strong> 
          on <strong>{{appointment.createdDate | date:'medium'}}</strong>?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
        <button class="btn btn-danger" (click)="onCancel()"><span class="oi oi-circle-x"></span>&nbsp;Cancel</button>
      </div>
    `
  })
export class AppointmentCancelModal {
    @Input() appointment : Appointment;

    constructor(public activeModal: NgbActiveModal,
                private appointmentService : AppointmentService) {}

    onCancel() {
      this.appointmentService
        .cancel(this.appointment._links.cancel)
        .subscribe(() => this.activeModal.close());
    }
}