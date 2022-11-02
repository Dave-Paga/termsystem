import { arrayUnion } from '@angular/fire/firestore'
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface valVar {
  value: any;
  viewValue: string;
}


interface employee {
  name: string;
  id: string;
  schedule: number[];
  dateVal?: number;
}

interface val {
  value: any;
}

@Component({
  selector: 'app-edit-ticket-admin-modal',
  templateUrl: './edit-ticket-admin-modal.component.html',
  styleUrls: ['./edit-ticket-admin-modal.component.css']
})
export class EditTicketAdminModalComponent implements OnInit {
  carName: string = '';
  engine: string = '';
  vin: string = '';
  plate: string = '';
  employeeID: string = '';
  fuelType: string = '';
  mechanicName?: string = '';
  price: number = 0;
  problem: string = '';
  solution: string = '';
  status: string = '';
  oldStatus: string = '';
  transmission: string = '';
  service: string = '';
  jobs: string = '';
  recommendation: string = '';
  start: string = '';
  ticketID: string = '';
  time: string = '';
  unvailDate: number = 0;
  minDate: Date;
  estimate: FormControl;
  recommend: string = '';
  completed: string = '';

  
  employees: employee[] = [];
  statusArray: valVar[] = [
    { value: "Undergoing Repair/Maintenance", viewValue: 'Undergoing Repair/Maintenance' },
    { value: "For Release", viewValue: 'For Release' },
    { value: "Completed", viewValue: 'Completed' }
  ];

  // serviceArray: valVar[] = [
  //   { value: "Regular PMS", viewValue: 'Regular PMS' },
  //   { value: "Minor PMS", viewValue: 'Minor PMS' },
  //   { value: "Major PMS", viewValue: 'Major PMS' },
  //   { value: "Troubleshooting", viewValue: 'Troubleshooting' },
  //   { value: "General Repair", viewValue: 'General Repair' },
  //   { value: "Detailing", viewValue: 'Detailing' }
  // ];

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
    { value: 18, viewValue: "6:00 PM"},
    { value: 19, viewValue: "7:00 PM" },
    { value: 20, viewValue: "8:00 PM" },
    { value: 21, viewValue: "9:00 PM" },
    { value: 22, viewValue: "10:00 PM" },
    { value: 23, viewValue: "11:00 PM" }
  ];

  serviceArray: valVar[] = [
    { value: "Check Brakes (1 hour)", viewValue: 'Check Brakes (1 hour)' },
    { value: "Regular PMS (2 hours)", viewValue: 'Regular PMS (2 hours)' },
    { value: "Minor PMS (3 hours)", viewValue: 'Minor PMS (3 hours)' },
    { value: "Major PMS (5 hours)", viewValue: 'Major PMS (5 hours)' },
    { value: "Minor Troubleshooting (3 hours)", viewValue: 'Minor Troubleshooting (3 hours)' },
    { value: "Major Troubleshooting (5 hours)", viewValue: 'Major Troubleshooting (5 hours)' }
  ];

  checkBrakes: val[] = [
    { value: "Check and Clean Brakes"}
  ];

  regularPMS: val[] = [
    { value: "Change Oil"},
    { value: "Check and Clean Brakes" }
  ];

  minorPMS: val[] = [
    { value: "Change Oil" },
    { value: "Replace Fuel Filter" },
    { value: "Clean Air Filter"},
    { value: "Check and Clean Brakes"},
  ];

  majorPMS: val[] =[
    { value: "Change Oil" },
    { value: "Replace Fuel Filter" },
    { value: "Clean Air Filter" },
    { value: "Check and Clean Brakes" },
    { value: "Change All Fluids" },
    { value: "Regrease All Fittings" },
    { value: "Repack Wheel Bearings" },
    { value: "Replace Necessary Worn Parts" },
    { value: "Check All Bulbs" },
    { value: "Check Suspensions" },
    { value: "Replace Necessary Brake Pads" },
  ];

  troubleshooting: val[] = [
    { value: "Check Electrical" },
    { value: "Check Fuel Line" },
    { value: "Check Engine Management" },
    { value: "Use Diagnostic Tools" },
    { value: "Check Suspension" },
    { value: "Check Transmission" },
    { value: "Check Brakes" },
    { value: "Check Sensors" },
    { value: "Check Tires" },
    { value: "Check Aircon Servicing" },
    { value: "Repair for Dents" },
    { value: "Body Paint Washover" },
    { value: "Undercoating" },
    { value: "Car Exterior/Interior Detailing" },
    { value: "Engine Wash" },
    { value: "Foam Wash with Car Buffing" },
    { value: "Engine Overhauling" },
    { value: "Transmission Overhauling" }
  ]

  serviceCon: val[] = [
    { value: "Check and Clean Brakes" }
  ]

  timeArray: valVar[] = [
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
    { value: 18, viewValue: "6:00 PM" },
    { value: 19, viewValue: "7:00 PM" },
    { value: 20, viewValue: "8:00 PM" },
    { value: 21, viewValue: "9:00 PM" },
    { value: 22, viewValue: "10:00 PM" },
    { value: 23, viewValue: "11:00 PM" }
  ];




  constructor(private afs: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditTicketAdminModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) {
      this.ticketID = data.ticketID;
      this.carName = data.carName;
      this.plate = data.plate;
      this.vin = data.vin;
      this.engine = data.engine;
      this.minDate = new Date();
      this.estimate = new FormControl(new Date(data.estimate));
      this.time = data.time;
      this.employeeID = data.employeeID;
      this.fuelType = data.fuelType;
      this.mechanicName = data.mechanicName;
      this.price = data.price;
      this.problem = data.problem;
      this.service = data.service;
      this.status = data.status;
      this.oldStatus = data.status;
      this.jobs = data.jobs;
      this.start = data.start;
      this.recommend = data.recommend;
      this.transmission = data.transmission;
      this.completed = data.completed;

      this.changeServices();

    this.afs.collection<any>('users').valueChanges().subscribe(result => {
      result.forEach(doc => {
        if (doc.permission == 1) {
          let rawTime = doc.timeframe.replace(/pm|am/g, '');
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
            let end = (convertedArr[1] + 12) - 7;
            for (let i = start; i < end; i++) {
              this.timeArray.push({ value: this.timeframes[i].value, viewValue: this.timeframes[i].viewValue });
            }
          }
        }
      });
    })


    }

  ngOnInit(): void {
  }

  updateData(): void {
    // let selection = this.employees.find(data => data.id == this.employeeID);
    // this.mechanicName = selection?.name;
    let newComp = this.completed;

    let selection: any[] = [];
    for (let x = 0; x < this.employeeID.length; x++) {
      for (let y = 0; y < this.employees.length; y++) {
        console.log(this.employees[y].name)
        if (this.employeeID[x] == this.employees[y].id) {
          selection.push(this.employees[y].name);
        }
      }
    }
    if (this.oldStatus != this.status && this.status == "Undergoing Repair/Maintenance") {
      newComp = '';
    }

    this.afs.collection('tickets').doc(String(this.ticketID)).update({
      employeeID: this.employeeID,
      mechanicName: this.mechanicName,
      carName: this.carName,
      vin: this.vin,
      engine: this.engine,
      plate: this.plate,
      jobs: this.jobs,
      status: this.status,
      start: this.start,
      service: this.service,
      estimate: this.estimate.value.toLocaleDateString(),
      recommend: this.recommend
      // price: this.price,
    });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  changeServices() {
    this.serviceCon = [
      { value: "Change Oil" },
      { value: "Replace Fuel Filter" },
      { value: "Clean Air Filter" },
      { value: "Check and Clean Brakes" },
      { value: "Change All Fluids" },
      { value: "Regrease All Fittings" },
      { value: "Repack Wheel Bearings" },
      { value: "Replace Necessary Worn Parts" },
      { value: "Check All Bulbs" },
      { value: "Check Suspensions" },
      { value: "Replace Necessary Brake Pads" },
      { value: "Check Electrical" },
      { value: "Check Fuel Line" },
      { value: "Check Engine Management" },
      { value: "Use Diagnostic Tools" },
      { value: "Check Suspension" },
      { value: "Check Transmission" },
      { value: "Check Sensors" },
      { value: "Check Tires" },
      { value: "Check Aircon Servicing" },
      { value: "Repair for Dents" },
      { value: "Body Paint Washover" },
      { value: "Undercoating" },
      { value: "Car Exterior/Interior Detailing" },
      { value: "Engine Wash" },
      { value: "Foam Wash with Car Buffing" },
      { value: "Engine Overhauling" },
      { value: "Engine Tune Up" },
      { value: "Engine Troubleshooting" },
      { value: "Transmission Pull Down" },
      { value: "Clutch Assembly Replacing" },
      { value: "Battery Replacement" },
      { value: "Check Relays and Fuse" },
      { value: "Check Charging System" },
      { value: "Body Repair" },
      { value: "Engine Bay Detailing" },
      { value: "Car Polish" },
      { value: "Accident Repair" },
      { value: "Transmission Overhauling" }
    ];
    
    // if (this.service == "Check Brakes") {
    //   this.serviceCon = this.checkBrakes.map(x => ({ value: x.value }))
    // } else if (this.service == "Regular PMS") {
    //   this.serviceCon = this.regularPMS.map(x => ({ value: x.value }))
    // } else if (this.service == "Minor PMS") {
    //   this.serviceCon = this.minorPMS.map(x => ({ value: x.value }))
    // } else if (this.service == "Major PMS") {
    //   this.serviceCon = this.majorPMS.map(x => ({ value: x.value }))
    // } else if (this.service == "Troubleshooting") {
    //   this.serviceCon = this.troubleshooting.map(x => ({ value: x.value }))
    // }
  }

  weekendsDatesFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    return day !== this.unvailDate && day !== 0;
  }


}
