import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

 constructor(
  private formBuilder: FormBuilder,
  private userService: UserService,
  private dialogRef: MatDialogRef<AddContractorComponent>
  ){}

  ngOnInit(): void {
       this.FormConfiguration()
  }

  FormConfiguration(){
    this.contractorForm = new FormGroup({
      firstName: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      userName: new FormControl(null,Validators.required),
      userPassword: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      phoneNumber: new FormControl(null,Validators.required)
    })
  }

  addContractor(){
    console.log(this.contractorForm.value);
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
  }

}
