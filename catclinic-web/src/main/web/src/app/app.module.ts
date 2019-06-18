import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PatientModule } from './patient/patient.module';
import { CoreModule } from './core';
import { SharedModule, FooterComponent } from './shared';
import { HeaderComponent } from './shared';
import { ConditionModule } from './condition/condition.module';
import { AppointmentModule } from './appointment/appointment.module';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    PatientModule,
    ConditionModule,
    AppointmentModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
