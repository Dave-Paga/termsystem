import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  newTicket: any;

  constructor(private afs: AngularFirestore, public dialogRef: MatDialogRef<ConfirmModalComponent>, @Inject(MAT_DIALOG_DATA) public data, public router: Router) {
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
    });
    this.close();
    this.router.navigate(['UserHomePageComponent']);
  }

  close() {
    this.dialogRef.close();
  }
}
