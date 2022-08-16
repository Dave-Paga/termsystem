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

  constructor(private afs: AngularFirestore, public authService: AuthService) {
    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      // Ticket object array
      this.ticketArray = data;

      // Perform data queries here
      
    })
  }

  ngOnInit(): void {
  }

}
