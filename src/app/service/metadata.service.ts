import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from '../models/metadata.model';
import * as L from 'leaflet';


const baseUrl = "http://localhost:9090"

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    private http: HttpClient
  ) { }


  getMetadata():Observable<Metadata[]>{
    return this.http.get<Metadata[]>(baseUrl+"/getMetadata");
  }

  countMetadata(): Observable<Metadata[]> {
    return this.http.get<Metadata[]>(baseUrl+"/countMetadata");
  }

  getMetaChartData(){
    return this.http.get(baseUrl+"/getMetachartdata")
  }

}
