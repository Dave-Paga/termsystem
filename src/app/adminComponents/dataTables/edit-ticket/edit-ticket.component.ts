import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface employee {
  name: string;
  id: string;
  schedule: number[];
  dateVal?: number;
}

interface valVar {
  value: any;
  viewValue: string;
}

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  carName: string = '';
  date: FormControl;
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

  timeArray: valVar[] = [];

  employees: employee[] = [];
  statusArray: valVar[] = [
    { value: "Pending Inquiry", viewValue: 'Pending Inquiry'},
    { value: "Pending Diagnosis", viewValue: 'Pending Diagnosis'},
    { value: "Undergoing Diagnosis", viewValue: 'Undergoing Diagnosis' },
    { value: "Undergoing Repair/Maintenance", viewValue: 'Undergoing Repair/Maintenance' },
    { value: "Pending Payment", viewValue: 'Pending Payment'},
    { value: "For Release", viewValue: 'For Release'}
  ];
  
  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) {
    
    this.ticketID = data.ticketID;
    this.carName = data.carName;
    this.date = new FormControl(new Date(data.date));
    this.time = data.time;
    this.employeeID = data.employeeID;
    this.fuelType = data.fuelType;
    this.mechanicName = data.mechanicName;
    this.price = data.price;
    this.problem = data.problem;
    this.solution = data.solution;
    this.status = data.status;
    this.transmission = data.transmission;

    this.afs.collection<any>('users').valueChanges().subscribe(result => {
      result.forEach(doc =>{
        if(doc.permission == 1) {
          let rawTime = doc.timeframe.replace(/pm|am/g,'');
          let convertedArr = rawTime.split(' - ', 2).map(Number);

          let rawDate = doc.days.slice(-3);
          let convDate;
          
          if (rawDate == "Fri") {
            convDate = 0;
          } else if (rawDate == "Sat") {
            convDate = 6;
          }

          let obj = { 
            name: doc.fullName, 
            id: doc.uid, 
            schedule: convertedArr,
            dateVal: convDate
          };
          
          this.employees.push(obj);

          if (doc.uid == this.employeeID) {
            this.unvailDate = convDate;
            let start = convertedArr[0] - 7;
            let end = (convertedArr[1] + 12)-7;
            for (let i = start; i < end; i++) {
              this.timeArray.push({ value: this.timeframes[i].value, viewValue: this.timeframes[i].viewValue});
            }
          }
        }
      });
    })


  }

  ngOnInit(): void {
  }

  test() {
    let selection = this.employees.find(data => data.id == this.employeeID);
    this.mechanicName = selection?.name;
    let seeStatus = this.statusArray.find(data => data.value == this.status);
    let pipe = new DatePipe('en-us');
    console.log(this.date.value.toLocaleDateString());
    console.log(this.time);
  }

  weekendsDatesFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    return day !== this.unvailDate && day !== 0;
  }

  changeTimeArray() {
    let currentTimeArr = this.employees.find(x => x.id == this.employeeID)?.schedule!;
    let currentDate = this.employees.find(x => x.id == this.employeeID)?.dateVal!;
    this.unvailDate = currentDate;
    this.timeArray = [];
    let start = currentTimeArr[0] - 7;
    let end = (currentTimeArr[1] + 12) - 7;
    for (let i = start; i < end; i++) {
      this.timeArray.push({ value: this.timeframes[i].value, viewValue: this.timeframes[i].viewValue });
    }
  }

  changed() {
    console.log(this.carName)
  }
  
  updateData(): void {
    let selection = this.employees.find(data => data.id == this.employeeID);
    this.mechanicName = selection?.name;
    this.afs.collection('tickets').doc(String(this.ticketID)).update({
      carName: this.carName,
      date: this.date.value.toLocaleDateString(),
      time: this.time,
      employeeID: this.employeeID,
      fuelType: this.fuelType,
      mechanicName: this.mechanicName,
      price: this.price,
      problem: this.problem,
      solution: this.solution,
      status: this.status,
      transmission: this.transmission
    })
    console.log(this.carName);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
