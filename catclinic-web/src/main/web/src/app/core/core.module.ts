import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService, PatientService } from "./services";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ApiService,
        PatientService
    ],
    declarations: []
})
export class CoreModule { }