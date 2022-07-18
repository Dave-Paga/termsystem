import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
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

  ngOnInit(): void {
    this.testComponent()
  }

  logOut() {
    this.authService.SignOut();
  }

  testComponent() {
    let data = this.authService.getUserData(this.authService.userData.uid);
    data.subscribe((val) => { console.log(val.fullName) });
    data.subscribe((val) => { console.log(val.permission) });
  }

}
