import { ConditionListComponent } from "./condition-list/condition-list.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConditionEditorComponent } from "./condition-editor/condition-editor.component";

const routes : Routes = [
    { path: 'conditions', component: ConditionListComponent},
    { path: 'conditions/new', component: ConditionEditorComponent},
    { path: 'conditions/:id/edit', component: ConditionEditorComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConditionRoutingModule { }