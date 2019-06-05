import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService, PatientService, ConditionService, AppointmentService } from "./services";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ApiService,
        PatientService,
        ConditionService,
        AppointmentService
    ],
    declarations: []
})
export class CoreModule { }