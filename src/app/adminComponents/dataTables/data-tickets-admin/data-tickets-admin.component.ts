import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataTicketsAdminDataSource, DataTicketsAdminItem } from './data-tickets-admin-datasource';
import { ViewTicketDetailsAdminComponent } from '../view-ticket-details-admin/view-ticket-details-admin.component';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteModalComponent } from 'src/app/mainComponents/delete-modal/delete-modal.component';
import { FormGroup, FormControl } from '@angular/forms';



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

  filteredValues = {
    carName: '', customerName: '', customerEmail: '',
    ticketID: '', status: ''
  };

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ticketID', 'date', 'time', 'customerName', 'customerPhone', 'problem', 'edit', 'view', 'delete'];
  uid: string= 'test';
  perm: any= 1;
  globalFilter = '';

  range = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    filter: new FormControl()
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

  constructor(private afs: AngularFirestore, public dialog: MatDialog, public authService: AuthService) {

    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      let arr = data;
      arr.forEach((value, index) => {
        let converted = this.timeframes[arr[index].time];
        arr[index].convTime = converted;
        // console.log(arr[index].date < new Date().toLocaleDateString());
        let dateSplit = arr[index].date.split("/");
        let curSplit = new Date().toLocaleDateString().split("/");
        let dateDif = Number(dateSplit[1]) - Number(curSplit[1]);

        // 1 = red, 2 = yellow
        if (arr[index].date < new Date().toLocaleDateString()) {
          arr[index].rowColor = 1;
        } else if (curSplit[0] == dateSplit[0] && dateDif <= 1) {
          arr[index].rowColor = 2
        }
      });
      arr = arr.filter(x => x.mechanicName == "No Mechanic");
      this.dataSource.data = arr as DataTicketsAdminItem[];

    })
  }

  ngOnInit(): void {
    this.loginCheck();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
    this.getFormsValue();

  }

  getFormsValue() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      // 'ticketID','date', 'service', 'status', 'estimate', 'price', 'edit', 'view'
      let globalMatch = !this.globalFilter
      let col1 = data.ticketID.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col2 = data.carName.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col3 = data.customerPhone.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col4 = data.customerName.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col6 = data.plate.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col7 = data.problem.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col8 = data.status.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col10 = data.transmission.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col13 = data.fuelType.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col14 = data.jobs.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      //search all fields
      if (this.globalFilter) {
        globalMatch = col1 || col2 || col3 || col4 || col6 || col7 || col8 || col10 || col13 || col14;
      }

      if (!globalMatch) {
        return false;
      }

      if (this.fromDate && this.toDate) {
        return data.date >= this.fromDate && data.date <= this.toDate;
      } else if (this.fromDate && this.toDate == false) {
        return data.date >= this.fromDate;
      } else if (this.fromDate == false && this.toDate) {
        return data.date <= this.toDate;
      }
      return true
      //DATE 

    }
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(EditTicketComponent, {
      width: '500px',
      height: 'auto',
      data: data
    });
  }

  applyFilter(filter) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }
  startFilter() {
    // console.log(dateVal.toLocaleDateString());
    this.dataSource.filter = '' + Math.random();
    // this.dataSource.filter = dateVal.toLocaleDateString();
  }
  resetFilter() {
    this.range.setValue({
      filter: "",
      fromDate: '',
      toDate: ''
    });
    this.dataSource.filter = '';
  }

  viewDialog(data): void {

    const dialogRef = this.dialog.open(ViewTicketDetailsAdminComponent, {
      width: 'auto',
      height: 'auto',
      data: data
    });

  }

  deleteDialog(data): void {

    const dialogRef = this.dialog.open(DeleteModalComponent, {
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
