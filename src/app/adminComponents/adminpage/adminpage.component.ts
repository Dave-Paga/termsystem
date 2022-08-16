import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  ticketArray: any;
  totalTickets!: number;
  pendingInquiry!: any;
  currentlyServiced!: any;
  carRelease!: any;

  userArray:any;
  totalEmployees!: any;

  constructor(private afs: AngularFirestore, public authService: AuthService) {
    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      // Ticket object array
      this.ticketArray = data;
      this.totalTickets = this.ticketArray.length;
      this.pendingInquiry = this.ticketArray.filter((x)=> x.status === "Pending Inquiry");
      this.currentlyServiced = this.ticketArray.filter((x)=> x.status === "Undergoing Repair/Maintenance");
      this.carRelease = this.ticketArray.filter((x)=> x.status === "For Release");

      // Perform data queries here
      
    })
    this.afs.collection<any>('users').valueChanges().subscribe(data => {
      this.userArray=data;
      this.totalEmployees = this.userArray.filter((x)=> x.permission === 1);



    })
  }

  ngOnInit(): void {
  }

}
