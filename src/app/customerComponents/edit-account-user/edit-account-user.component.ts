import { Component, Inject, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-account-user',
  templateUrl: './edit-account-user.component.html',
  styleUrls: ['./edit-account-user.component.css']
})
export class EditAccountUserComponent implements OnInit {

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
      if (res != 0) {
        this.router.navigate(['redirect']);
      } else {
        console.log(this.authService.userData.uid);
      }
    });
  }

}
