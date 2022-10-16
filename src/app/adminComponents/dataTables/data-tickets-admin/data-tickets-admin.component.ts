import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataTicketsAdminDataSource, DataTicketsAdminItem } from './data-tickets-admin-datasource';
import { ViewTicketDetailsAdminComponent } from '../view-ticket-details-admin/view-ticket-details-admin.component';
import { MatTableDataSource } from '@angular/material/table';



interface timeValue {
  converted: string;
}

@Component({
  selector: 'data-tickets-admin',
  templateUrl: './data-tickets-admin.component.html',
  styleUrls: ['./data-tickets-admin.component.css']
})
export class DataTicketsAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTicketsAdminItem>;
  dataSource = new MatTableDataSource<DataTicketsAdminItem>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ticketID', 'date', 'time', 'customerName', 'customerPhone', 'problem', 'edit', 'view', 'delete'];
  uid: string= 'test';
  perm: any= 1;

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

  constructor(private afs: AngularFirestore, public dialog: MatDialog, public authService: AuthService) {

    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      let arr = data;
      arr.forEach((value, index) => {
        let converted = this.timeframes[arr[index].time];
        arr[index].convTime = converted;
        // console.log(arr[index].date < new Date().toLocaleDateString());
      });
      arr = arr.filter(x => x.mechanicName == "No Mechanic");
      this.dataSource.data = arr as DataTicketsAdminItem[];
  
      console.log(new Date().getMonth());
  
    })
  }

  openDialog(data): void {

    const dialogRef = this.dialog.open(EditTicketComponent, {
      width: '300px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().subscribe(data => console.log(data))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDialog(data): void {

    const dialogRef = this.dialog.open(ViewTicketDetailsAdminComponent, {
      width: 'auto',
      height: 'auto',
      data: data
    });

    
  }

  removeData(data): void {
    this.afs.collection<any>('tickets/').doc(data.ticketID).delete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  loginCheck() {
    return this.authService.getPermission(this.authService.userData.uid).then(res => {
      return res;
    });
  }

}
