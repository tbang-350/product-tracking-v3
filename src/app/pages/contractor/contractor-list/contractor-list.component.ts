import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import { AddContractorComponent } from '../add-contractor/add-contractor.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit {

  printdata: any
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
    private router: Router
  ) {
    // this.getContractors();
    
  }

  ngOnInit(): void {
    this.getContractors();
  }

  getContractors() {
    this.userservice.getContractors().subscribe(x => {
      // this.filteredData = x;
      this.data = new MatTableDataSource<User>(x);
      this.printdata = x
      console.log(this.printdata)
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
    }).afterClosed().subscribe(() => {
        this.getContractors();
    })

  }


  editContractor(element: any) {
    this.dialog.open(AddContractorComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(() => {
        this.getContractors()
    })
  }

  deleteContractor(id: number) {
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
            this.getContractors();
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



  refresh(): void {
    this.ngOnInit();
  }

  printPDF(){
    this.userservice.data = this.printdata;
    this.router.navigateByUrl("/contractorReport")
  }


}
