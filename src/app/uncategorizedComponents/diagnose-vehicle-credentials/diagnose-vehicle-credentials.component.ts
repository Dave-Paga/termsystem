import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
