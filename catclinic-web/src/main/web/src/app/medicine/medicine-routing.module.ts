import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { MedicineListComponent } from "./medicine-list/medicine-list.component";
import { MedicineEditorComponent } from "./medicine-editor/medicine-editor.component";

const routes: Routes = [
    { path: 'medicines', component: MedicineListComponent},
    { path: 'medicines/new', component: MedicineEditorComponent},
    { path: 'medicines/:id/edit', component: MedicineEditorComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MedicineRoutingModule { }