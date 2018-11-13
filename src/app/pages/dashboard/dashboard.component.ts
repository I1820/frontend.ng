import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { icon, latLng, tileLayer, LeafletMouseEvent, marker, LatLng } from 'leaflet';

import * as global from '../../globals';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
  /**
   * Map center latitude.
   */
  private centerLat = 35.807657;

  /**
   * Map center longitude.
   */
  private centerLng = 51.398408;

  /**
   * Mapbox map
   */
  private id = 'satellite-streets-v9'

  /**
   * leatlet map options
   */
  private options = {
    layers: [
      tileLayer(`https://api.mapbox.com/styles/v1/mapbox/${this.id}/tiles/{z}/{x}/{y}?access_token=${this.accessToken}`,
        {
          attribution: `
          <a href="https://www.mapbox.com/about/maps/">© Mapbox | </a>
          <a href="http://www.openstreetmap.org/copyright">© OpenStreetMap | </a>
          <a href="https://www.mapbox.com/map-feedback/" target="_blank"><strong>Improve this map</strong></a>
          `,
        })
    ],
    zoom: 15,
    center: latLng(this.centerLat, this.centerLng)
  };

  constructor(
    @Inject('MAPBOX_KEY') private accessToken: string,
  ) { }

  ngOnInit() {
  }

}
