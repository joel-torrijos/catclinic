import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ProcedureListComponent } from "./procedure-list/procedure-list.component";
import { ProcedureEditorComponent } from "./procedure-editor/procedure-editor.component";

const routes: Routes = [
    { path: 'procedures', component: ProcedureListComponent},
    { path: 'procedures/new', component: ProcedureEditorComponent},
    { path: 'procedures/:id/edit', component: ProcedureEditorComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcedureRoutingModule { }