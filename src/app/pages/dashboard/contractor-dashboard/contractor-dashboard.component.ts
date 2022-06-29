import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/service/metadata.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-contractor-dashboard',
  templateUrl: './contractor-dashboard.component.html',
  styleUrls: ['./contractor-dashboard.component.css']
})
export class ContractorDashboardComponent implements OnInit {

  countMeta: any;
  allEmployees: any;

  constructor(
    private userService: UserService,
    private metadataService: MetadataService
    ) { }

  ngOnInit(): void {
    this.countEmployee();
    this.countMetadata();
  }

  

  countEmployee(){
    this.userService.countEmployee().subscribe(x => {
      this.allEmployees = x;
      console.log(this.allEmployees)
    })
  }

  countMetadata(){
    this.metadataService.countMetadata().subscribe(x => {
      this.countMeta = x;
      console.log(this.countMeta);
    })
  }

}
