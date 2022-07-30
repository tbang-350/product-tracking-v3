import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm: FormGroup;
  // incorrect = false;
  loginForm!: FormGroup;

  constructor(private router: Router,
    private userService: UserService,
    private userAuthService: UserAuthService
  ) {

  }

  ngOnInit(): void {
    this.FormConfiguration();
    this.login();
  }



  FormConfiguration() {
    this.loginForm = new FormGroup({
      userName: new FormControl(null,Validators.required),
      userPassword: new FormControl(null,Validators.required)
    })
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        console.log(response.jwtToken);
        console.log(response.user.roles);

        this.userAuthService.setRoles(response.user.roles);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.roles[0].roleName;

        if (role === 'Admin') {
          this.router.navigate(['/main/admin-dash']);
        } else {
          this.router.navigate(['/main/contractor-dash']);
        }

      },
      (error) => {
        console.log(error);
      }
    );
    // console.log(this.loginForm.value)
  }




}
