import { NgModule } from "@angular/core";
import { SharedModule } from "../shared";
import { ProcedureListComponent } from "./procedure-list/procedure-list.component";
import { ProcedureRoutingModule } from "./procedure-routing.module";
import { ProcedureEditorComponent } from './procedure-editor/procedure-editor.component';


@NgModule({
    imports: [
        SharedModule,
        ProcedureRoutingModule
    ],
    declarations: [
        ProcedureListComponent,
        ProcedureEditorComponent
    ],
    providers: []
})
export class ProcedureModule { }