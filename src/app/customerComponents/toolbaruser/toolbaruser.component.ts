import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbaruser',
  templateUrl: './toolbaruser.component.html',
  styleUrls: ['./toolbaruser.component.css']
})
export class ToolbaruserComponent implements OnInit {

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
