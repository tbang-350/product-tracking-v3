import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

import { AddEmployeeComponent } from '../add-employee/add-employee.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  data: any;
  columnsToDisplay = ['firstName', 'lastName', 'userName', 'email', 'phoneNumber', 'action', 'registeredAt'];

  // filteredData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() viewMode = false;

  @Input() currentUser: User = {
    employement: false
  };

  message = '';

  constructor(
    private userservice: UserService,
    private dialog: MatDialog,
  ) {
    this.getEmployees();
  }

  ngOnInit(): void {
      this.getEmployees();
  }

  getEmployees() {
    this.userservice.getEmployees().subscribe(x => {
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
    this.dialog.open(AddEmployeeComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getEmployees();
      }
    })

  }


  editEmployee(element: any) {
    this.dialog.open(AddEmployeeComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getEmployees();
      }
    })
  }

  deleteEmployee(id: number){
    this.userservice.delete(id).subscribe({
      next: (res) => {
        alert("deleted successfully")
        this.getEmployees();
      },error: () =>{
        alert("something went wrong");
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

}