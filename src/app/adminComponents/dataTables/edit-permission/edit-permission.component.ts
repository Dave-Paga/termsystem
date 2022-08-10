import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';

interface perms {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.css']
})
export class EditPermissionComponent implements OnInit {

  userID: string = '';
  userName: string = '';
  permission: string = '';
  form: FormGroup;

  permArray: perms[] = [
    { value: 0, viewValue: 'Customer'},
    { value: 1, viewValue: 'Employee'},
    { value: 2, viewValue: 'Admin'}
  ];

  constructor(private afs: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    
    this.userID = data.uid;
    this.userName = data.fullName;
    this.permission = data.permission;

    this.form = this.fb.group({
      employeeName: [this.userName]
    });
  }

  updateData(): void {
    this.afs.collection('users').doc(this.userID).update({
      permission: this.permission
    });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
