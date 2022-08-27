import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Knowledge } from "src/app/mainComponents/knowledge_base"
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-diagnose-vehicle-credentials',
  templateUrl: './diagnose-vehicle-credentials.component.html',
  styleUrls: ['./diagnose-vehicle-credentials.component.css']
})
export class DiagnoseVehicleCredentialsComponent implements OnInit {
  
  firstName: string= '';
  lastName: string= '';
  emailAddress: string='';
  vehicleModel: string='';
  knowledgeBase: any;
  price: number = 0;
  problem: string = '';
  appointProblem: string = '';
  start: boolean = false;
  answer: boolean = true;
  diagnose: boolean = true;
  book: boolean = true;
  currentItem: any;

  constructor(private afs: AngularFirestore, public authService: AuthService, public router: Router) {
    this.knowledgeBase = Knowledge;
  }

  ngOnInit(): void {
  }

  initiate(value:string ) {
      this.knowledgeBase = Knowledge[value];
      this.currentItem = this.knowledgeBase[0];
      this.problem = this.currentItem[1];
      this.answer = false;
      this.start = true;
  }

  yes() {
    this.currentItem = this.knowledgeBase.find(x => x[0] == this.currentItem[2]);

    console.log(this.currentItem[1].typeOf)
    if (this.currentItem.length == 5) {
      this.book = false;
      this.answer = true;
    } else if (this.currentItem.length == 2) {
      this.diagnose = false;
      this.answer = true;
    }

    this.problem = this.currentItem[1];
  }

  no() {
    this.currentItem = this.knowledgeBase.find(x =>  x[0] == this.currentItem[3]);

    if (this.currentItem.length == 5) {
      this.book = false;
      this.answer = true;
      this.diagnose = false;
    } else if (this.currentItem.length == 2) {
      this.diagnose = false;
      this.answer = true;
    }

    this.problem = this.currentItem[1];
  }

  restart() {
    this.start = false;
    this.answer = true;
    this.diagnose = true;
    this.book = true;
    this.problem = ''
  }

  bookAppointment() {

  }

}
