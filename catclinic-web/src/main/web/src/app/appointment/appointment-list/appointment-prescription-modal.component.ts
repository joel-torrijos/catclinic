import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
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
            <h1 class="display-3">&#8478;</h1>
          </div>
          <div class="col-11">
            <span>Mantis Toboggan, M.D.</span><br>
            <span>2219 Renwick Drive, Philadelphia, Pennsylvania</span><br>
            <span>(123) 456-7890</span>
          </div>
        </div>
        <hr>
        <div class="row mb-3">
            <div class="col-8">
              <div class="form-group row">
                <label for="" class="col-3 col-form-label text-muted">Patient Name</label>
                <div class="col-9">
                    <input type="text" readonly class="form-control-plaintext border-bottom" value="{{appointment.patient.firstName}} {{appointment.patient.lastName}}">
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="form-group row">
                <label for="" class="col-3 col-form-label text-muted">Date</label>
                <div class="col-9">
                    <input type="text" readonly class="form-control-plaintext border-bottom" value="{{appointment.createdDate | date: 'mediumDate'}}">
                </div>
              </div>
            </div>
        </div> 
        <div class="row">
          <div class="col-10 offset-1">
            <div class="row" *ngFor="let prescription of appointment.prescription">
              <div class="col-4">
                <input type="text" readonly class="form-control-plaintext" value="{{ prescription.medicine }}">
              </div>
              <div class="col-8">
                <input type="text" readonly class="form-control-plaintext" value="{{ prescription.instructions }}">
              </div>
            </div>

          </div>
        </div> 
        <div class="row signature mb-2">
          <div class="col-5">
            <input type="text" readonly class="form-control-plaintext border-bottom">
            <label class="d-flex justify-content-center">Signature</label>
          </div>
        </div> 
      </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
      <button class="btn btn-success" (click)="onPay()"><span class="oi oi-print"></span>&nbsp;Print</button>
    </div>
    `, 
    encapsulation: ViewEncapsulation.None,
    styles: [`
      .prescription-modal .modal-content {
        width: 800px;
        height: 700px;
      }
      .modal-content {
        height: 100%;
        border-radius: 0;
        position:relative;
      }
      .modal-body {
        height: 560px;
      }
      .modal-footer {
        border-radius: 0;
        bottom:0px;
        position:absolute;
        width:100%;
      }
      .signature {
        width: 100%;
        position: absolute;
        bottom: 0;
      }
    `
    ]
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