import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService, PatientService, ConditionService } from "./services";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ApiService,
        PatientService,
        ConditionService
    ],
    declarations: []
})
export class CoreModule { }