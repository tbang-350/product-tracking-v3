import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


const baseUrl = "http://localhost:9090"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  data:any;
  data2: any;

  constructor(
    private http: HttpClient,
    private router: Router
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

<<<<<<< HEAD
  print(){
    this.router.navigateByUrl("contractorReport").then(()=>{
      window.print();
      this.router.navigateByUrl("contractor-list")
    })
  }

  printEmployee(){
    this.router.navigateByUrl("employeeReport").then(()=>{
      window.print();
      this.router.navigateByUrl("employee-list")
    })
  }

=======

  
>>>>>>> afe0f6734b29598b00f58388f67231d5352de1db
}
