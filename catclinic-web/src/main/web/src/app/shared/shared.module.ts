import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [],
    exports: [CommonModule]
})
export class SharedModule {}