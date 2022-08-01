import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';
import { AuthService } from '../services/auth.service';
import { DataTicketsAdminDataSource, DataTicketsAdminItem } from './data-tickets-admin-datasource';

@Component({
  selector: 'data-tickets-admin',
  templateUrl: './data-tickets-admin.component.html',
  styleUrls: ['./data-tickets-admin.component.css']
})
export class DataTicketsAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTicketsAdminItem>;
  dataSource!: DataTicketsAdminDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ticketID', 'carName', 'customerName', 'customerPhone', 'dateTime', 'mechanicName', 'price', 'problem', 'status', 'edit'];
  uid: string= 'test';
  perm: any= 1;

  constructor(private afs: AngularFirestore, public dialog: MatDialog, public authService: AuthService) {
    // console.log(`UID ${this.authService.userData.uid}`);
    // this.perm = this.loginCheck();

    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      this.dataSource = new DataTicketsAdminDataSource(data, this.perm, this.uid);
      console.log(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  openDialog(data): void {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = data;
    // dialogConfig.width = '350px';
    // dialogConfig.height = '300px';

    const dialogRef = this.dialog.open(EditTicketComponent, {
      width: '600px',
      height: '600px',
      data: data
    });
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
