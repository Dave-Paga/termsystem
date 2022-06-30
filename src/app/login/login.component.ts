import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMSG: string = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  checkLogin() {
    if (this.email && this.password) {
      //check if email exists
      firebase.auth().fetchSignInMethodsForEmail(this.email)
        .then((signInMethods) => {
          //email exists
          if (signInMethods.length) {
            //sign in
            this.authService.SignIn(this.email, this.password);
            this.router.navigate(['/user']);
          } else {
            this.errorMSG = "Email or password is not recognized"
          }
        }).catch((error) => {
          this.errorMSG = "Please enter valid Email"
        });
    } else {
      this.errorMSG = "Please fill all fields"
    }
  }

}
