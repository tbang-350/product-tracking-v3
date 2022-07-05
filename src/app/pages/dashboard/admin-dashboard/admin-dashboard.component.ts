import { Component, OnInit } from '@angular/core';
import { employee_chartdata } from 'src/app/models/employee-chartdata.model';
import { UserService } from 'src/app/service/user.service';
import { ChartDataSets, ChartType } from 'chart.js';
import { Colors, Label } from 'ng2-charts';
import { meta_chartdata } from 'src/app/models/meta-chartdata.model';
import { MetadataService } from 'src/app/service/metadata.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  panelOpenState = false;

  allUsers: any;
  allContractors: any;
  allEmployees: any;
  datachart = new employee_chartdata();
  datachart2 = new meta_chartdata();
  countMeta:any;

  constructor(private userService: UserService,
    private metadataService: MetadataService
    ) { }

  ngOnInit(): void {
    this.countAll();
    this.countContractors();
    this.countEmployee();
    this.countMetadata();
    this.getChartData();
    this.getMetaChartData();
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

  countMetadata(){
    this.metadataService.countMetadata().subscribe(x => {
      this.countMeta = x;
      console.log(this.countMeta);
    })
  }

  lineChartData: ChartDataSets[] = [
    {data: [this.datachart.jan,this.datachart.feb,this.datachart.mar,this.datachart.apr,this.datachart.may,this.datachart.jun,
    this.datachart.jul,this.datachart.aug,this.datachart.sep,this.datachart.oct,this.datachart.nov,this.datachart.dec]}
  ];

  lineChartData2: ChartDataSets[] = [
    {data: [this.datachart.jan,this.datachart.feb,this.datachart.mar,this.datachart.apr,this.datachart.may,this.datachart.jun,
    this.datachart.jul,this.datachart.aug,this.datachart.sep,this.datachart.oct,this.datachart.nov,this.datachart.dec]}
  ];

  lineChartLabels: Label[] = ['January','February','March','April','May','June','July','August',
                                'September','October','November','December'];

  lineChartOptions = {
    responsive : true,
  }
    
  lineChartColors: Colors[] = [
    {
      borderColor: 'green',
      backgroundColor: 'rgba(63,103,145)',
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType : ChartType = 'bar'

  getChartData(){
    this.userService.getChartData().subscribe((res:any)=>{
      console.log(res);
      this.datachart = new employee_chartdata(res.jan,res.feb,res.mar,res.apr,res.may,res.jun,res.jul,res.aug,res.sep,res.oct,res.nov,res.dec)
      this.lineChartData = [
        {data: [this.datachart.jan,this.datachart.feb,this.datachart.mar,this.datachart.apr,this.datachart.may,this.datachart.jun,
          this.datachart.jul,this.datachart.aug,this.datachart.sep,this.datachart.oct,this.datachart.nov,this.datachart.dec]}
      ];
    })
  }

  getMetaChartData(){
    this.metadataService.getMetaChartData().subscribe((res:any)=>{
      console.log(res);
      this.datachart = new meta_chartdata(res.jan,res.feb,res.mar,res.apr,res.may,res.jun,res.jul,res.aug,res.sep,res.oct,res.nov,res.dec)
      this.lineChartData2 = [
        {data: [this.datachart.jan,this.datachart.feb,this.datachart.mar,this.datachart.apr,this.datachart.may,this.datachart.jun,
          this.datachart.jul,this.datachart.aug,this.datachart.sep,this.datachart.oct,this.datachart.nov,this.datachart.dec]}
      ];
    })
  }

}
