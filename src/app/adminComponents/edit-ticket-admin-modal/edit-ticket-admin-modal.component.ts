import { arrayUnion } from '@angular/fire/firestore'
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface valVar {
  value: any;
  viewValue: string;
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

  

  statusArray: valVar[] = [
    { value: "Undergoing Repair/Maintenance", viewValue: 'Undergoing Repair/Maintenance' },
    { value: "Pending Payment", viewValue: 'Pending Payment' },
    { value: "For Release", viewValue: 'For Release' }
  ];

  serviceArray: valVar[] = [
    { value: "Regular PMS", viewValue: 'Regular PMS' },
    { value: "Minor PMS", viewValue: 'Minor PMS' },
    { value: "Major PMS", viewValue: 'Major PMS' },
    { value: "Troubleshooting", viewValue: 'Troubleshooting' },
    { value: "General Repair", viewValue: 'General Repair' },
    { value: "Body Repair", viewValue: 'Detailing' }
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
      this.jobs = data.jobs;
      this.start = data.start;
      this.recommend = data.recommend
      this.transmission = data.transmission;

      this.changeServices();

    }

  ngOnInit(): void {
  }

  updateData(): void {
    this.afs.collection('tickets').doc(String(this.ticketID)).update({
      carName: this.carName,
      vin: this.vin,
      engine: this.engine,
      plate: this.plate,
      jobs: this.jobs,
      status: this.status,
      start: this.start,
      service: this.service,
      estimate: this.estimate.value.toLocaleDateString(),
      recommend: this.recommend,
      price: this.price
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
