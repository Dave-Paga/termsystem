import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { filter } from 'rxjs/operators';

// TODO: Replace this with your own data model type
export interface DataTicketsAdminItem {
  plate: any;
  vin: any;
  engine: any;
  service: any;
  jobs: any;
  ticketID: string;
  carName: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  employeeID: string;
  date: string;
  time: string;
  fuelType: string;
  mechanicName: string;
  price: number;
  problem: string;
  solution: string;
  transmission: string;
  status: string;
  convTime?: string;
}

interface timeValue {
  converted: string;
}

/**
 * Data source for the DataTicketsAdmin view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTicketsAdminDataSource extends DataSource<DataTicketsAdminItem> {
  data: DataTicketsAdminItem[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  
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

  constructor(private array: any, private permission: any, private uid: any) {
    super();


    this.data = array;
    
    this.data.forEach((value, index) => {
      let converted = this.timeframes[this.data[index].time];
      this.data[index].convTime = converted;
    })
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTicketsAdminItem[]> {
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
  private getPagedData(data: DataTicketsAdminItem[]): DataTicketsAdminItem[] {
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
  private getSortedData(data: DataTicketsAdminItem[]): DataTicketsAdminItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'ticketID': return compare(a.ticketID, b.ticketID, isAsc);
        case 'carName': return compare(+a.carName, +b.carName, isAsc);
        case 'date': return compare(+a.date, +b.date, isAsc);
        case 'customerName': return compare(+a.customerName, +b.customerName, isAsc);
        case 'customerPhone': return compare(+a.customerPhone, +b.customerPhone, isAsc);
        case 'problem': return compare(+a.problem, +b.problem, isAsc);
        case 'time': return compare(+a.time, +b.time, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
