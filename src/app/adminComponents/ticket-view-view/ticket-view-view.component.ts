import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-view-view',
  templateUrl: './ticket-view-view.component.html',
  styleUrls: ['./ticket-view-view.component.css']
})
export class TicketViewViewComponent implements OnInit {

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
