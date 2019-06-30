import { NgModule } from "@angular/core";
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentRoutingModule } from "./appointment-routing.module";
import { SharedModule } from "../shared";
import { AppointmentEditorComponent } from './appointment-editor/appointment-editor.component';
import { AppointmentCancelModal } from "./appointment-list/appointment-cancel-modal.component";
import { AppointmentPayModal } from "./appointment-list/appointment-pay-modal.component";
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentPrescriptionModal } from "./appointment-list/appointment-prescription-modal.component";

@NgModule({
    imports: [
        SharedModule,
        AppointmentRoutingModule
    ],
    declarations: [
        AppointmentListComponent, 
        AppointmentEditorComponent,
        AppointmentCancelModal,
        AppointmentPayModal,
        AppointmentPrescriptionModal,
        AppointmentDetailsComponent
    ],
    providers: [],
    entryComponents: [
        AppointmentCancelModal,
        AppointmentPayModal,
        AppointmentPrescriptionModal
    ]
})
export class AppointmentModule { }