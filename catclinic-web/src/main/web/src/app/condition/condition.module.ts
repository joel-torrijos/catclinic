import { NgModule } from "@angular/core";
import { SharedModule } from "../shared";
import { ConditionListComponent } from './condition-list/condition-list.component';
import { ConditionRoutingModule } from "./condition-routing.module";
import { ConditionEditorComponent } from './condition-editor/condition-editor.component';

@NgModule({
    imports: [
        SharedModule,
        ConditionRoutingModule
    ],
    declarations: [ConditionListComponent, ConditionEditorComponent],
    providers: []
})
export class ConditionModule { }