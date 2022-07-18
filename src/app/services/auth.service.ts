import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument 
} from '@angular/fire/compat/firestore';

import { User } from './users.model';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SignatureAllModule } from '@syncfusion/ej2-angular-inputs';
import { resolve } from 'dns';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  errorMSG: string = '';
  private fireUser: any;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    
  }



  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['user']);
        });

        
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
        this.errorMSG = error.message;
      });
  }

  // Sign up with email/password
  SignUp(fName: string, mail: string, cellP: string, pass: string, perm: number) {
    return this.afAuth
      .createUserWithEmailAndPassword(mail, pass)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        const currentUser: User = {
          uid: result.user!.uid,
          fullName: fName,
          email: mail,
          password: pass,
          phone: cellP,
          permission: perm
        }
        this.SetUserData(currentUser);
      })
      .catch((error) => {
        window.alert(error.message);
        this.errorMSG = "Please enter valid Email"
      });
  }


  // Check if user already exists during sign up
  // CheckIfExisting(fullName: string, email: string, phone: string, pass: string, permission: number) {
  //   firebase.auth().fetchSignInMethodsForEmail(email)
  //     .then( (signInMethods) => {
  //       //email exists
  //       if (signInMethods.length) {
  //         return 1
  //       } else {
  //         this.SignUp(fullName, email, phone, pass, permission);
  //         return 0
  //       }
  //     })
  // }

  // ---------------- OPTIONAL FEATURES --------------------------//
  // // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser
  //     .then((u: any) => u.sendEmailVerification())
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     });
  // }
  // // Reset Forggot password
  // ForgotPassword(passwordResetEmail: string) {
  //   return this.afAuth
  //     .sendPasswordResetEmail(passwordResetEmail)
  //     .then(() => {
  //       window.alert('Password reset email sent, check your inbox.');
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null
  }

  setUser(user) {
    this.fireUser = user;
  }

  getAuthenticated(): Observable<any> {
    return this.afAuth.user;
  }

  get uid(): string {
    const user = this.userData;
    return user.uid
  }

  get error(): string {
    return this.errorMSG;
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */

  getUserData(id: any): Observable<User> {
    const users: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${id}`);
    return users.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }

  SetUserData(user: any) {
    let userData: User = {
      uid: user.uid,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      phone: user.phone,
      permission: user.permission
    };


    let data = this.getUserData(user.uid);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`);
    firebase.auth().fetchSignInMethodsForEmail(user.email)
      .then((signInMethods) => {
        //email exists
        if (signInMethods.length) {
          let subscription = data.subscribe((val) => { userData.uid = val.uid,
            userData.fullName = val.fullName,
            userData.email = val.email,
            userData.password = val.password,
            userData.phone = val.phone,
            userData.permission = val.permission});
          this.finalizeSet(userRef, userData);
          subscription.unsubscribe();
        } 
      }).catch((error) => {
        this.errorMSG = "Please enter valid Email"
      });

    


    // return userRef.set(userData, {
    //   merge: true,
    // });
    
  }

  finalizeSet(userRef: any, userData: any){
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
