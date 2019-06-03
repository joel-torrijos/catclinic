import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";

const routes : Routes = [
    { path: '', redirectTo: 'patients', pathMatch: "full"},
    { path: 'patients', loadChildren: './patient/patient.module#PatientModule'},
    { path: 'conditions', loadChildren: './condition/condition.module#ConditionModule'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }