import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";

const routes : Routes = [
    { path: '', redirectTo: 'patients', pathMatch: "full"},
    { path: 'appointments', loadChildren: './appointment/appointment.module#AppointmentModule'},
    { path: 'conditions', loadChildren: './condition/condition.module#ConditionModule'},
    { path: 'patients', loadChildren: './patient/patient.module#PatientModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }