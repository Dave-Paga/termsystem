import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/customerComponents/confirm-modal/confirm-modal.component';
import { Knowledge } from "src/app/mainComponents/knowledge_base"
import { AuthService } from 'src/app/services/auth.service';

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
  customerPhone: number;
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
  selector: 'app-diagnose-vehicle-credentials',
  templateUrl: './diagnose-vehicle-credentials.component.html',
  styleUrls: ['./diagnose-vehicle-credentials.component.css']
})
export class DiagnoseVehicleCredentialsComponent implements OnInit {
  
  knowledgeBase: any;
  appointProblem: string = '';
  start: boolean = false;
  answer: boolean = true;
  diagnose: boolean = true;
  book: boolean = true;
  hideBook: boolean = true;
  hideUser: boolean = false;
  currentItem: any;

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
  customerPhone!: number;
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

  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private afs: AngularFirestore, public authService: AuthService, public dialog: MatDialog, public router: Router,
    public afAuth: AngularFireAuth) {

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.afs.collection<any>('users/').valueChanges().subscribe(result => {
          result.forEach(user => {
            if (user.uid == this.authService.userData.uid) {
              this.customerEmail = user.email;
              this.customerName = user.fullName;
              this.customerPhone = user.phone;
            }
          })
        })
        this.hideUser = true;
        console.log("logged in")
      } else {
        // not logged in
        this.hideUser = false;
        console.log("not logged in")
      }
    });

    this.knowledgeBase = Knowledge;

    this.minDate = new Date();
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.date = new FormControl(new Date());

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

  viewDialog(data): void {

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: 'auto',
      height: 'auto',
      data: data
    });
  }

  addNewTicket() {
    let selection = this.employees.find(data => data.id == this.employeeID);
    this.mechanicName = selection?.name;

    if (this.customerEmail && this.customerName && this.customerPhone && this.employeeID && this.date && this.time && this.fuelType && this.problem) {
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
      console.log(this.customerPhone)

      this.errorMSG = ""

      this.afs.collection<any>('tickets/').valueChanges().subscribe(result => {
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  ngOnInit(): void {
  }

  initiate(value:string ) {
      this.knowledgeBase = Knowledge[value];
      this.currentItem = this.knowledgeBase[0];
      this.appointProblem = this.currentItem[1];
      this.answer = false;
      this.start = true;
  }

  yes() {
    this.currentItem = this.knowledgeBase.find(x => x[0] == this.currentItem[2]);

    console.log(this.currentItem[1].typeOf)
    if (this.currentItem.length == 5) {
      this.book = false;
      this.answer = true;
      this.diagnose = false;
    } else if (this.currentItem.length == 2) {
      this.diagnose = false;
      this.answer = true;
    }

    this.appointProblem = this.currentItem[1];
  }

  no() {
    this.currentItem = this.knowledgeBase.find(x =>  x[0] == this.currentItem[3]);

    if (this.currentItem.length == 5) {
      this.book = false;
      this.answer = true;
      this.diagnose = false;
    } else if (this.currentItem.length == 2) {
      this.diagnose = false;
      this.answer = true;
    }

    this.appointProblem = this.currentItem[1];
  }

  restart() {
    this.start = false;
    this.answer = true;
    this.diagnose = true;
    this.book = true;
    this.appointProblem = ''
  }

  bookAppointment() {
    this.start = true;
    this.answer = true;
    this.diagnose = true;
    this.book = true;
    this.hideBook = false
    this.appointProblem = '';
    this.problem = this.currentItem[3];
    this.price = this.currentItem[4];
  }

}
