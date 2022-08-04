import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.redirect();
  }

  logOut() {
    this.authService.SignOut()
  }

  redirect() {
    let data = this.authService.getUserData(this.authService.userData.uid);
    let perm;
    data.subscribe(val => { 
      perm = val.permission;
      if (perm == 0) {
        this.router.navigate(['user']);
      } else if (perm == 1) {
        this.router.navigate(['staff']);
      } else if (perm == 2) {
        this.router.navigate(['adminpage']);
      }
    });
  }
}
