import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AppointmentListComponent } from "./appointment-list/appointment-list.component";
import { AppointmentEditorComponent } from "./appointment-editor/appointment-editor.component";
import { AppointmentDetailsComponent } from "./appointment-details/appointment-details.component";

const routes : Routes = [
    { path: 'appointments', component: AppointmentListComponent},
    { path: 'appointments/new', component: AppointmentEditorComponent},
    { path: 'appointments/:id/diagnose', component: AppointmentEditorComponent},
    { path: 'appointments/:id/view', component: AppointmentDetailsComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppointmentRoutingModule { }