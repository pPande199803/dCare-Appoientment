import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorNotificationComponent } from './doctor-notification/doctor-notification.component';

const routes: Routes = [
  { path: '', component: DoctorComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'add-doctor', component: AddDoctorComponent },
  { path: 'doctor-notification', component: DoctorNotificationComponent },
  { path: 'appointment/:id', component: AppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
