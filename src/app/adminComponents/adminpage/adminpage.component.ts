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
  chart2: any;
  chart3: any;
  chart4: any;
  chart5: any;

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
        labels: ['Check-Brakes', 'Regular PMS', 'Minor PMS', 'Major PMS', 'Minor Troubleshooting', 'Major Troubleshooting'],
        datasets: [
          {
            label: "Revenue in Php",
            data: ['10250', '30000', '50000', '80000', '70000',
              '90000'],
            backgroundColor: 'lightblue'
          }
        ]
      }
    });

 

    this.chart2 = new Chart("chart2", {
      type: 'bar',
      data: {
        labels: ['Check-Brakes', 'Regular PMS', 'Minor PMS', 'Major PMS', 'Minor Troubleshooting', 'Major Troubleshooting'],
        datasets: [
          {
            label: "Times Requested",
            data: ['10', '3', '2', '4', '2',
              '1'],
            backgroundColor: 'lightgreen'
          }
        ]
      }
    });

    this.chart3 = new Chart("chart3", {
      type: 'doughnut',
      data: {
        labels: ['Check-Brakes', 'Regular PMS', 'Minor PMS', 'Major PMS', 'Minor Troubleshooting', 'Major Troubleshooting'],
        datasets: [
          {
            label: "Hours",
            data: ['1', '2', '3', '5', '4',
              '5'],
            backgroundColor: ['green','blue','yellow','orange','red','purple']
          }
        ]
      }
    });


    this.chart4 = new Chart("chart4", {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: "Hours",
            data: ['30', '45', '26', '37', '28', '40', '25', '20', '31', '36', '', ''],
            backgroundColor: ['orange']
          }
        ]
      }
    });

    this.chart5 = new Chart("chart5", {
      type: 'pie',
      data: {
        labels: ['New Customers', 'Returning Customers'],
        datasets: [
          {
            label: "Customers",
            data: [225, 109],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)'
            ]
          }
        ]
      }
    });

  }
}
