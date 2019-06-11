import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService, PatientService, ConditionService, AppointmentService, GenderService } from "./services";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ApiService,
        PatientService,
        ConditionService,
        AppointmentService,
        GenderService
    ],
    declarations: []
})
export class CoreModule { }