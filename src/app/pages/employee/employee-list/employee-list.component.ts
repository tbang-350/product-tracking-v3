import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  printdata2 : any;
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
    private router : Router
  ) {
    // this.getEmployees();
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.userservice.getEmployees().subscribe(x => {
      // this.filteredData = x;
      this.data = new MatTableDataSource<User>(x);
      this.printdata2 = x ;
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
    }).afterClosed().subscribe(() => {
        this.getEmployees();
    })

  }


  editEmployee(element: any) {
    this.dialog.open(AddEmployeeComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(() => {
        this.getEmployees();
    })
  }

  deleteEmployee(id: number) {
    Swal.fire({
      title: 'Are you sure you want to delete user ?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userservice.delete(id).subscribe({
          next: (res) => {
            this.getEmployees();
          }, error: () => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Something went wrong',
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        Swal.fire('Deleted', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Not Deleted', '', 'info')
      }
    })

  }


  refresh() {
    this.ngOnInit();
  }

  printPDF(){
    this.userservice.data2 = this.printdata2;
    this.router.navigateByUrl('/employeeReport');
  }

}
