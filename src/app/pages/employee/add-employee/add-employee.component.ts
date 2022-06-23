import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { AddContractorComponent } from '../../contractor/add-contractor/add-contractor.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
 actionBtn: string = "Save";
  // message: string = "";

 constructor(
  @Inject(MAT_DIALOG_DATA) public editData: any,
  private userService: UserService,
  private dialogRef: MatDialogRef<AddEmployeeComponent>
  ){}

  ngOnInit(): void {
       this.FormConfiguration();
       console.log(this.editData);

      if(this.editData){
        this.actionBtn = "Update";
        this.employeeForm.controls['user_id'].setValue(this.editData.user_id);
        this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
        this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
        this.employeeForm.controls['userName'].setValue(this.editData.userName);
        this.employeeForm.controls['userPassword'].setValue(this.editData.userPassword);
        this.employeeForm.controls['email'].setValue(this.editData.email);
        this.employeeForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
        this.employeeForm.controls['registeredAt'].setValue(this.editData.registeredAt);
      }
  }

  

  FormConfiguration(){
    this.employeeForm = new FormGroup({
      user_id: new FormControl(null),
      firstName: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      userName: new FormControl(null,Validators.required),
      userPassword: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      phoneNumber: new FormControl(null,Validators.required),
      registeredAt: new FormControl(null)
    })
  }

  

  addEmployee(){
    if(!this.editData){
      if(this.employeeForm.valid){
        this.userService.createEmployee(this.employeeForm.value).subscribe({
          next:(res) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Employee added',
              showConfirmButton: false,
              timer: 1500
            });
            this.employeeForm.reset();
            this.dialogRef.close('save');
          },error:() =>{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Something went wrong',
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }
    }else{
      this.updateEmployee();
    }
  }


  updateEmployee(){
    console.log(this.employeeForm.value)
    this.userService.updateEmployee(this.employeeForm.value).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Contractor updated',
          showConfirmButton: false,
          timer: 1500
        });
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },error:() =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

}
