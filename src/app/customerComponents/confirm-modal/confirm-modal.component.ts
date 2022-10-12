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
  lastTicketNum!: number;
  ticketArr: any;

  constructor(private afs: AngularFirestore, public dialogRef: MatDialogRef<ConfirmModalComponent>, @Inject(MAT_DIALOG_DATA) public data, public router: Router, public dialog: MatDialog) {
    this.newTicket = data;
    this.afs.collection<any>('tickets').valueChanges().subscribe(result => {
      this.ticketArr = result;
      
      if (this.ticketArr.length == 0) {
        this.lastTicketNum = 0;
      } else {
        let ticketIDs = this.ticketArr.map(x => x.ticketID);
        this.lastTicketNum = Math.max(...ticketIDs.map(x=>x));
      }
    });




  }

  ngOnInit(): void {
  }

  addTicket() {
    if (Number.isNaN(this.lastTicketNum)) {
      this.lastTicketNum = 1
    } else {
      this.lastTicketNum += 1;
    }
    
    console.log(Number.isNaN(this.lastTicketNum));
    let stringed = String(this.lastTicketNum);
    this.afs.collection('tickets/').doc(stringed).set(this.newTicket).then(docRef => {
      const docID = this.lastTicketNum + 1;
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
