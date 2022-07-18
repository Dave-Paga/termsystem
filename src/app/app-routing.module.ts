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
import { AuthGuard } from './services/guard/auth.guard';
import { PermissionGuard } from './services/permission.guard';
import { AuthUserGuard } from './services/guard/auth-user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthUserGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthUserGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthUserGuard] },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'bookingAppointment', component: BookAppointmentComponent },
  { path: 'diagnoseVehicleCredentials', component: DiagnoseVehicleCredentialsComponent },
  { path: 'DiagnoseVehicleProblemComponent', component: DiagnoseVehicleProblemComponent },
  { path: 'DiagnoseVehicleFindingsComponent', component: DiagnoseVehicleFindingsComponent },
  { path: 'RepairHistoryComponent', component: RepairHistoryComponent },
  { path: 'service', component: ServiceComponentComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'howsmy', component: HowsmyvehicleComponent }

  // {
  //   path: '',
  //   children: [
  //     {
  //       path: 'user',
  //       component: UserComponent,
  //       canActivate: [PermissionGuard],
  //       data: {permission: 0}
  //     },

  //     {
  //       path: 'employee',
  //       component: EmployeeComponent,
  //       canActivate: [PermissionGuard],
  //       data: { permission: 1}
  //     },

  //     {
  //       path: 'admin',
  //       component: AdminComponent,
  //       canActivate: [PermissionGuard],
  //       data: { permission: 2}
  //     }
  //   ],
  //   canActivate: [AuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
