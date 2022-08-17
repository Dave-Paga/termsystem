import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    public afs: AngularFireAuth
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn == true) {
      // let data = this.authService.getUserData(this.authService.userData.uid);
      // data.subscribe((val) => { console.log(val.fullName) });
      // data.subscribe((val) => { console.log(val.permission) });
      this.router.navigate(['redirect']);
      return false;
    }
    return true;

  }
  
}
