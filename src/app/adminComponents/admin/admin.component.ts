import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  logOut() {
    this.authService.SignOut();
  }

  ngOnInit(): void {
    this.loginCheck()
  }

  loginCheck() {
    this.authService.getPermission(this.authService.userData.uid).then(res => 
      { 
        if (res != 2) {
          this.router.navigate(['redirect']);
        }
      });
  }

}
