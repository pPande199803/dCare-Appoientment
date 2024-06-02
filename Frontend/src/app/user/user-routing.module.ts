import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { UserNotificationComponent } from './user-notification/user-notification.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'user-appointment', component: AppointmentComponent },
  { path: 'user-notification', component: UserNotificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
