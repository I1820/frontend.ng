import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { latLng, tileLayer, LeafletMouseEvent } from 'leaflet';

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

  private options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '&copy; OpenStreetMap contributors' })
    ],
    zoom: 15,
    center: latLng(this.centerLat, this.centerLng)
  };

  constructor() { }

  ngOnInit() {
    if (navigator.geolocation) { // ask current location from the browser
      navigator.geolocation.getCurrentPosition(this.getLocationInfo);
    }
  }

  /**
   * Callback function that is called when user provides its location
   */
  private getLocationInfo(position): void {
    this.centerLng = position.coords.longitude;
    this.centerLat = position.coords.latitude;
  }

  private onMapDoubleClick(e: LeafletMouseEvent): void {
    console.log(e)
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
