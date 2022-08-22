import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-howsmy',
  templateUrl: './user-howsmy.component.html',
  styleUrls: ['./user-howsmy.component.css']
})
export class UserHowsmyComponent implements OnInit {
  ticketID!: string;
  carName!: string;
  customerEmail!: string;
  customerName!: string;
  customerPhone!: string;
  employeeID!: string;
  date: any;
  time: any;
  fuelType!: string;
  mechanicName!: string;
  price!: number;
  problem!: string;
  solution!: string;
  transmission!: string;
  status!: string;

  timeframes = [
    { value: 7, viewValue: "7:00 AM" },
    { value: 8, viewValue: "8:00 AM" },
    { value: 9, viewValue: "9:00 AM" },
    { value: 10, viewValue: "10:00 AM" },
    { value: 11, viewValue: "11:00 AM" },
    { value: 12, viewValue: "12:00 NN" },
    { value: 13, viewValue: "1:00 PM" },
    { value: 14, viewValue: "2:00 PM" },
    { value: 15, viewValue: "3:00 PM" },
    { value: 16, viewValue: "4:00 PM" },
    { value: 17, viewValue: "5:00 PM" },
  ];

  map = new Map<string, number>();
  progressValue!: any;


  constructor(private afs: AngularFirestore, public router: Router, public authService: AuthService) {
    
    this.map.set("Pending Inquiry", 10);
    this.map.set("Pending Diagnosis", 20);
    this.map.set("Undergoing Diagnosis", 40);
    this.map.set("Undergoing Repair/Maintenance",50);
    this.map.set("Pending Payment",80);
    this.map.set("For Release",100);

      



    this.afs.collection<any>('users/').valueChanges().subscribe(result => {
      result.forEach(user => {
        if (user.uid == this.authService.userData.uid) {
          this.customerEmail = user.email;
          this.customerName = user.fullName;
          this.customerPhone = user.phone;
        }
      })
    })

    this.afs.collection<any>("tickets/").valueChanges().subscribe( result => {
      let getFirst = result.filter((x) => x.customerEmail == this.customerEmail);

      this.ticketID = getFirst[0].ticketID;
      this.carName = getFirst[0].carName;
      this.employeeID = getFirst[0].employeeID;
      this.date = getFirst[0].date;
      this.time = getFirst[0].time;
      this.fuelType = getFirst[0].fuelType;
      this.mechanicName = getFirst[0].mechanicName;
      this.price = getFirst[0].price;
      this.problem = getFirst[0].problem;
      this.solution = getFirst[0].solution;
      this.transmission = getFirst[0].transmission;
      this.status = getFirst[0].status;
      const realTime = this.timeframes[this.time -7];
      this.time = realTime.viewValue;
      this.progressValue = this.map.get(this.status);

    })
    
  }

  ngOnInit(): void {
    this.loginCheck()
  }

  loginCheck() {
    this.authService.getPermission(this.authService.userData.uid).then(res => {
      if (res != 0) {
        this.router.navigate(['redirect']);
      }
    });
  }

}
