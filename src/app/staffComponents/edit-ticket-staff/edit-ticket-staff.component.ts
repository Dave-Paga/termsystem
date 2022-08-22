import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface valVar {
  value: any;
  viewValue: string;
}

@Component({
  selector: 'app-edit-ticket-staff',
  templateUrl: './edit-ticket-staff.component.html',
  styleUrls: ['./edit-ticket-staff.component.css']
})

export class EditTicketStaffComponent implements OnInit {
  carName: string = '';
  employeeID: string = '';
  fuelType: string = '';
  mechanicName?: string = '';
  price: number = 0;
  problem: string = '';
  solution: string = '';
  status: string = '';
  transmission: string = '';
  ticketID: string = '';
  time: string = '';
  unvailDate: number = 0;

  statusArray: valVar[] = [
    { value: "Pending Inquiry", viewValue: 'Pending Inquiry' },
    { value: "Pending Diagnosis", viewValue: 'Pending Diagnosis' },
    { value: "Undergoing Diagnosis", viewValue: 'Undergoing Diagnosis' },
    { value: "Undergoing Repair/Maintenance", viewValue: 'Undergoing Repair/Maintenance' },
    { value: "Pending Payment", viewValue: 'Pending Payment' },
    { value: "For Release", viewValue: 'For Release' }
  ];

  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditTicketStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.ticketID = data.ticketID;
    this.carName = data.carName;
    this.time = data.time;
    this.employeeID = data.employeeID;
    this.fuelType = data.fuelType;
    this.mechanicName = data.mechanicName;
    this.price = data.price;
    this.problem = data.problem;
    this.solution = data.solution;
    this.status = data.status;
    this.transmission = data.transmission;
  }

  updateData(): void {
    this.afs.collection('tickets').doc(this.ticketID).update({
      carName: this.carName,
      fuelType: this.fuelType,
      price: this.price,
      problem: this.problem,
      solution: this.solution,
      status: this.status,
      transmission: this.transmission
    })
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
