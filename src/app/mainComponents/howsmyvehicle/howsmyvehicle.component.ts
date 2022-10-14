import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-howsmyvehicle',
  templateUrl: './howsmyvehicle.component.html',
  styleUrls: ['./howsmyvehicle.component.css']
})
export class HowsmyvehicleComponent implements OnInit {
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
  errorMSG: string = '';
  hideResult: boolean = false;

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
    this.map.set("Pending Inquiry", 25);
    this.map.set("Undergoing Repair/Maintenance", 50);
    this.map.set("Pending Payment", 75);
    this.map.set("For Release", 100);
  }

  ngOnInit(): void {
  }

  search() {

    this.afs.collection<any>("tickets/").valueChanges().subscribe(result => {
      let getTicket = result.filter((x) => x.ticketID == this.ticketID);

      if (getTicket.length) {
        this.errorMSG = "Ticket found!"
        this.hideResult = true;
        this.customerName = getTicket[0].customerName;
        this.customerPhone = getTicket[0].customerPhone;
        this.customerEmail = getTicket[0].customerEmail;
        this.ticketID = getTicket[0].ticketID;
        this.carName = getTicket[0].carName;
        this.employeeID = getTicket[0].employeeID;
        this.date = getTicket[0].date;
        this.time = getTicket[0].time;
        this.fuelType = getTicket[0].fuelType;
        this.mechanicName = getTicket[0].mechanicName;
        this.price = getTicket[0].price;
        this.problem = getTicket[0].problem;
        this.solution = getTicket[0].solution;
        this.transmission = getTicket[0].transmission;
        this.status = getTicket[0].status;
        
        const realTime = this.timeframes[this.time - 7];
        this.time = realTime.viewValue;
        this.progressValue = this.map.get(this.status);
      } else {
        this.errorMSG = "Could not find ticket!"
      }

    })
  }

}
