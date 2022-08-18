import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { exit } from 'process';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

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

interface ticketInterface {
  ticketID: string;
  carName: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  employeeID: string;
  date: string;
  time: string;
  fuelType: string;
  mechanicName?: string;
  price: number;
  problem: string;
  solution: string;
  transmission: string;
  status: string;
}

@Component({
  selector: 'app-user-book-appointment',
  templateUrl: './user-book-appointment.component.html',
  styleUrls: ['./user-book-appointment.component.css']
})
export class UserBookAppointmentComponent implements OnInit {
  carName: string = '';
  date: FormControl;
  employeeID: string = '';
  fuelType: string = '';
  mechanicName?: string = '';
  price: number = 0;
  transmission: string = '';
  ticketID: string = '';
  problem: string = '';
  time: string = '';
  minDate: Date;
  maxDate: Date;
  unvailDate: number = 0;
  customerEmail!: string;
  customerName!: string;
  customerPhone!: string;
  newTicket?: ticketInterface;
  errorMSG: string = '';



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

  transArray: string[] = [
    "Manual",
    "Automatic"
  ]

  gasType: string[] = [
    "Gas",
    "Diesel"
  ]

  service: string[] = [
    "Car Repair",
    "Maintenance",
    "Oil Change",
    "Tire and Brakes",
    "Tune-up"
  ]



  timeArray: valVar[] = [];

  employees: employee[] = [];


  constructor(private afs: AngularFirestore, public authService: AuthService, public dialog: MatDialog, public router: Router) {
    this.minDate = new Date();
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.date = new FormControl(new Date());
    console.log(this.authService.userData.uid);

    this.afs.collection<any>('users/').valueChanges().subscribe(result => {
      result.forEach(user => {
        if (user.uid == this.authService.userData.uid){
          this.customerEmail = user.email;
          this.customerName = user.fullName;
          this.customerPhone = user.phone;
        }
      })
    })

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
    this.loginCheck()
  }

  loginCheck() {
    this.authService.getPermission(this.authService.userData.uid).then(res => {
      if (res != 0) {
        this.router.navigate(['redirect']);
      }
    });
  }

  test() {
    console.log(`
      Customer Email: ${this.customerEmail}
      Customer Name: ${this.customerName}
      Customer Phone: ${this.customerPhone}
    `)

    let selection = this.employees.find(data => data.id == this.employeeID);
    this.mechanicName = selection?.name;

    if (this.employeeID && this.date && this.time && this.fuelType && this.problem) {
      this.newTicket = {
        ticketID: "Sample",
        carName: this.carName,
        customerEmail: this.customerEmail,
        customerName: this.customerName,
        customerPhone: this.customerPhone,
        employeeID: this.employeeID,
        date: this.date.value.toLocaleDateString(),
        time: this.time,
        fuelType: this.fuelType,
        mechanicName: this.mechanicName,
        price: this.price,
        problem: this.problem,
        solution: "",
        transmission: this.transmission,
        status: "Pending Inquiry",
      }

      this.errorMSG = ""
    } else {
      this.errorMSG = "Please fill all inputs"
    }

    console.log(this.newTicket)
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
    this.date = new FormControl(new Date());
  }

  changePrice() {
    if (this.problem == "Car Repair") {
      this.price = 1000
    } else if (this.problem == "Maintenance") {
      this.price = 2500
    } else if (this.problem == "Tune-up") {
      this.price = 1500
    } else if (this.problem == "Oil Change") {
      this.price = 1000
    } else if (this.problem == "Tire and Brakes") {
      this.price = 5000
    }
  }

  viewDialog(data): void {

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: 'auto',
      height: 'auto',
      data: data
    });
  }

  addEntry() {
    
    this.errorMSG = ""
    this.afs.collection('tickets/').add(this.newTicket).then(docRef => {
      const docID = docRef.id;
      this.afs.doc('tickets/' + docID).update({
        ticketID: docID
      })
    });
  }

  addNewTicket() {
    let selection = this.employees.find(data => data.id == this.employeeID);
    this.mechanicName = selection?.name;

    if (this.employeeID && this.date && this.time && this.fuelType && this.problem) {
      this.newTicket = {
        ticketID: "Sample",
        carName: this.carName,
        customerEmail: this.customerEmail,
        customerName: this.customerName,
        customerPhone: this.customerPhone,
        employeeID: this.employeeID,
        date: this.date.value.toLocaleDateString(),
        time: this.time,
        fuelType: this.fuelType,
        mechanicName: this.mechanicName,
        price: this.price,
        problem: this.problem,
        solution: "",
        transmission: this.transmission,
        status: "Pending Inquiry",
      }

      this.errorMSG = ""

      this.afs.collection<any>('tickets/').valueChanges().subscribe( result => {
        let newArr = result;
        newArr = newArr.filter((x) => x.status === "Pending Inquiry" && x.customerEmail === this.customerEmail);
        if (newArr.length <= 0) {
          this.errorMSG = ""
          this.viewDialog(this.newTicket);
          // this.addEntry();
        } else {
          this.errorMSG = "Please settle previous appointment first."
        }
      });
      
      
    } else {
      this.errorMSG = "Please fill all inputs"
    }

  }

}
