import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduling-employees-view',
  templateUrl: './scheduling-employees-view.component.html',
  styleUrls: ['./scheduling-employees-view.component.css']
})
export class SchedulingEmployeesViewComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loginCheck()
  }

  loginCheck() {
    this.authService.getPermission(this.authService.userData.uid).then(res => {
      if (res != 2) {
        this.router.navigate(['redirect']);
      }
    });
  }


}
