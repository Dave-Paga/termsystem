import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './adminComponents/admin/admin.component';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './staffComponents/employee/employee.component';
import { HomeComponent } from './mainComponents/home/home.component';
import { LoginComponent } from './mainComponents/login/login.component';
import { SignupComponent } from './mainComponents/signup/signup.component';
import { UserComponent } from './customerComponents/user/user.component';
import { BookAppointmentComponent } from './uncategorizedComponents/book-appointment/book-appointment.component';
import { DiagnoseVehicleCredentialsComponent } from './uncategorizedComponents/diagnose-vehicle-credentials/diagnose-vehicle-credentials.component';
import { DiagnoseVehicleProblemComponent } from './uncategorizedComponents/diagnose-vehicle-problem/diagnose-vehicle-problem.component';
import { DiagnoseVehicleFindingsComponent } from './uncategorizedComponents/diagnose-vehicle-findings/diagnose-vehicle-findings.component';
import { RepairHistoryComponent } from './customerComponents/repair-history/repair-history.component';
import { ServiceComponentComponent } from './uncategorizedComponents/service-component/service-component.component';
import { StaffComponent } from './staffComponents/staff/staff.component';
import { HowsmyvehicleComponent } from './uncategorizedComponents/howsmyvehicle/howsmyvehicle.component';
import { AppointmentComponent } from './staffComponents/appointment/appointment.component';
import { EditappointmentComponent } from './uncategorizedComponents/editappointment/editappointment.component';
import { AdminpageComponent } from './adminComponents/adminpage/adminpage.component';
import { AuthGuard } from './services/guard/auth.guard';
import { SchedulingEmployeesViewComponent } from './adminComponents/scheduling-employees-view/scheduling-employees-view.component';
import { SchedulingEmployeesEditComponent } from './uncategorizedComponents/scheduling-employees-edit/scheduling-employees-edit.component';
import { TicketViewViewComponent } from './adminComponents/ticket-view-view/ticket-view-view.component';
import { TicketeditComponent } from './uncategorizedComponents/ticketedit/ticketedit.component';
import { EditpermissionsComponent } from './adminComponents/editpermissions/editpermissions.component';

import { AuthUserGuard } from './services/guard/auth-user.guard';
import { RedirectComponent } from './mainComponents/redirect/redirect.component';
import { UserHomePageComponent } from './customerComponents/user-home-page/user-home-page.component';
import { UserBookAppointmentComponent } from './customerComponents/user-book-appointment/user-book-appointment.component';
import { UserHowsmyComponent } from './customerComponents/user-howsmy/user-howsmy.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingToolBarComponent } from './landing-tool-bar/landing-tool-bar.component';
import { EditAccountUserComponent } from './customerComponents/edit-account-user/edit-account-user.component';
import { EditAccountStaffComponent } from './staffComponents/edit-account-staff/edit-account-staff.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthUserGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthUserGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthUserGuard] },
  { path: 'redirect', component: RedirectComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'bookingAppointment', component: BookAppointmentComponent, canActivate: [AuthGuard] },
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
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'SchedulingEmployeesViewComponent', component: SchedulingEmployeesViewComponent},
  { path: 'SchedulingEmployeesEditComponent',component: SchedulingEmployeesEditComponent},
  { path: 'TicketViewViewComponent', component: TicketViewViewComponent},
  { path: 'ticketedit', component: TicketeditComponent},
  { path: 'editpermissions', component: EditpermissionsComponent},
  { path: 'UserHomePageComponent', component: UserHomePageComponent, canActivate: [AuthGuard] },
  { path: 'UserBook', component: UserBookAppointmentComponent, canActivate: [AuthGuard] },
  { path: 'UserHowsMy', component: UserHowsmyComponent, canActivate: [AuthGuard] },
  { path: 'LandingPageComponent', component: LandingPageComponent},
  { path: 'LandingToolBarComponent', component: LandingToolBarComponent},
  { path: 'EditUser', component: EditAccountUserComponent},
  { path: 'EditEmployee', component: EditAccountStaffComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
