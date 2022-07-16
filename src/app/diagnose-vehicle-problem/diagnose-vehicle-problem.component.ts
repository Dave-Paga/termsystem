import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnose-vehicle-problem',
  templateUrl: './diagnose-vehicle-problem.component.html',
  styleUrls: ['./diagnose-vehicle-problem.component.css']
})
export class DiagnoseVehicleProblemComponent implements OnInit {

  constructor() { }
  problem: string= '';
  
  ngOnInit(): void {
  }

}
