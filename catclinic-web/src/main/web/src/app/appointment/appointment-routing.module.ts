import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AppointmentListComponent } from "./appointment-list/appointment-list.component";
import { AppointmentEditorComponent } from "./appointment-editor/appointment-editor.component";

const routes : Routes = [
    { path: 'appointments', component: AppointmentListComponent},
    { path: 'appointments/new', component: AppointmentEditorComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppointmentRoutingModule { }