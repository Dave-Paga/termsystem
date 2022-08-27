import { Component, OnInit } from '@angular/core';
import { Knowledge } from "src/app/mainComponents/knowledge_base"

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

  constructor() {
    this.knowledgeBase = Knowledge
  }

  ngOnInit(): void {
  }

  initiate(value:string ) {
      this.knowledgeBase = Knowledge[value]
      console.log(this.knowledgeBase);

  }

}
