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
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  employeeID: string;
  date: any;
  time: string;
  fuelType: string;
  mechanicName: string;
  price: number;
  problem: string;
  solution: string;
  transmission: string;
  status: string;
  form: FormGroup;

  constructor(private afs: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewTicketDetailsAdminComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) {
    this.ticketID = data.ticketID;
    this.carName = data.carName;
    this.customerEmail = data.customerEmail;
    this.customerName = data.customerName;
    this.customerPhone = data.customerPhone;
    this.employeeID = data.employeeID;
    this.date = data.date;
    this.time = data.time;
    this.fuelType = data.fuelType;
    this.mechanicName = data.mechanicName;
    this.price = data.price;
    this.problem = data.problem;
    this.solution = data.solution;
    this.transmission = data.transmission;
    this.status = data.status;
    let pipe = new DatePipe('en-us');
    console.log(pipe.transform(this.date, 'mediumDate'))
    this.date = pipe.transform(this.date, 'mediumDate');

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
      solution: [this.solution],
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
