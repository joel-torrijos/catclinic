import { NgModule } from "@angular/core";
import { PatientListComponent } from "./patient-list/patient-list.component";
import { PatientRoutingModule } from "./patient-routing.module";
import { SharedModule } from "../shared";
import { PatientEditorComponent } from "./patient-editor/patient-editor.component";

@NgModule({
    imports: [
        SharedModule,
        PatientRoutingModule
    ],
    declarations: [
        PatientListComponent,
        PatientEditorComponent
    ],
    providers: []
})
export class PatientModule { }