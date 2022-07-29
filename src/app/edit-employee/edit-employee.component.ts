import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';

interface schedule {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  newEmail: string = '';
  employeeUID: string;
  employeeDay: string = '';
  employeeTime: string = '';
  employeeName: string;
  form: FormGroup;
  days: schedule[] = [
    { value: 'Mon - Fri', viewValue: 'Monday - Friday' },
    { value: 'Mon - Sat', viewValue: 'Monday - Sat' }
  ];

  timeframe: schedule[] = [
    { value: '7am - 6pm', viewValue: '7:00AM - 6:00PM' },
    { value: '7am - 12pm', viewValue: '7:00AM - 12:00PM' },
    { value: '12pm - 6pm', viewValue: '12:00PM - 6:00PM' }
  ];
  
  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.employeeUID = data.uid;
      this.employeeName = data.fullName;
      this.employeeDay = data.days;
      this.employeeTime = data.timeframe;

    this.form = this.fb.group({
      employeeName: [this.employeeName]
    });
    }

  ngOnInit() {
    this.form = this.fb.group({
      employeeName: [this.employeeName]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // updateEmail(): void {
  //   this.afs.collection('users').doc(this.data.uid).update({ email: this.newEmail })
  //   this.dialogRef.close();
  // }

  updateData(): void {
    this.afs.collection('users').doc(this.employeeUID).update({
      days: this.employeeDay,
      timeframe: this.employeeTime
    });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
