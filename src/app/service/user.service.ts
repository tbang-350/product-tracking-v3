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

  update(data: any): Observable<any> {
    return this.http.put(baseUrl + "/updateUser", data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  

}
