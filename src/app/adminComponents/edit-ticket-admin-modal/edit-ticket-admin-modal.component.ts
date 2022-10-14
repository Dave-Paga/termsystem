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
  date: FormControl;
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
  estimate: string = '';
  recommendation: string = '';
  start: string = '';
  ticketID: string = '';
  time: string = '';
  unvailDate: number = 0;

  statusArray: valVar[] = [
    { value: "Undergoing Repair/Maintenance", viewValue: 'Undergoing Repair/Maintenance' },
    { value: "Pending Payment", viewValue: 'Pending Payment' },
    { value: "For Release", viewValue: 'For Release' }
  ];

  serviceArray: valVar[] = [
    { value: "Check Brakes", viewValue: 'Check Brakes' },
    { value: "Regular PMS", viewValue: 'Regular PMS' },
    { value: "Minor PMS", viewValue: 'Minor PMS' },
    { value: "Major PMS", viewValue: 'Major PMS' },
    { value: "Troubleshooting", viewValue: 'Troubleshooting' }
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
    { value: "Transmission Overhauling" },
  ]

  serviceCon: val[] = [
    { value: "Check and Clean Brakes" }
  ]



  constructor(private afs: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditTicketAdminModalComponent>,
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
      this.service = data.service;
      this.status = data.status;
      this.jobs = data.jobs;
      this.estimate = data.estimate;
      this.start = data.start;
      this.transmission = data.transmission;

      this.changeServices();
    }

  ngOnInit(): void {
  }

  updateData(): void {
    console.log(this.jobs)
    this.afs.collection('tickets').doc(String(this.ticketID)).update({
      jobs: this.jobs
    })
  }

  close() {
    this.dialogRef.close();
  }

  changeServices() {
    this.serviceCon = [];
    if (this.service == "Check Brakes") {
      this.serviceCon = this.checkBrakes.map(x => ({ value: x.value }))
    } else if (this.service == "Regular PMS") {
      this.serviceCon = this.regularPMS.map(x => ({ value: x.value }))
    } else if (this.service == "Minor PMS") {
      this.serviceCon = this.minorPMS.map(x => ({ value: x.value }))
    } else if (this.service == "Major PMS") {
      this.serviceCon = this.majorPMS.map(x => ({ value: x.value }))
    } else if (this.service == "Troubleshooting") {
      this.serviceCon = this.troubleshooting.map(x => ({ value: x.value }))
    }
  }

}
