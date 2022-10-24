import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  ticketArray: any;
  totalTickets!: number;
  pendingInquiry!: any;
  currentlyServiced!: any;
  carRelease!: any;

  userArray:any;
  totalEmployees!: any;
  totalUsers!: any;

  chart1: any;

  constructor(private afs: AngularFirestore, public authService: AuthService,
    public router: Router) {
    Chart.register(...registerables);
    this.afs.collection<any>('tickets').valueChanges().subscribe(data => {
      // Ticket object array
      this.ticketArray = data;
      this.totalTickets = this.ticketArray.length;
      this.pendingInquiry = this.ticketArray.filter((x)=> x.status === "Pending Inquiry");
      this.currentlyServiced = this.ticketArray.filter((x)=> x.status === "Undergoing Repair/Maintenance");
      this.carRelease = this.ticketArray.filter((x)=> x.status === "For Release");

      // Perform data queries here
      
    })
    this.afs.collection<any>('users').valueChanges().subscribe(data => {
      this.userArray=data;
      this.totalEmployees = this.userArray.filter((x)=> x.permission === 1);
      this.totalUsers = this.userArray.filter((x)=> x.permission === 0);


    })
  }

  ngOnInit(): void {
    this.loginCheck();
    this.createChart();
  }

  loginCheck() {
    this.authService.getPermission(this.authService.userData.uid).then(res => {
      if (res != 2) {
        this.router.navigate(['redirect']);
      }
    });
  }

  createChart() {

    this.chart1 = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
}
