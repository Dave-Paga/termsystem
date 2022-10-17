import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './adminComponents/admin/admin.component';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './staffComponents/employee/employee.component';
import { HomeComponent } from './mainComponents/home/home.component';
import { LoginComponent } from './mainComponents/login/login.component';
import { SignupComponent } from './mainComponents/signup/signup.component';
import { UserComponent } from './customerComponents/user/user.component';
import { BookAppointmentComponent } from './mainComponents/book-appointment/book-appointment.component';
import { DiagnoseVehicleCredentialsComponent } from './mainComponents/diagnose-vehicle-credentials/diagnose-vehicle-credentials.component';
import { DiagnoseVehicleProblemComponent } from './uncategorizedComponents/diagnose-vehicle-problem/diagnose-vehicle-problem.component';
import { DiagnoseVehicleFindingsComponent } from './uncategorizedComponents/diagnose-vehicle-findings/diagnose-vehicle-findings.component';
import { RepairHistoryComponent } from './customerComponents/repair-history/repair-history.component';
import { ServiceComponentComponent } from './uncategorizedComponents/service-component/service-component.component';
import { StaffComponent } from './staffComponents/staff/staff.component';
import { HowsmyvehicleComponent } from './mainComponents/howsmyvehicle/howsmyvehicle.component';
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
import { EditTicketAdminComponent } from './adminComponents/edit-ticket-admin/edit-ticket-admin.component';


const routes: Routes = [
  //Main
  { path: '', component: HomeComponent, canActivate: [AuthUserGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthUserGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthUserGuard] },
  { path: 'redirect', component: RedirectComponent, canActivate: [AuthGuard] },
  { path: 'howsmy', component: HowsmyvehicleComponent },
  { path: 'bookingAppointment', component: BookAppointmentComponent},
  { path: 'diagnoseVehicleCredentials', component: DiagnoseVehicleCredentialsComponent},
  

  //Admin
  { path: 'TicketViewViewComponent', component: TicketViewViewComponent, canActivate: [AuthGuard] },
  { path: 'adminpage', component: AdminpageComponent, canActivate: [AuthGuard] },
  { path: 'editpermissions', component: EditpermissionsComponent, canActivate: [AuthGuard] },
  { path: 'SchedulingEmployeesViewComponent', component: SchedulingEmployeesViewComponent, canActivate: [AuthGuard] },
  { path: "editTicketAdmin", component: EditTicketAdminComponent, canActivate: [AuthGuard] },
  

  //Staff
  { path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard] },
  { path: 'EditEmployee', component: EditAccountStaffComponent, canActivate: [AuthGuard] },
  { path: 'ticketedit', component: TicketeditComponent, canActivate: [AuthGuard] },
  
  { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] },

  //Customer
  { path: 'EditUser', component: EditAccountUserComponent, canActivate: [AuthGuard] },
  { path: 'RepairHistoryComponent', component: RepairHistoryComponent, canActivate: [AuthGuard] },
  { path: 'UserBook', component: UserBookAppointmentComponent, canActivate: [AuthGuard] },
  { path: 'UserHomePageComponent', component: UserHomePageComponent, canActivate: [AuthGuard] },
  { path: 'UserHowsMy', component: UserHowsmyComponent, canActivate: [AuthGuard] },

  //Deprecated
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'service', component: ServiceComponentComponent},
  { path: 'editappointment', component: EditappointmentComponent},
  { path: 'DiagnoseVehicleProblemComponent', component: DiagnoseVehicleProblemComponent },
  { path: 'DiagnoseVehicleFindingsComponent', component: DiagnoseVehicleFindingsComponent },
  
  //Uncategorized
  { path: 'LandingPageComponent', component: LandingPageComponent},
  { path: 'LandingToolBarComponent', component: LandingToolBarComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
