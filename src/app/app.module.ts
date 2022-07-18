import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { AuthService } from './services/auth.service';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { EmployeeComponent } from './employee/employee.component';
import { AdminComponent } from './admin/admin.component';
import { RedirectComponent } from './redirect/redirect.component';

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
    EmployeeComponent,
    AdminComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
