import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './mainComponents/login/login.component';
import { SignupComponent } from './mainComponents/signup/signup.component';
import { HomeComponent } from './mainComponents/home/home.component';
import { ToolbarComponent } from './mainComponents/toolbar/toolbar.component';
import { ToolbarstaffComponent } from './staffComponents/toolbarstaff/toolbarstaff.component';
import { ToolbaruserComponent } from './customerComponents/toolbaruser/toolbaruser.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AuthService } from './services/auth.service';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './customerComponents/user/user.component';
import { BookAppointmentComponent } from './mainComponents/book-appointment/book-appointment.component';
import { DiagnoseVehicleCredentialsComponent } from './mainComponents/diagnose-vehicle-credentials/diagnose-vehicle-credentials.component';
import { DiagnoseVehicleProblemComponent } from './uncategorizedComponents/diagnose-vehicle-problem/diagnose-vehicle-problem.component';
import { DiagnoseVehicleFindingsComponent } from './uncategorizedComponents/diagnose-vehicle-findings/diagnose-vehicle-findings.component';
import { RepairHistoryComponent } from './customerComponents/repair-history/repair-history.component';
import { ServiceComponentComponent } from './uncategorizedComponents/service-component/service-component.component';
import { StaffComponent } from './staffComponents/staff/staff.component';
import { HowsmyvehicleComponent } from './mainComponents/howsmyvehicle/howsmyvehicle.component';
import { EmployeeComponent } from './staffComponents/employee/employee.component';
import { AdminComponent } from './adminComponents/admin/admin.component';
import { AppointmentComponent } from './staffComponents/appointment/appointment.component';
import { EditappointmentComponent } from './uncategorizedComponents/editappointment/editappointment.component';
import { ToolbaradminComponent } from './adminComponents/toolbaradmin/toolbaradmin.component';
import { AdminpageComponent } from './adminComponents/adminpage/adminpage.component';
import { SchedulingEmployeesViewComponent } from './adminComponents/scheduling-employees-view/scheduling-employees-view.component';
import { SchedulingEmployeesEditComponent } from './uncategorizedComponents/scheduling-employees-edit/scheduling-employees-edit.component';
import { TicketViewViewComponent } from './adminComponents/ticket-view-view/ticket-view-view.component';
import { RedirectComponent } from './mainComponents/redirect/redirect.component';
import { EditEmployeeComponent } from './adminComponents/dataTables/edit-employee/edit-employee.component';
import { DataEmployeesComponent } from './adminComponents/dataTables/data-employees/data-employees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DataTicketsAdminComponent } from './adminComponents/dataTables/data-tickets-admin/data-tickets-admin.component';
import { EditTicketComponent } from './adminComponents/dataTables/edit-ticket/edit-ticket.component';

import { TicketeditComponent } from './uncategorizedComponents/ticketedit/ticketedit.component';
import { EditpermissionsComponent } from './adminComponents/editpermissions/editpermissions.component';
import { DataPermissionAdminComponent } from './adminComponents/dataTables/data-permission-admin/data-permission-admin.component';
import { EditPermissionComponent } from './adminComponents/dataTables/edit-permission/edit-permission.component';
import { ViewTicketDetailsAdminComponent } from './adminComponents/dataTables/view-ticket-details-admin/view-ticket-details-admin.component';
import { UserHomePageComponent } from './customerComponents/user-home-page/user-home-page.component';
import { UserBookAppointmentComponent } from './customerComponents/user-book-appointment/user-book-appointment.component';
import { ConfirmModalComponent } from './customerComponents/confirm-modal/confirm-modal.component';
import { UserHowsmyComponent } from './customerComponents/user-howsmy/user-howsmy.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingToolBarComponent } from './landing-tool-bar/landing-tool-bar.component';

import { EditAccountStaffComponent } from './staffComponents/edit-account-staff/edit-account-staff.component';
import { EditAccountUserComponent } from './customerComponents/edit-account-user/edit-account-user.component';

import { EditTicketStaffComponent } from './staffComponents/edit-ticket-staff/edit-ticket-staff.component';
import { TicketIDModalComponent } from './mainComponents/ticket-id-modal/ticket-id-modal.component';
import { EditTicketAdminComponent } from './adminComponents/edit-ticket-admin/edit-ticket-admin.component';
import { EditTicketAdminModalComponent } from './adminComponents/edit-ticket-admin-modal/edit-ticket-admin-modal.component';
import { DeleteModalComponent } from './mainComponents/delete-modal/delete-modal.component';
import { NgxPrintModule } from 'ngx-print';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';


const config = {
  apiKey: "AIzaSyDOxWGSZGp0-oXJZ12JOIuKVbjWAO4Rj_s",
  authDomain: "term-system.firebaseapp.com",
  projectId: "term-system",
  storageBucket: "term-system.appspot.com",
  messagingSenderId: "696625806498",
  appId: "1:696625806498:web:bf59f38ab2c8b750056bfb",
  measurementId: "G-MK5F4SSD8T"
};

@NgModule({
  declarations: [
    // Add new components here
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ToolbarComponent,
    UserComponent,
    BookAppointmentComponent,
    DiagnoseVehicleCredentialsComponent,
    DiagnoseVehicleProblemComponent,
    DiagnoseVehicleFindingsComponent,
    RepairHistoryComponent,
    ServiceComponentComponent,
    StaffComponent,
    HowsmyvehicleComponent,
    EmployeeComponent,
    AdminComponent,
    ToolbarstaffComponent,
    AppointmentComponent,
    EditappointmentComponent,
    ToolbaruserComponent,
    ToolbaradminComponent,
    AdminpageComponent,
    SchedulingEmployeesViewComponent,
    SchedulingEmployeesEditComponent,
    TicketViewViewComponent,
    RedirectComponent,
    EditEmployeeComponent,
    DataEmployeesComponent,
    DataTicketsAdminComponent,
    EditTicketComponent,
    RedirectComponent,
    TicketeditComponent,
    EditpermissionsComponent,
    DataPermissionAdminComponent,
    EditPermissionComponent,
    ViewTicketDetailsAdminComponent,
    UserHomePageComponent,
    UserBookAppointmentComponent,
    ConfirmModalComponent,
    UserHowsmyComponent,
    LandingPageComponent,
    LandingToolBarComponent,
    EditAccountStaffComponent,
    EditAccountUserComponent,
    EditTicketStaffComponent,
    TicketIDModalComponent,
    EditTicketAdminComponent,
    EditTicketAdminModalComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    NgxPrintModule,
    NgxMaterialTimepickerModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditEmployeeComponent, EditTicketComponent, EditPermissionComponent, ViewTicketDetailsAdminComponent, ConfirmModalComponent, EditTicketStaffComponent, TicketIDModalComponent, EditTicketAdminModalComponent, DeleteModalComponent]
})
export class AppModule { }
