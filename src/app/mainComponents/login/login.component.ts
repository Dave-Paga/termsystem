import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { AuthService } from '../../services/auth.service';
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
    this.errorMSG = '';
  }

  checkLogin() {
    if (this.email && this.password) {
      this.authService.SignIn(this.email, this.password)
      this.errorMSG = this.authService.error;

    } else {
      this.errorMSG = "Please fill all fields"
      this.errorMSG = this.authService.error;
    }
  }


  checkUser() {
    if (this.authService.isLoggedIn == true) {

    } else {
      console.log("No user detected")
    }
  }

}
