import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { DiagnoseVehicleCredentialsComponent } from './diagnose-vehicle-credentials/diagnose-vehicle-credentials.component';
import { DiagnoseVehicleProblemComponent } from './diagnose-vehicle-problem/diagnose-vehicle-problem.component';
import { DiagnoseVehicleFindingsComponent } from './diagnose-vehicle-findings/diagnose-vehicle-findings.component';
import { RepairHistoryComponent } from './repair-history/repair-history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user', component: UserComponent },
  { path: 'bookingAppointment', component: BookAppointmentComponent },
  { path: 'diagnoseVehicleCredentials', component: DiagnoseVehicleCredentialsComponent},
  { path: 'DiagnoseVehicleProblemComponent', component: DiagnoseVehicleProblemComponent},
  { path: 'DiagnoseVehicleFindingsComponent', component: DiagnoseVehicleFindingsComponent},
  { path: 'RepairHistoryComponent', component: RepairHistoryComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
