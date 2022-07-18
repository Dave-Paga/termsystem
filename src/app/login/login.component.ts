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
  errorMSG: any;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  checkLogin() {
    if (this.email && this.password) {
      this.authService.SignIn(this.email, this.password)
        .then(() => this.login());
      this.errorMSG = this.authService.error;

      //check if email exists
      // firebase.auth().fetchSignInMethodsForEmail(this.email)
      //   .then((signInMethods) => {
      //     //email exists
      //     if (signInMethods.length) {
      //       //sign in
      //       this.authService.SignIn(this.email, this.password)
      //       this.errorMSG = this.authService.error;
      //     } else {
      //       this.errorMSG = "Email or password is not recognized"
      //     }
      //   }).catch((error) => {
      //     this.errorMSG = "Please enter valid Email"
      //   });
    } else {
      this.errorMSG = "Please fill all fields"
      this.errorMSG = this.authService.error;
    }
  }

  login() {
    let data = this.authService.getUserData(this.authService.userData.uid);
    let perm;
    data.subscribe((val) => { console.log(val.fullName) });
    data.subscribe((val) => { perm = val.permission });

    if (perm == 0) {
      this.router.navigate(['user']);
    } else if (perm == 1) {
      this.router.navigate(['employee']);
    } else {
      this.router.navigate(['admin']);
    }
  }

  checkUser() {
    if (this.authService.isLoggedIn == true) {
      this.login();
    } else {

      console.log("No user detected")
    }
  }

}
