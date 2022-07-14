import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-contractor-report',
  templateUrl: './contractor-report.component.html',
  styleUrls: ['./contractor-report.component.css']
})
export class ContractorReportComponent implements OnInit {

  condata: any

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.condata = this.userService.data
    console.log(this.condata)
    this.userService.print();
  }

}
