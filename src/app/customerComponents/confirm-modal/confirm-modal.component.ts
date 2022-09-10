import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TicketIDModalComponent } from 'src/app/mainComponents/ticket-id-modal/ticket-id-modal.component';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  newTicket: any;

  constructor(private afs: AngularFirestore, public dialogRef: MatDialogRef<ConfirmModalComponent>, @Inject(MAT_DIALOG_DATA) public data, public router: Router, public dialog: MatDialog) {
    this.newTicket = data;

  }

  ngOnInit(): void {
  }

  addTicket() {
    this.afs.collection('tickets/').add(this.newTicket).then(docRef => {
      const docID = docRef.id;
      this.afs.doc('tickets/' + docID).update({
        ticketID: docID
      })
      this.close();
      this.dialogRef.close();

      let ticket = {
        ticketID: docID
      }
      this.viewDialog(ticket);
    });
    
  }

  viewDialog(data): void {

    const dialogRef = this.dialog.open(TicketIDModalComponent, {
      width: 'auto',
      height: 'auto',
      data: data
    });
  }

  close() {
    this.dialogRef.close();
  }
}
