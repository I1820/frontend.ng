import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MouseEvent } from '@agm/core';

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

  /**
   * makerDrag is called when user map maker dragging ends.
   * This function read the last location of the marker.
   */
  private markerDrag(e: MouseEvent): void {
    this.centerLng = e.coords.lng;
    this.centerLat = e.coords.lat;
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
