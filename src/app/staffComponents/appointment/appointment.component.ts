import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataTicketsAdminItem } from 'src/app/adminComponents/dataTables/data-tickets-admin/data-tickets-admin-datasource';
import { Router } from '@angular/router';
import { format } from 'path';
import { arrayUnion } from '@angular/fire/firestore'
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTicketsAdminItem>;

  displayedColumns = ['ticketID', 'carName', 'date', 'service','receive'];
  uid: string = 'test';
  dataSource = new MatTableDataSource<DataTicketsAdminItem>();
  email!: string;
  fullName!: string;
  phone!: string;
  userID!: string;
  timeframes = {
    7: "7:00 AM",
    8: "8:00 AM",
    9: "9:00 AM",
    10: "10:00 AM",
    11: "11:00 AM",
    12: "12:00 NN",
    13: "1:00 PM",
    14: "2:00 PM",
    15: "3:00 PM",
    16: "4:00 PM",
    17: "5:00 PM",
  }

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    public router: Router
  ) {
    this.afs.collection<any>('users/').valueChanges().subscribe(result => {
      result.forEach(user => {
        if (user.uid == this.authService.userData.uid) {
          this.email = user.email;
          this.fullName = user.fullName;
          this.phone = user.phone;
          this.userID = user.uid;
        }
      })
    });

    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      let arr = data
      arr.forEach((value, index) => {
        let converted = this.timeframes[arr[index].time];
        arr[index].convTime = converted;
      });


      // const list = first.filter(x => second.map(y => y.moduleId).includes(x.entityId));
      let empIDList = arr.map(y => y.employeeID);
      arr = arr.filter((x) => x.employeeQ.includes(this.userID));
      arr = arr.filter((x) => x.curMech == "None");
      //table filter
      // arr = arr.filter((x) => x.start == 0);

      this.dataSource.data = arr as DataTicketsAdminItem[]

    })
  }

  ngOnInit(): void {
    this.loginCheck();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  msToTime(duration:number) {
    let milliseconds = Number((duration % 1000) / 100)
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    let hoursString = (hours < 10) ? "0" + hours : hours;
    let minutesString = (minutes < 10) ? "0" + minutes : minutes;
    let secondsString = (seconds < 10) ? "0" + seconds : seconds;

    return hoursString + ":" + minutesString + ":" + secondsString;
  }

  receiveTicket(data): void {

    let firstDate = new Date();
    // let secondDate = new Date();
    // secondDate.setDate(secondDate.getDate() + 1);

    // let duration = secondDate.valueOf() - firstDate.valueOf();

    if (!data.start) {
      let time = new Date().getHours()
      let newTime = Number(time) + Number(data.estimate);
      this.afs.collection<any>('tickets/').doc(String(data.ticketID)).update({
        start: newTime,
        estimate: data.date,
        curMech: this.authService.currentUserId,
        status: "Undergoing Repair/Maintenance",
        arrayDuration: arrayUnion(firstDate)
      });
    } else {
      this.afs.collection<any>('tickets/').doc(String(data.ticketID)).update({
        curMech: this.authService.currentUserId,
        status: "Undergoing Repair/Maintenance",
        arrayDuration: arrayUnion(firstDate)
      });
    }
  }

  removeData(data): void {
    this.afs.collection<any>('tickets/').doc(String(data.ticketID)).delete();
  }

  loginCheck() {
    this.authService.getPermission(this.authService.userData.uid).then(res => {
      if (res != 1) {
        this.router.navigate(['redirect']);
      } else {
      }
    });
  }

}
