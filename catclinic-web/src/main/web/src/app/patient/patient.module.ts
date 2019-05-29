import { NgModule } from "@angular/core";
import { PatientListComponent } from "./patient-list/patient-list.component";
import { PatientRoutingModule } from "./patient-routing.module";
import { SharedModule } from "../shared";

@NgModule({
    imports: [
        SharedModule,
        PatientRoutingModule
    ],
    declarations: [
        PatientListComponent
    ],
    providers: []
})
export class PatientModule { }