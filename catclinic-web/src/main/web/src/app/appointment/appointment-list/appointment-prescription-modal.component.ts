import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Appointment, AppointmentService } from "src/app/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
    selector: 'appointment-prescription-modal',
    template: `
      <div class="modal-header">
        <h4 class="modal-title">Appointment Prescription</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-1">
            <h1>&#8478;</h1>
          </div>
          <div class="col-11">
            <span>Mantis Toboggan, M.D.</span><br>
            <span>2219 Renwick Drive, Philadelphia, Pennsylvania</span><br>
            <span>(123) 456-7890</span>
          </div>
        </div>
        <hr class="mb-2">
        <div class="row">
            <div class="col-8">
              <div class="form-group row">
                <label for="" class="col-3 col-form-label text-muted">Patient Name</label>
                <div class="col-9">
                    <input type="text" readonly class="form-control-plaintext" value="{{appointment.patient.firstName}} {{appointment.patient.lastName}}">
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="form-group row">
                <label for="" class="col-3 col-form-label text-muted">Date</label>
                <div class="col-9">
                    <input type="text" readonly class="form-control-plaintext" value="{{appointment.createdDate | date: 'mediumDate'}}">
                </div>
              </div>
            </div>
        </div> 
        <!-- <div class="form-group row">
            <label for="" class="col-4 col-form-label text-muted">Amount to Pay</label>
            <div class="col-8">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">₱</span>
                    </div>
                    <input type="number" class="form-control" formControlName="amountPaid" aria-label="Amount (to the nearest dollar)">
                </div>
            </div>
        </div> -->
      </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
      <button class="btn btn-success" (click)="onPay()"><span class="oi oi-print"></span>&nbsp;Print</button>
    </div>
    `
  })
export class AppointmentPrescriptionModal implements OnInit{
  @Input() appointment : Appointment;
  paymentForm : FormGroup;
  
  constructor(public activeModal: NgbActiveModal,
              private appointmentService : AppointmentService,
              private fb : FormBuilder) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      amountPaid: [0, [Validators.required, Validators.min(0), Validators.pattern('^(0|[1-9][0-9]*)$')]]
    });
  }

  onPay() {
    this.paymentForm.patchValue({
      amountPaid: this.paymentForm.controls.amountPaid.value.toFixed(2)
    });
    console.log(this.paymentForm.value);
    this.appointmentService
      .pay(this.appointment._links.pay, this.paymentForm.value)
      .subscribe(() => this.activeModal.close());
  }
}