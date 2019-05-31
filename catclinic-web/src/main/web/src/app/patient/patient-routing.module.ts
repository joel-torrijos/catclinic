import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { PatientListComponent } from "./patient-list/patient-list.component";
import { PatientEditorComponent } from "./patient-editor/patient-editor.component";

const routes: Routes = [
    { path: 'patients', component: PatientListComponent},
    { path: 'patients/new', component: PatientEditorComponent},
    { path: 'patients/:id/edit', component: PatientEditorComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientRoutingModule { }