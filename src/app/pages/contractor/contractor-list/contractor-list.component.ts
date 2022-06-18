import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import { AddContractorComponent } from '../add-contractor/add-contractor.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit {



  data: any;
  columnsToDisplay = ['firstName', 'lastName', 'userName', 'email', 'phoneNumber', 'action'];

  // filteredData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userservice: UserService,
    private dialog: MatDialog,
  ) {
    this.getContractors();
  }

  getContractors() {
    this.userservice.getContractors().subscribe(x => {
      // this.filteredData = x;
      this.data = new MatTableDataSource<User>(x);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;

      console.log(this.data);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  addData() {
    this.dialog.open(AddContractorComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getContractors();
      }
    })

  }


  editContractor(element: any) {
    this.dialog.open(AddContractorComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getContractors()
      }
    })
  }


  testAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }





  ngOnInit(): void {
    this.getContractors();
  }
}
