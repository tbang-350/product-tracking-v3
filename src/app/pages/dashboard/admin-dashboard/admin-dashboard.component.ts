import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  allUsers: any;
  allContractors: any;
  allEmployees: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.countAll();
    this.countContractors();
    this.countEmployee();
  }

  countAll(){
    this.userService.countAll().subscribe( x =>{
      this.allUsers = x;
      console.log(x);
    });
  }

  countContractors(){
    this.userService.countCountractor().subscribe(x => {
      this.allContractors = x;
      console.log(this.allContractors);
    })
  }


  countEmployee(){
    this.userService.countEmployee().subscribe(x => {
      this.allEmployees = x;
      console.log(this.allEmployees)
    })
  }

}
