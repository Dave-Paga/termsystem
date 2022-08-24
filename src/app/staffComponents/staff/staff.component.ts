import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataTicketsAdminItem } from 'src/app/adminComponents/dataTables/data-tickets-admin/data-tickets-admin-datasource';
import { AuthService } from 'src/app/services/auth.service';
import { EditTicketStaffComponent } from '../edit-ticket-staff/edit-ticket-staff.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTicketsAdminItem>;

  displayedColumns = ['ticketID', 'carName', 'date', 'customerName', 'customerPhone', 'price', 'problem', 'solution', 'status', 'edit'];
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
    public router: Router,
    public dialog: MatDialog
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

      arr = arr.filter((x) => x.employeeID == this.userID);
      arr = arr.filter((x) => x.status != "Pending Inquiry");
      console.log(arr);

      this.dataSource.data = arr as DataTicketsAdminItem[]

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  receiveTicket(data): void {
    this.afs.collection<any>('tickets/').doc(data.ticketID).update({
      status: "Undergoing Repair/Maintenance"
    });
  }

  removeData(data): void {
    this.afs.collection<any>('tickets/').doc(data.ticketID).delete();
  }


  ngOnInit(): void {
    this.loginCheck();
  }

  editDialog(data): void {

    const dialogRef = this.dialog.open(EditTicketStaffComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });
  }

  loginCheck() {
    this.authService.getPermission(this.authService.userData.uid).then(res => {
      if (res != 1) {
        this.router.navigate(['redirect']);
      } else {
        console.log(this.authService.userData.uid);
      }
    });
  }
}
