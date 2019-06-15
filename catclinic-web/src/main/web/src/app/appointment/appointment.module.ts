import { NgModule } from "@angular/core";
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentRoutingModule } from "./appointment-routing.module";
import { SharedModule } from "../shared";
import { AppointmentEditorComponent } from './appointment-editor/appointment-editor.component';
import { AppointmentCancelModal } from "./appointment-list/appointment-cancel-modal.component";

@NgModule({
    imports: [
        SharedModule,
        AppointmentRoutingModule
    ],
    declarations: [
        AppointmentListComponent, 
        AppointmentEditorComponent,
        AppointmentCancelModal
    ],
    providers: [],
    entryComponents: [
        AppointmentCancelModal
    ]
})
export class AppointmentModule { }