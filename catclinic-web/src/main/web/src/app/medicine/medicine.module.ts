import { NgModule } from "@angular/core";
import { SharedModule } from "../shared";
import { MedicineRoutingModule } from "./medicine-routing.module";
import { MedicineListComponent } from "./medicine-list/medicine-list.component";
import { MedicineEditorComponent } from './medicine-editor/medicine-editor.component';

@NgModule({
    imports: [
        SharedModule,
        MedicineRoutingModule
    ],
    declarations: [
        MedicineListComponent,
        MedicineEditorComponent
    ],
    providers: []
})
export class MedicineModule { }