import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
// import { SpinnerComponent } from '../spiner/spiner.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorNotificationComponent } from './doctor-notification/doctor-notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DoctorComponent,
    AppointmentComponent,
    AddDoctorComponent,
    DoctorNotificationComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ReactiveFormsModule,FormsModule
  ]
})
export class DoctorModule { }
