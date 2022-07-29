import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarstaffComponent } from './toolbarstaff/toolbarstaff.component';
import { ToolbaruserComponent } from './toolbaruser/toolbaruser.component';

import { AuthService } from './services/auth.service';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { DiagnoseVehicleCredentialsComponent } from './diagnose-vehicle-credentials/diagnose-vehicle-credentials.component';
import { DiagnoseVehicleProblemComponent } from './diagnose-vehicle-problem/diagnose-vehicle-problem.component';
import { DiagnoseVehicleFindingsComponent } from './diagnose-vehicle-findings/diagnose-vehicle-findings.component';
import { RepairHistoryComponent } from './repair-history/repair-history.component';
import { ServiceComponentComponent } from './service-component/service-component.component';
import { StaffComponent } from './staff/staff.component';
import { HowsmyvehicleComponent } from './howsmyvehicle/howsmyvehicle.component';
import { EmployeeComponent } from './employee/employee.component';
import { AdminComponent } from './admin/admin.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { EditappointmentComponent } from './editappointment/editappointment.component';
import { ToolbaradminComponent } from './toolbaradmin/toolbaradmin.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { SchedulingEmployeesViewComponent } from './scheduling-employees-view/scheduling-employees-view.component';
import { SchedulingEmployeesEditComponent } from './scheduling-employees-edit/scheduling-employees-edit.component';
import { TicketViewViewComponent } from './ticket-view-view/ticket-view-view.component';
import { RedirectComponent } from './redirect/redirect.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DataEmployeesComponent } from './data-employees/data-employees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataTicketsAdminComponent } from './data-tickets-admin/data-tickets-admin.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';


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
    EditTicketComponent
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditEmployeeComponent, EditTicketComponent]
})
export class AppModule { }
