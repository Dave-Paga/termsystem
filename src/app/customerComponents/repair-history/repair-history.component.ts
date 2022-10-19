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
import { ViewTicketDetailsAdminComponent } from 'src/app/adminComponents/dataTables/view-ticket-details-admin/view-ticket-details-admin.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-repair-history',
  templateUrl: './repair-history.component.html',
  styleUrls: ['./repair-history.component.css']
})
export class RepairHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTicketsAdminItem>;

  displayedColumns = ['ticketID', 'carName', 'date', 'mechanicName', 'price', 'problem', 'status', 'view'];
  uid: string = 'test';
  dataSource = new MatTableDataSource<DataTicketsAdminItem>();
  customerEmail!: string;
  customerName!: string;
  customerPhone!: string;

  range = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  get fromDate() {
    if (this.range.get('fromDate')?.value) {
      return this.range.get('fromDate')?.value.toLocaleDateString();
    } else {
      return false
    }
  }
  get toDate() {
    if (this.range.get('toDate')?.value) {
      return this.range.get('toDate')?.value.toLocaleDateString();
    } else {
      return false
    }
  }

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

  constructor(private afs: AngularFirestore, public authService: AuthService, public router: Router, public dialog: MatDialog) {
    this.afs.collection<any>('users/').valueChanges().subscribe(result => {
      result.forEach(user => {
        if (user.uid == this.authService.userData.uid) {
          this.customerEmail = user.email;
          this.customerName = user.fullName;
          this.customerPhone = user.phone;
        }
      })
    });

    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      let arr = data
      arr.forEach((value, index) => {
        let converted = this.timeframes[arr[index].time];
        arr[index].convTime = converted;
      });

      arr = arr.filter((x) => x.customerEmail == this.customerEmail);
      arr
      console.log(arr);

      this.dataSource.data = arr as DataTicketsAdminItem[]


      this.dataSource.filterPredicate = (data, filter) => {
        if (this.fromDate && this.toDate) {
          return data.date >= this.fromDate && data.date <= this.toDate;
        } else if (this.fromDate && this.toDate == false) {
          return data.date >= this.fromDate;
        } else if (this.fromDate == false && this.toDate) {
          return data.date <= this.toDate;
        }
        return true;
      }

    })
  }

  ngOnInit(): void {
    this.loginCheck();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  startFilter() {
    // console.log(dateVal.toLocaleDateString());
    this.dataSource.filter = '' + Math.random();
    // this.dataSource.filter = dateVal.toLocaleDateString();
  }
  resetFilter() {
    this.dataSource.filter = '';
    this.range.reset();
  }

  loginCheck() {
    this.authService.getPermission(this.authService.userData.uid).then(res => {
      if (res != 0) {
        this.router.navigate(['redirect']);
      } else {
        console.log(this.authService.userData.uid);
      }
    });
  }

  viewDialog(data): void {
    const dialogRef = this.dialog.open(ViewTicketDetailsAdminComponent, {
      width: 'auto',
      height: 'auto',
      data: data
    });
  }

}
