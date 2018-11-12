import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { icon, latLng, tileLayer, LeafletMouseEvent, marker, LatLng } from 'leaflet';

@Component({
  selector: 'app-thing-new-page',
  templateUrl: './thing-new.component.html',
  styleUrls: ['./thing-new.component.css']
})
export class ThingNewComponent implements OnInit {

  /**
   * Map center latitude. Map marker is also placed in this coordinates.
   */
  private centerLat = 35.807657;

  /**
   * Map center longitude. Map marker is also placed in this coordinates.
   */
  private centerLng = 51.398408;

  /**
   * leatlet map options
   */
  private options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '&copy; OpenStreetMap contributors' })
    ],
    zoom: 15,
    center: latLng(this.centerLat, this.centerLng)
  };

  /**
   * leaflet map layer that is used here just for marker management
   */
  private layer = marker([this.centerLat, this.centerLng], {
    draggable: true,
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  constructor() { }

  ngOnInit() {
    if (navigator.geolocation) { // ask current location from the browser
      navigator.geolocation.getCurrentPosition(this.getLocationInfo);
    }

    // handles marker dragging to update form latitude and lognitude, and
    // change map center.
    this.layer.on('dragend', () => {
      let coords: LatLng = this.layer.getLatLng()
      this.centerLat = coords.lat;
      this.centerLng = coords.lng;
    })
  }

  /**
   * Callback function that is called when user provides its location
   */
  private getLocationInfo(position): void {
    this.centerLng = position.coords.longitude;
    this.centerLat = position.coords.latitude;
  }

  /**
   * Callbacks for center latitude and logitude changing. These callbacks update marker and map center.
   */
  private onCenterLatChange(v: number): void {
    this.centerLat = v;
    this.layer.setLatLng(latLng(this.centerLat, this.centerLng));
  }

  private onCenterLngChange(v: number): void {
    this.centerLng = v;
    this.layer.setLatLng(latLng(this.centerLat, this.centerLng));
  }

  /**
   * When input is invalid in the input box, input box must truns to red this function
   * returns true to trigger invalid class when input is invalid. use this with [class.is-invalid].
   */
  private isValid(m: FormControl): boolean {
    return m.invalid && (m.dirty || m.touched);
  }

  /**
   * formSubmits calls when user submits the thing creation form.
   */
  private formSubmit(f: FormGroup): void {
  }


}
