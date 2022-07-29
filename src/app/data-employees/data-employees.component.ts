import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataEmployeesDataSource, DataEmployeesItem } from './data-employees-datasource';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'data-employees',
  templateUrl: './data-employees.component.html',
  styleUrls: ['./data-employees.component.css']
})
export class DataEmployeesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataEmployeesItem>;
  dataSource!: DataEmployeesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['uid', 'fullName', 'email', 'phone', 'timeframe', 'days', 'edit'];

  constructor(private afs: AngularFirestore, public dialog: MatDialog) {
    // this.dataSource = new DataEmployeesDataSource();

    this.afs.collection<any>('users').valueChanges().subscribe(data => {
      this.dataSource = new DataEmployeesDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  openDialog(data): void {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = data;
    // dialogConfig.width = '350px';
    // dialogConfig.height = '300px';

    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '500px',
      height: '500px',
      data: data
    });
  }

  trackByUid(index, item) {
    return item.uid;
  }
}
