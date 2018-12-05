import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { icon, latLng, tileLayer, marker, LatLng } from 'leaflet';
import { map } from 'rxjs/operators';

import { ThingService } from '../../shared/backend';

@Component({
  selector: 'app-thing-new-page',
  templateUrl: './thing-new.component.html',
  styleUrls: ['./thing-new.component.css']
})
export class ThingNewComponent implements OnInit {

  /**
   * Parent project identification
   */
  public projectID: string;

  /**
   * Map center latitude. Map marker is also placed in this coordinates.
   */
  public centerLat = 35.807657;

  /**
   * Map center longitude. Map marker is also placed in this coordinates.
   */
  public centerLng = 51.398408;

  /**
   * leatlet map options
   */
  public options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '&copy; OpenStreetMap contributors' })
    ],
    zoom: 15,
    center: latLng(this.centerLat, this.centerLng)
  };

  /**
   * leaflet map layer that is used here just for marker management
   */
  public layer = marker([this.centerLat, this.centerLng], {
    draggable: true,
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  constructor(
    private tService: ThingService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id'))
    ).subscribe(
      (id: string) => this.projectID = id
    );

    if (navigator.geolocation) { // ask current location from the browser
      navigator.geolocation.getCurrentPosition(
        /**
         * Callback function that is called when user provides its location
         */
        (position): void => {
          this.centerLng = position.coords.longitude;
          this.centerLat = position.coords.latitude;
          this.layer.setLatLng(latLng(this.centerLat, this.centerLng));
        }
      );
    }

    // handles marker dragging to update form latitude and lognitude, and
    // change map center.
    this.layer.on('dragend', () => {
      const coords: LatLng = this.layer.getLatLng();
      this.centerLat = coords.lat;
      this.centerLng = coords.lng;
    });
  }

  /**
   * Callbacks for center latitude and logitude changing. These callbacks update marker and map center.
   */
  public onCenterLatChange(v: number): void {
    this.centerLat = v;
    this.layer.setLatLng(latLng(this.centerLat, this.centerLng));
  }

  public onCenterLngChange(v: number): void {
    this.centerLng = v;
    this.layer.setLatLng(latLng(this.centerLat, this.centerLng));
  }

  /**
   * When input is invalid in the input box, input box must truns to red this function
   * returns true to trigger invalid class when input is invalid. use this with [class.is-invalid].
   */
  public isValid(m: FormControl): boolean {
    return m.invalid && (m.dirty || m.touched);
  }

  /**
   * formSubmits calls when user submits the thing creation form.
   */
  public formSubmit(f: FormGroup): void {
    this.tService.create(this.projectID, f.value.name, this.centerLat, this.centerLng).subscribe(() => {
      this.router.navigate(['/projects', this.projectID]);
    }, () => {
    });
  }


}
