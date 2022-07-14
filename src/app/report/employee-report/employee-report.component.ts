import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {

  printdata: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.printdata = this.userService.data2
    console.log(this.printdata);
    this.userService.printEmployee();
  }

}
