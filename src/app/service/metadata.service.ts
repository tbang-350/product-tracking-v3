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

  // makeMarkers(map: L.Map): void{
  //   this.http.get<Metadata[]>(baseUrl+"/getMetadata").subscribe((res:any) => {
  //     for(const c of res){
  //       const lat = c.latitude;
  //       const lon = c.longitude;
  //       const marker = L.marker([lon,lat]).addTo(map);
  //     }
  //   });
  // }



}
