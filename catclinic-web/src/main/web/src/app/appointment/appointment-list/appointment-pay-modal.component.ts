import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Appointment, AppointmentService } from "src/app/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
    selector: 'appointment-pay-modal',
    template: `
      <div class="modal-header">
        <h4 class="modal-title">Appointment Payment</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form [formGroup]="paymentForm">
          <div class="form-group row">
              <label for="" class="col-4 col-form-label text-muted">Appointment Date</label>
              <div class="col-8">
                  <input type="text" readonly class="form-control-plaintext" value="{{appointment.createdDate | date: 'medium'}}">
              </div>
          </div> 
          <div class="form-group row">
              <label for="" class="col-4 col-form-label text-muted">Patient Name</label>
              <div class="col-8">
                  <input type="text" readonly class="form-control-plaintext" value="{{appointment.patient.firstName}} {{appointment.patient.lastName}}">
              </div>
          </div> 
          <div class="form-group row">
            <label for="" class="col-4 col-form-label text-muted">Amount to Pay</label>
            <div class="col-8">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">₱</span>
                    </div>
                    <input type="number" class="form-control" [ngClass]="{'is-invalid' : f.amountPaid.invalid}" formControlName="amountPaid" aria-label="Amount (to the nearest dollar)">
                </div>
                <div *ngIf="f.amountPaid.invalid" class="invalid-feedback d-block">
                  <div *ngIf="f.amountPaid.errors?.required">Amount to pay is required.</div>
                  <div *ngIf="f.amountPaid.errors?.min">Invalid number. Input a nonnegative number.</div>
                </div>
            </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
      <button class="btn btn-success" (click)="onPay()"><span class="oi oi-dollar"></span>&nbsp;Pay</button>
    </div>
    `
  })
export class AppointmentPayModal implements OnInit{
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
    if(this.paymentForm.invalid) {
      console.log(this.f.amountPaid.errors);
      return;
    }

    this.paymentForm.patchValue({
      amountPaid: this.paymentForm.controls.amountPaid.value.toFixed(2)
    });
    console.log(this.paymentForm.value);
    this.appointmentService
      .pay(this.appointment._links.pay, this.paymentForm.value)
      .subscribe(() => this.activeModal.close());
  }

  get f() { return this.paymentForm.controls; }
}