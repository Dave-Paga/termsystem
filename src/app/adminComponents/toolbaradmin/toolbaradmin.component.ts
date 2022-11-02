import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbaradmin',
  templateUrl: './toolbaradmin.component.html',
  styleUrls: ['./toolbaradmin.component.css']
})
export class ToolbaradminComponent implements OnInit {
  appBadge: number = 0;
  appBadgeHide: boolean = false;
  curBadge: number = 0;
  curBadgeHide: boolean = false;

  constructor(private afs: AngularFirestore, public authService: AuthService,
    public router: Router) {
    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      let arr = data;
      let arr1 = arr.filter(x => x.mechanicName == "No Mechanic");
      let arr2 = arr.filter(x => x.status == "Undergoing Repair/Maintenance")
      this.appBadge = arr1.length;
      this.curBadge = arr2.length;

      if(this.appBadge == 0) {
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
