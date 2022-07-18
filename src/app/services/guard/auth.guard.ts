import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    public afs: AngularFireAuth
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    // if (this.authService.isLoggedIn == false) {
    //   this.router.navigate(['/']);
    //   return false;
    // }
    // return true;


    return this.authService.getAuthenticated().pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['']);
        }

        this.authService.setUser(user);

        return user ? true : false;
      })
    )

  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  // {
  //   return this.authService.isLoggedIn()

  //   this.router.navigate(['/']);
  //   return false;
  // }
  
}
