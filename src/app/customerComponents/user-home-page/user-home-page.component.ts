import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {
  customerEmail!: string;
  customerName!: string;
  customerPhone!: string;
  ticketArray: any;

  timeframes = {
    7: "7:00 AM",
    8: "8:00 AM",
    9: "9:00 AM",
    10: "10:00 AM",
    11: "11:00 AM",
    12: "12:00 NN",
    13: "1:00 PM",
    14: "2:00 PM",
    15: "3:00 PM",
    16: "4:00 PM",
    17: "5:00 PM",
  }

  constructor(private afs: AngularFirestore, public router: Router, public authService: AuthService) {
    this.afs.collection<any>('users/').valueChanges().subscribe(result => {
      result.forEach(user => {
        if (user.uid == this.authService.userData.uid) {
          this.customerEmail = user.email;
          this.customerName = user.fullName;
          this.customerPhone = user.phone;
        }
      })
    })

    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      let arr = data
      arr.forEach((value, index) => {
        let converted = this.timeframes[arr[index].time];
        arr[index].convTime = converted;
      });

      arr = arr.filter((x) => x.customerEmail == this.customerEmail);
      
      // Ticket object array
      this.ticketArray = arr

    })
  }

  ngOnInit(): void {
  }

}
