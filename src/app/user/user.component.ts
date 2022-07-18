import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.authService.userData);
    this.testComponent();
  }

  logOut() {
    this.authService.SignOut()
  }

  testComponent() {
    let data = this.authService.getUserData(this.authService.userData.uid);
    data.subscribe((val) => { console.log(val.fullName)});
  }

}
