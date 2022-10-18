import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-ticket-details-admin',
  templateUrl: './view-ticket-details-admin.component.html',
  styleUrls: ['./view-ticket-details-admin.component.css']
})
export class ViewTicketDetailsAdminComponent implements OnInit {

  ticketID: string;
  carName: string;
  plate: string;
  vin: string;
  engine: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  employeeID: string;
  date: any;
  time: any;
  fuelType: string;
  mechanicName: string;
  price: number;
  problem: string;
  start: any;
  estimate: string;
  service: string;
  jobs: any[];
  transmission: string;
  recommend: string; 
  status: string;
  form: FormGroup;

  hide: boolean = true;

  timeframes = [
    { value: 7, viewValue: "7:00 AM" },
    { value: 8, viewValue: "8:00 AM"},
    { value: 9, viewValue: "9:00 AM"},
    { value: 10, viewValue: "10:00 AM"},
    { value: 11, viewValue: "11:00 AM"},
    { value: 12, viewValue: "12:00 NN"},
    { value: 13, viewValue: "1:00 PM"},
    { value: 14, viewValue: "2:00 PM"},
    { value: 15, viewValue: "3:00 PM"},
    { value: 16, viewValue: "4:00 PM"},
    { value: 17, viewValue: "5:00 PM"},
  ];
  

  constructor(private afs: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewTicketDetailsAdminComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) {
    this.ticketID = data.ticketID;
    this.carName = data.carName;
    this.plate = data.plate;
    this.vin = data.vin;
    this.engine = data.engine;
    this.customerEmail = data.customerEmail;
    this.customerName = data.customerName;
    this.customerPhone = data.customerPhone;
    this.employeeID = data.employeeID;
    this.date = data.date;
    this.time = data.time;
    this.recommend = data.recommend
    this.start = data.start;
    this.fuelType = data.fuelType;
    this.mechanicName = data.mechanicName;
    this.price = data.price;
    this.problem = data.problem;
    this.service = data.service;
    this.estimate = data.estimate;
    this.jobs = [data.jobs];
    this.transmission = data.transmission;
    this.status = data.status;
    let pipe = new DatePipe('en-us');
    this.date = pipe.transform(this.date, 'mediumDate');

    const realTime = this.timeframes[this.time -7];
    this.time = realTime.viewValue;
    const realTime2 = this.timeframes[this.start-7];

    if (this.start) {
      this.start = realTime2.viewValue;
    } else {
      this.hide = false;
    }

    this.form = this.fb.group({
      ticketID: [this.ticketID],
      carName: [this.carName],
      customerEmail: [this.customerEmail],
      customerName: [this.customerName],
      customerPhone: [this.customerPhone],
      employeeID: [this.employeeID],
      date: [pipe.transform(this.date, 'mediumDate')],
      time: [this.time],
      fuelType: [this.fuelType],
      mechanicName: [this.mechanicName],
      price: [this.price],
      problem: [this.problem],
      service: [this.service],
      transmission: [this.transmission],
      status: [this.status]
    });
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
