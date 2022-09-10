import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-id-modal',
  templateUrl: './ticket-id-modal.component.html',
  styleUrls: ['./ticket-id-modal.component.css']
})
export class TicketIDModalComponent implements OnInit {
  ticketID: string;

  constructor(
    private afs: AngularFirestore, public dialogRef: MatDialogRef<TicketIDModalComponent>, @Inject(MAT_DIALOG_DATA) public data, public router: Router
  ) {
    this.ticketID = data.ticketID
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
    window.location.reload();
  }

}
