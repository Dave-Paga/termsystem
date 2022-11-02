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

interface val {
  value: any;
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
  engine: string = '';
  vin: string = '';
  plate: string = '';
  date: FormControl;
  employeeID: any;
  fuelType: string = '';
  mechanicName?: any;
  price: number = 0;
  problem: string = '';
  solution: string = '';
  status: string = '';
  transmission: string = '';
  service: string = '';
  jobs: string = '';
  estimate: any;
  start: any;
  ticketID: string = '';
  time: string = '';
  unvailDate: number = 0;
  minDate: Date;


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
  ];

  employees: employee[] = [];
  statusArray: valVar[] = [
    { value: "Pending Inquiry", viewValue: 'Pending Inquiry'},
    { value: "Pending Diagnosis", viewValue: 'Pending Diagnosis'},
    { value: "Undergoing Diagnosis", viewValue: 'Undergoing Diagnosis' },
    { value: "Undergoing Repair/Maintenance", viewValue: 'Undergoing Repair/Maintenance' },
    { value: "Pending Payment", viewValue: 'Pending Payment'},
    { value: "For Release", viewValue: 'For Release'}
  ];

  serviceArray: valVar[] = [
    { value: "Check Brakes (1 hour)", viewValue: 'Check Brakes (1 hour)' },
    { value: "Regular PMS (2 hours)", viewValue: 'Regular PMS (2 hours)' },
    { value: "Minor PMS (3 hours)", viewValue: 'Minor PMS (3 hours)' },
    { value: "Major PMS (5 hours)", viewValue: 'Major PMS (5 hours)' },
    { value: "Minor Troubleshooting (3 hours)", viewValue: 'Minor Troubleshooting (3 hours)' },
    { value: "Major Troubleshooting (5 hours)", viewValue: 'Major Troubleshooting (5 hours)' }
  ];


  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) {
    
    this.ticketID = data.ticketID;
    this.carName = data.carName;
    this.plate =  data.plate;
    this.date = new FormControl(new Date(data.date));
    this.minDate = new Date();
    this.start = data.start;
    // this.estimate = new FormControl();
    this.time = data.time;
    this.employeeID = data.employeeID;
    this.fuelType = data.fuelType;
    this.mechanicName = data.mechanicName;
    this.price = data.price;
    this.problem = data.problem;
    this.service = data.service;
    this.status = data.status;
    this.transmission = data.transmission;

    this.changeServices();

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

  
  updateData(): void {

    if (this.service == "Check Brakes (1 hour)") {
      this.estimate = 1;
    } else if (this.service == "Regular PMS (2 hours)") {
      this.estimate = 2;
    } else if (this.service == "Minor PMS (3 hours)") {
      this.estimate = 3;
    } else if (this.service == "Major PMS (5 hours)") {
      this.estimate = 5;
    } else if (this.service == "Minor Troubleshooting (3 hours)") {
      this.estimate = 3;
    } else if (this.service == "Major Troubleshooting (5 hours)") {
      this.estimate = 5;
    }

    
    
    // this.mechanicName = selection?.name;
    
    if (this.employeeID != "No Mechanic" && this.service != "No Service" && this.vin && this.engine && this.jobs) {
      // let selection = this.employees.find(data => data.id == this.employeeID);
      // this.mechanicName = selection?.name;
      let selection: any[] = [];
      for (let x = 0; x < this.employeeID.length; x++) {
        for (let y = 0; y < this.employees.length; y++) {
          console.log(this.employees[y].name)
          if (this.employeeID[x] == this.employees[y].id) {
            selection.push(this.employees[y].name);
          }
        }
      }

      this.mechanicName = selection;

      this.afs.collection('tickets').doc(String(this.ticketID)).update({
        jobs: this.jobs,
        employeeQ: this.employeeID,
        employeeID: this.employeeID,
        mechanicName: this.mechanicName,
        vin: this.vin,
        engine: this.engine,
        service: this.service,
        // estimate: this.estimate.value.toLocaleDateString(),
        estimate: this.estimate,
        start: 0,
        curMech: "None",
        status: "Undergoing Repair/Maintenance"
      })
      this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

}
