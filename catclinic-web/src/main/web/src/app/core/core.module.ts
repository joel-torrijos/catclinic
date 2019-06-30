import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService, PatientService, ConditionService, AppointmentService, GenderService, ProcedureService } from "./services";
import { MedicineService } from "./services/medicine.service";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ApiService,
        PatientService,
        ConditionService,
        AppointmentService,
        GenderService,
        ProcedureService,
        MedicineService
    ],
    declarations: []
})
export class CoreModule { }