import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbaradmin',
  templateUrl: './toolbaradmin.component.html',
  styleUrls: ['./toolbaradmin.component.css']
})
export class ToolbaradminComponent implements OnInit {

  constructor(public authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.SignOut()
  }

}
