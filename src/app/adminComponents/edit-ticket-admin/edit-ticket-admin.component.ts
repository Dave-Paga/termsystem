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
import { ViewTicketDetailsAdminComponent } from '../dataTables/view-ticket-details-admin/view-ticket-details-admin.component';
import { EditTicketAdminModalComponent } from '../edit-ticket-admin-modal/edit-ticket-admin-modal.component';

@Component({
  selector: 'app-edit-ticket-admin',
  templateUrl: './edit-ticket-admin.component.html',
  styleUrls: ['./edit-ticket-admin.component.css']
})
export class EditTicketAdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTicketsAdminItem>;

  displayedColumns = ['ticketID', 'service', 'status', 'estimate', 'price', 'edit', 'view'];
  uid: string = 'test';
  dataSource = new MatTableDataSource<DataTicketsAdminItem>();

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

    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      let arr = data
      arr.forEach((value, index) => {
        let converted = this.timeframes[arr[index].time];
        let converted2 = this.timeframes[arr[index].start];
        arr[index].convTime = converted;
        arr[index].convTime2 = converted2;

        let curDate = new Date().toLocaleDateString();
        let curHour = new Date().getHours();

        // 1 = red, 2 =  yellow, 3 = green
        if (value.estimate < curDate) {
          arr[index].rowColor = 1;
        } else if (value.estimate == curDate) {
          let hoursLeft = value.start - curHour;
          if (hoursLeft == 1) {
            arr[index].rowColor = 2;
          } else if (hoursLeft <= 0 ) {
            arr[index].rowColor = 1;
          }
        }

        if (value.status == "Pending Payment") {
          arr[index].rowColor = 3;
        } else if (value.status == "For Release") {
          arr[index].rowColor = 4;
        }

        

      });

      arr = arr.filter(x => x.mechanicName != "No Mechanic");
      this.dataSource.data = arr as DataTicketsAdminItem[]

    })
  }

  ngOnInit(): void {
    this.loginCheck();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loginCheck() {
    this.authService.getPermission(this.authService.userData.uid).then(res => {
      if (res != 2) {
        this.router.navigate(['redirect']);
      } else {
      }
    });
  }

  removeData(data): void {
    this.afs.collection<any>('tickets/').doc(String(data.ticketID)).delete();
  }

  editDialog(data): void {
    const dialogRef = this.dialog.open(EditTicketAdminModalComponent, {
      width: '500px',
      height: 'auto',
      data: data
    });
  }

  viewDialog(data): void {
    const dialogRef = this.dialog.open(ViewTicketDetailsAdminComponent, {
      width: 'auto',
      height: 'auto',
      data: data
    });
  }

  checkBG(row) {
    if (row.status == "Pending Payment") {

    }
  }


}
