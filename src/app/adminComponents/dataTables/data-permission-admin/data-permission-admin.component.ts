import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { resourceLimits } from 'worker_threads';
import { EditPermissionComponent } from '../edit-permission/edit-permission.component';
import { DataPermissionAdminDataSource, DataPermissionAdminItem } from './data-permission-admin-datasource';

interface perms {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'data-permission-admin',
  templateUrl: './data-permission-admin.component.html',
  styleUrls: ['./data-permission-admin.component.css']
})
export class DataPermissionAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataPermissionAdminItem>;
  dataSource!: DataPermissionAdminDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['uid', 'fullName', 'email', 'phone', 'permission', 'edit'];

  permArray: perms[] = [
    { value: 0, viewValue: 'Customer' },
    { value: 1, viewValue: 'Employee' },
    { value: 2, viewValue: 'Admin' }
  ];

  constructor(private afs: AngularFirestore, public dialog: MatDialog) {
    // this.dataSource = new DataPermissionAdminDataSource();
    this.afs.collection<any>('users').valueChanges().subscribe(data => {
      this.dataSource = new DataPermissionAdminDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getPermission(row): string {

    let first = this.permArray.find((obj) => {
      obj.value === row.permission;
    });

    return first!.viewValue;
  }

  openDialog(data): void {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = data;
    // dialogConfig.width = '350px';
    // dialogConfig.height = '300px';

    const dialogRef = this.dialog.open(EditPermissionComponent, {
      width: '300px',
      height: '300px',
      data: data
    });
  }
}
