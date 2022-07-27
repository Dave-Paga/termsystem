import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMSG: string = '';
  fullName: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';

  

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
  }

  // Checks fields if they are filled, if true, registers user
  changeText() {

    
    const permission = 0
    if (this.fullName && this.email && this.phone && this.password) {

      //check if email already exists
      firebase.auth().fetchSignInMethodsForEmail(this.email)
        .then((signInMethods) => {
          //email exists
          if (signInMethods.length) {
            this.errorMSG = "Email is already registered"
          } else {
            // register user
            this.authService.SignUp(this.fullName, this.email, this.phone, this.password, permission);
          }
        }).catch((error) => {
          this.errorMSG = "Please enter valid Email"
        });
    } else {
      this.errorMSG = "Please fill all fields"
    }  
  }

}
