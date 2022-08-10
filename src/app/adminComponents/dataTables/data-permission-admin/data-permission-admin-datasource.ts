import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataPermissionAdminItem {
  uid: any;
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  permission?: number;
  timeframe?: string;
  days?: string;
  convPerm?: string;
}

/**
 * Data source for the DataPermissionAdmin view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataPermissionAdminDataSource extends DataSource<DataPermissionAdminItem> {
  data: DataPermissionAdminItem[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private array: any) {
    super();
    this.data = array;
    this.data.forEach((value, index) => {
      this.data.forEach((value, index) => {
        if (value.permission == 0) {
          this.data[index].convPerm = "Customer";
        } else if (value.permission == 1) {
          this.data[index].convPerm = "Employee";
        } else if (value.permission == 2) {
          this.data[index].convPerm = "Admin";
        }
      })
    })
    console.log(this.data);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataPermissionAdminItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataPermissionAdminItem[]): DataPermissionAdminItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataPermissionAdminItem[]): DataPermissionAdminItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'fullName': return compare(a.fullName, b.fullName, isAsc);
        case 'uid': return compare(+a.uid, +b.uid, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);
        case 'phone': return compare(+a.phone, +b.phone, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
