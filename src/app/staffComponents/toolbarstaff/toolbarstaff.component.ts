import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbarstaff',
  templateUrl: './toolbarstaff.component.html',
  styleUrls: ['./toolbarstaff.component.css']
})
export class ToolbarstaffComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.SignOut()
  }

}
