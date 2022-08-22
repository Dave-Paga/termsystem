import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'edit-account-staff',
  templateUrl: './edit-account-staff.component.html',
  styleUrls: ['./edit-account-staff.component.css']
})
export class EditAccountStaffComponent implements OnInit {

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loginCheck()
  }

  loginCheck() {
    this.authService.getPermission(this.authService.userData.uid).then(res => {
      if (res != 1) {
        this.router.navigate(['redirect']);
      } else {
        console.log(this.authService.userData.uid);
      }
    });
  }

}
