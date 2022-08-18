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

@Component({
  selector: 'app-repair-history',
  templateUrl: './repair-history.component.html',
  styleUrls: ['./repair-history.component.css']
})
export class RepairHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTicketsAdminItem>;

  displayedColumns = ['ticketID', 'carName', 'date', 'mechanicName', 'price', 'problem', 'status'];
  uid: string = 'test';
  dataSource = new MatTableDataSource<DataTicketsAdminItem>();
  customerEmail!: string;
  customerName!: string;
  customerPhone!: string;

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

  constructor(private afs: AngularFirestore, public authService: AuthService, public router: Router) {
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
      console.log(arr);

      this.dataSource.data = arr as DataTicketsAdminItem[]

    })
  }

  ngOnInit(): void {
    this.loginCheck();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

}
