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
import { FormControl, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-completed-table',
  templateUrl: './completed-table.component.html',
  styleUrls: ['./completed-table.component.css']
})
export class CompletedTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTicketsAdminItem>;

  filteredValues = {
    carName: '', customerName: '', customerEmail: '',
    ticketID: '', status: ''
  };


  displayedColumns = ['ticketID', 'carName', 'estimate', 'service', 'status', 'completion', 'view'];
  uid: string = 'test';
  dataSource = new MatTableDataSource<DataTicketsAdminItem>();
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
    18: "6:00 PM",
    19: "7:00 PM",
    20: "8:00 PM",
    21: "9:00 PM",
    22: "10:00 PM",
    23: "11:00 PM",
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
        // if (value.estimate < curDate) {
        //   arr[index].rowColor = 1;
        // } else if (value.estimate == curDate) {
        //   let hoursLeft = value.start - curHour;
        //   if (hoursLeft == 1) {
        //     arr[index].rowColor = 2;
        //   } else if (hoursLeft <= 0) {
        //     arr[index].rowColor = 1;
        //   }
        // }

        // if (value.status == "Pending Payment") {
        //   arr[index].rowColor = 3;
        // } else if (value.status == "For Release") {
        //   arr[index].rowColor = 4;
        // }
      });

      arr = arr.filter(x => x.mechanicName != "No Mechanic");
      arr = arr.filter(x => x.status == "Completed");
      
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
      let col5 = data.mechanicName.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col6 = data.plate.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col7 = data.problem.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col8 = data.status.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col9 = data.service.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col10 = data.transmission.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col11 = data.vin.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col12 = data.engine.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col13 = data.fuelType.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      let col14 = data.jobs.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      //search all fields
      if (this.globalFilter) {
        globalMatch = col1 || col2 || col3 || col4 || col5 || col6 || col7 || col8 || col9 || col10 || col11 || col12 || col13 || col14;
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


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

}
