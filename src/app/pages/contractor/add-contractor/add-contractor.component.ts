import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloatLabelType, MatFormFieldControl } from '@angular/material/form-field';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-contractor',
  templateUrl: './add-contractor.component.html',
  styleUrls: ['./add-contractor.component.css']
})
export class AddContractorComponent implements OnInit {

 contractorForm!: FormGroup;
 actionBtn: string = "Save";
  // message: string = "";

 constructor(
  @Inject(MAT_DIALOG_DATA) public editData: any,
  private userService: UserService,
  private dialogRef: MatDialogRef<AddContractorComponent>
  ){}

  ngOnInit(): void {
       this.FormConfiguration();
       console.log(this.editData);

      if(this.editData){
        this.actionBtn = "Update";
        this.contractorForm.controls['user_id'].setValue(this.editData.user_id);
        this.contractorForm.controls['firstName'].setValue(this.editData.firstName);
        this.contractorForm.controls['lastName'].setValue(this.editData.lastName);
        this.contractorForm.controls['userName'].setValue(this.editData.userName);
        this.contractorForm.controls['userPassword'].setValue(this.editData.userPassword);
        this.contractorForm.controls['email'].setValue(this.editData.email);
        this.contractorForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
        this.contractorForm.controls['registeredAt'].setValue(this.editData.registeredAt);
      }
  }

  

  FormConfiguration(){
    this.contractorForm = new FormGroup({
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

  

  addContractor(){
    if(!this.editData){
      if(this.contractorForm.valid){
        this.userService.createContractor(this.contractorForm.value).subscribe({
          next:(res) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Contractor added',
              showConfirmButton: false,
              timer: 1500
            });
            
            this.contractorForm.reset();
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
      this.updateContractor();
    }
  }


  updateContractor(){
    console.log(this.contractorForm.value)
    this.userService.updateContractor(this.contractorForm.value).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Contractor updated',
          showConfirmButton: false,
          timer: 1500
        });
        this.contractorForm.reset();
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
