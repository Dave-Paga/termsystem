import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AuthService } from '../../services/auth.service';
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
  confirmPass: string = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.errorMSG = this.authService.errorMSG
  }
  ngOnInit() {
  }

  // Checks fields if they are filled, if true, registers user
  changeText() {

    
    const permission = 0
    if (this.fullName && this.email && this.phone && this.password) {
      if (this.password == this.confirmPass) {
        //check if email already exists
        firebase.auth().fetchSignInMethodsForEmail(this.email)
          .then((signInMethods) => {
            //email exists
            if (signInMethods.length) {
              this.errorMSG = "Email is already registered"
            } else {
              // register user
              this.authService.SignUp(this.fullName, this.email, this.phone, this.password, permission);
              console.log(this.authService.errorMSG);
            }
          }).catch((error) => {
            this.errorMSG = "Please enter valid Email"
          });
      } else {
        this.errorMSG = "Passwords do not match"
      }
      
    } else {
      this.errorMSG = "Please fill all fields"
    }  
  }

}
