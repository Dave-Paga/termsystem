import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  curTicket: any;
  ticketArr: any;

  constructor(private afs: AngularFirestore, public dialogRef: MatDialogRef<DeleteModalComponent>, @Inject(MAT_DIALOG_DATA) public data, public router: Router, public dialog: MatDialog) {
    this.curTicket = data
  }

  ngOnInit(): void {
  }

  deleteTicket() {
    this.afs.collection<any>('tickets/').doc(this.curTicket.ticketID).delete();
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
