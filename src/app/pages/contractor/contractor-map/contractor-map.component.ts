import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MetadataService } from 'src/app/service/metadata.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contractor-map',
  templateUrl: './contractor-map.component.html',
  styleUrls: ['./contractor-map.component.css']
})
export class ContractorMapComponent implements OnInit,AfterViewInit {
  

  constructor(
    private metadataService: MetadataService
  ){

  }
  ngOnInit(): void {
    this.loadMap();
    this.makeMarkers(this.map);

    // throw new Error('Method not implemented.');
  }

  map: any;


  ngAfterViewInit(): void {
    this.loadMap();
    this.makeMarkers(this.map);
  }

  // ngOnInit(): void {
  //   this.loadMap();
  // }



  private loadMap(): void {
    this.map = L.map('map').setView([-2.75, 32.75], 10);

    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    });

    tiles.addTo(this.map)

    const icon = L.icon({
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png',
      popupAnchor: [13, 0],
    });

    // const marker = L.marker([-6.162432,39.437297], { icon }).bindPopup('Angular Leaflet');
    // marker.addTo(this.map);
  }


  makeMarkers(map: L.Map): void{
    this.metadataService.getMetadata().subscribe((res:any) => {
      console.log(res);
      for(const c of res){
        const lat = c.latitude;
        const lon = c.longitude;
        const icon = L.icon({
          iconUrl: 'assets/images/marker-icon.png',
          shadowUrl: 'assets/images/marker-shadow.png',
          popupAnchor: [13, 0],
        });
    
        const marker = L.marker([lat,lon], { icon }).bindPopup(c.name);
        marker.addTo(this.map);
      }

      
      // -6.713066120537668, 39.09004596517897

      //-6.70877643431666, 38.96262719662648

      // for(const c of res){
      //   const lat = c.latitude;
      //   const lon = c.longitude;
      //   const marker = L.marker([lon,lat]).addTo(map);
      //   marker.bindPopup('<p>${c.name}</p>').openPopup
      // }
    });
  }

}

//-2.75, 32.75