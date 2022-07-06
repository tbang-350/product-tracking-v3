import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


const baseUrl = "http://localhost:9090"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

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

}
