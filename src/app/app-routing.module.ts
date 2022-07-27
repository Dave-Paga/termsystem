import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { DiagnoseVehicleCredentialsComponent } from './diagnose-vehicle-credentials/diagnose-vehicle-credentials.component';
import { DiagnoseVehicleProblemComponent } from './diagnose-vehicle-problem/diagnose-vehicle-problem.component';
import { DiagnoseVehicleFindingsComponent } from './diagnose-vehicle-findings/diagnose-vehicle-findings.component';
import { RepairHistoryComponent } from './repair-history/repair-history.component';
import { ServiceComponentComponent } from './service-component/service-component.component';
import { StaffComponent } from './staff/staff.component';
import { HowsmyvehicleComponent } from './howsmyvehicle/howsmyvehicle.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { EditappointmentComponent } from './editappointment/editappointment.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AuthGuard } from './services/guard/auth.guard';
import { SchedulingEmployeesViewComponent } from './scheduling-employees-view/scheduling-employees-view.component';
import { SchedulingEmployeesEditComponent } from './scheduling-employees-edit/scheduling-employees-edit.component';
import { TicketViewViewComponent } from './ticket-view-view/ticket-view-view.component';


import { AuthUserGuard } from './services/guard/auth-user.guard';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthUserGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthUserGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthUserGuard] },
  { path: 'redirect', component: RedirectComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'bookingAppointment', component: BookAppointmentComponent },
  { path: 'diagnoseVehicleCredentials', component: DiagnoseVehicleCredentialsComponent},
  { path: 'DiagnoseVehicleProblemComponent', component: DiagnoseVehicleProblemComponent},
  { path: 'DiagnoseVehicleFindingsComponent', component: DiagnoseVehicleFindingsComponent},
  { path: 'RepairHistoryComponent', component: RepairHistoryComponent},
  { path: 'service', component: ServiceComponentComponent},
  { path: 'staff', component: StaffComponent},
  { path: 'howsmy', component: HowsmyvehicleComponent},
  { path: 'appointment', component: AppointmentComponent},
  { path: 'editappointment', component: EditappointmentComponent},
  { path: 'adminpage', component: AdminpageComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'SchedulingEmployeesViewComponent', component: SchedulingEmployeesViewComponent},
  { path: 'SchedulingEmployeesEditComponent',component: SchedulingEmployeesEditComponent},
  { path: 'TicketViewViewComponent',component: TicketViewViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
