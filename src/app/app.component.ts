import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TERMhome';
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }
}
