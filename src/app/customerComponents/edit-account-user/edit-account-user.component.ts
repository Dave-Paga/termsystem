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
  email!: string;
  fullName!: string;
  phone!: string;
  password!: string;
  oldPassword!: string;
  errorMSG: string = "";
  confirmPass: string = "";
  newPass: string = "";
  auth: any;
  userID!: string;

  constructor(private afs: AngularFirestore, public authService: AuthService, public router: Router) {

    this.afs.collection<any>('users/').valueChanges().subscribe(result => {
      result.forEach(user => {
        if (user.uid == this.authService.userData.uid) {
          this.email = user.email;
          this.fullName = user.fullName;
          this.phone = user.phone;
          this.password = user.password;
          this.userID = user.uid;
          this.oldPassword = user.password;
        }
      })
    });
  }

  ngOnInit(): void {
  }

  apply() {
    if (this.newPass || this.confirmPass) {
      let currentUser = firebase.auth().currentUser;
      const credentials = firebase.auth.EmailAuthProvider.credential(this.email, this.password);

      currentUser?.reauthenticateWithCredential(credentials).then(
        success => {
          if (this.newPass != this.confirmPass) {
            this.errorMSG = "You did not confirm your password correctly."
          } else if (this.newPass.length < 6) {
            this.errorMSG = "Your password should be at least 6 characters long"
          } else {
            currentUser?.updatePassword(this.newPass).then((x) => {
            }).catch((x) => {

            });
          }
        },
        error => {
          console.log(error);
          if (error.code === "auth/wrong-password") {
            this.errorMSG = "Old Password is invalid"
          }
        }
      )
    } else {
      this.afs.collection('users').doc(this.userID).update({
        fullName: this.fullName,
        phone: this.phone
      }).then(success => {
        this.errorMSG = "Name and phone number successfully changed."
      }).catch((err)=> {
        this.errorMSG = "Could not change name and phone number."
      });
    }

    if(this.oldPassword == this.password && this.newPass == this.confirmPass) {
      this.afs.collection('users').doc(this.userID).update({
        fullName: this.fullName,
        phone: this.phone,
        password: this.newPass
      }).then(success => {
        this.errorMSG = "Change password successful!"
      }).catch((err) => {
        this.errorMSG = "Change password unsuccessful!"
      });

    }
  }

  

  test() {
    let currentUser = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(this.email, this.password);

    currentUser?.reauthenticateWithCredential(credentials).then(
      success => {
        if (this.newPass != this.confirmPass) {
          this.errorMSG = "You did not confirm your password correctly."
        } else if (this.newPass.length < 6) {
          this.errorMSG = "Your password should be at least 6 characters long"
        } else {
          currentUser?.updatePassword(this.newPass).then( (x) => {
            this.errorMSG = "Change password successful!"
          }).catch((x) => {
            this.errorMSG = "Change password unsuccessful!"
          });
        }
      },
      error => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          this.errorMSG = "Old Password is invalid"
        }
      }
    )
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
