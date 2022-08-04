import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  branch: string= '';
  carModel: string= '';
  scheduledDate: string= '';
  time: string= '';



  constructor() { }

  ngOnInit(): void {
  }

}


