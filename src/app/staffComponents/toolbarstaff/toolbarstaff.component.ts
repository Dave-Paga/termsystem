import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbarstaff',
  templateUrl: './toolbarstaff.component.html',
  styleUrls: ['./toolbarstaff.component.css']
})
export class ToolbarstaffComponent implements OnInit {
  appBadge: number = 0;
  appBadgeHide: boolean = false;
  curBadge: number = 0;
  curBadgeHide: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private afs: AngularFirestore
  ) {

    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      let arr = data;
      arr = arr.filter((x) => x.employeeQ.includes(this.authService.currentUserId));
      let arr1 = arr.filter((x) => x.curMech == "None");
      let arr2 = arr.filter((x) => x.curMech == this.authService.currentUserId);

      this.appBadge = arr1.length;
      this.curBadge = arr2.length;

      if (this.appBadge == 0) {
        this.appBadgeHide = true;
      }

      if (this.curBadge == 0) {
        this.curBadgeHide = true;
      }
    })
  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.SignOut()
  }

}
