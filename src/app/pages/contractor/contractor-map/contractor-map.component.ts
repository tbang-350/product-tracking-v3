import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contractor-map',
  templateUrl: './contractor-map.component.html',
  styleUrls: ['./contractor-map.component.css']
})
export class ContractorMapComponent implements AfterViewInit {
  

  map: any;


  ngAfterViewInit(): void {
    this.loadMap();
  }

  // ngOnInit(): void {
  //   this.loadMap();
  // }



  private loadMap(): void {
    this.map = L.map('map').setView([-6.8, 39.283333], 13);

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

    const marker = L.marker([-6.825344702954498, 39.22065605500218], { icon }).bindPopup('Angular Leaflet');
    marker.addTo(this.map);
  }



}
