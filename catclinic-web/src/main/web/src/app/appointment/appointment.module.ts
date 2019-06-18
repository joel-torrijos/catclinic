import { NgModule } from "@angular/core";
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentRoutingModule } from "./appointment-routing.module";
import { SharedModule } from "../shared";
import { AppointmentEditorComponent } from './appointment-editor/appointment-editor.component';
import { AppointmentCancelModal } from "./appointment-list/appointment-cancel-modal.component";
import { AppointmentPayModal } from "./appointment-list/appointment-pay-modal.component";
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';

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
        AppointmentDetailsComponent
    ],
    providers: [],
    entryComponents: [
        AppointmentCancelModal,
        AppointmentPayModal
    ]
})
export class AppointmentModule { }