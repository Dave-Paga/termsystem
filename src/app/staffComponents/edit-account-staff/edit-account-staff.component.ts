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
  selector: 'edit-account-staff',
  templateUrl: './edit-account-staff.component.html',
  styleUrls: ['./edit-account-staff.component.css']
})
export class EditAccountStaffComponent implements OnInit {
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
  tickets: any;
  editPass: boolean = true;
  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    public router: Router
  ) {

    this.afs.collection<any>('users/').valueChanges().subscribe(result => {
      result.forEach(user => {
        if (user.uid == this.authService.userData.uid) {
          this.email = user.email;
          this.fullName = user.fullName;
          this.phone = user.phone;
          // this.password = user.password;
          this.userID = user.uid;
          this.oldPassword = user.password;
        }
      })
    });


    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      let arr = data
      arr = arr.filter((x) => x.employeeID == this.userID);
      this.tickets = arr
    })
  }

  updateDetails() {
    this.afs.collection('users').doc(this.userID).update({
      fullName: this.fullName,
      phone: this.phone
    }).then(success => {
      this.errorMSG = "Name and phone number successfully changed."
    }).catch((err) => {
      this.errorMSG = "Could not change name and phone number."
    });
    this.updateData();
  }

  updatePass() {
    if (this.password && this.password == this.oldPassword) {
      if (this.newPass == this.confirmPass && this.newPass && this.confirmPass) {
        if (this.confirmPass.length >= 6) {
          let currentUser = firebase.auth().currentUser;
          const credentials = firebase.auth.EmailAuthProvider.credential(this.email, this.password);
          currentUser?.reauthenticateWithCredential(credentials).then(
            success => {
              currentUser?.updatePassword(this.newPass).then((x) => {
                this.afs.collection('users').doc(this.userID).update({
                  password: this.newPass
                }).then(success => {
                  this.errorMSG = "Password successfully changed";
                  this.password = "";
                  this.newPass = "";
                  this.confirmPass = "";
                })
              }).catch((x) => {
                this.errorMSG = x
              });
            },
            error => {
              console.log(error);
              if (error.code === "auth/wrong-password") {
                this.errorMSG = "Old Password is invalid"
              }
            }
          )
        } else {
          this.errorMSG = "Your password should be at least 6 characters long"
        }
      } else {
        this.errorMSG = "You did not confirm your password correctly."
      }
    } else {
      this.errorMSG = "Please input correct old password."
    }
  }

  updateData(): void {
    this.tickets.forEach((ticket) => {
      this.afs.collection('tickets').doc(ticket.ticketID).update({
        mechanicName: this.fullName,
      })
    })
  }


  change(num: number) {
    this.errorMSG = "";
    if (num == 1) {
      this.editPass = false;
    } else {
      this.editPass = true;
      this.password = "";
      this.newPass = "";
      this.confirmPass = "";
    }
  }

  ngOnInit(): void {
    this.loginCheck();
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
