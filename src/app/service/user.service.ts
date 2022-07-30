import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserAuthService } from './user-auth.service';


const baseUrl = "http://localhost:1919/api"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = "http://localhost:1919/auth";

  requestHeader = new HttpHeaders(
    { 'No-Auth': 'True' }
  );

  data:any;
  data2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userAuthService: UserAuthService
    ) { 

  }

  getContractors(): Observable<User[]>{
    return this.http.get<User[]>(baseUrl+"/getContractors");
  }

  getEmployees(): Observable<User[]>{
    return this.http.get<User[]>(baseUrl+"/getEmployees");
  }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(baseUrl+"/getUsers");
  }

  createContractor(data:any): Observable<any>{
    return this.http.post(baseUrl+"/registerContractor",data);
  }

  createEmployee(data:any): Observable<any>{
    return this.http.post(baseUrl+"/registerEmployee",data);
  }

  updateContractor(data: any): Observable<any> {
    return this.http.put(baseUrl + "/updateContractor/",data);
  }

  updateEmployee(data: any): Observable<any> {
    return this.http.put(baseUrl + "/updateEmployee/",data);
  }

  delete(id: number){
    return this.http.delete<any>(baseUrl+"/deleteUser/"+id);
  }

  countAll(): Observable<User[]>{
    return this.http.get<User[]>(baseUrl+"/countAllUsers");
  }

  countCountractor(): Observable<User[]>{
    return this.http.get<User[]>(baseUrl+"/countContractors")
  }

  countEmployee(): Observable<User[]>{
    return this.http.get<User[]>(baseUrl+"/countEmployees")
  }

  getChartData(){
    return this.http.get(baseUrl+"/getChartdata")
  }

  getContractorChartData(){
    return this.http.get(baseUrl+"/getContractorChartdata")
  }

  print(){
    this.router.navigateByUrl("contractorReport").then(()=>{
      window.print();
      this.router.navigateByUrl("main/contractor-list")
    })
  }

  printEmployee(){
    this.router.navigateByUrl("employeeReport").then(()=>{
      window.print();
      this.router.navigateByUrl("main/employee-list")
    })
  }

  // login(userName:String , userPassword:String){
  //   return this.http.get(baseUrl+"/login/user/"+userName+"/pass/"+userPassword)
  // }

  public login(loginData: any) {
    return this.http.post(this.baseurl + '/authenticate', loginData, {
      headers: this.requestHeader
    });
  }

  public roleMatch(allowedRoles: string | any[]): any {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }

}
