import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, Map, control } from 'leaflet';
import 'leaflet-measure';
import 'leaflet-gesture-handling';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { WidgetNewComponent } from '../../modals/widget-new/widget-new.component';
import { AuthenticationService } from '../../shared/authentication';
import { Widget, WidgetService } from '../../shared/backend';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  public widgets: Widget[] = [];

  /**
   * Map center latitude.
   */
  public centerLat = 35.807657;

  /**
   * Map center longitude.
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
    center: latLng(this.centerLat, this.centerLng),
    gestureHandling: true,
    scrollWheelZoom: false,
  };

  constructor(
    private modalService: NgbModal,
    public authService: AuthenticationService,
    public wService: WidgetService,
  ) { }

  ngOnInit() {
    this.wService.retrieve().subscribe((widgets: Widget[]) => this.widgets = widgets);
    if (navigator.geolocation) { // ask current location from the browser
      navigator.geolocation.getCurrentPosition(
        /**
         * Callback function that is called when user provides its location
         */
        (position): void => {
          this.centerLng = position.coords.longitude;
          this.centerLat = position.coords.latitude;
        }
      );
    }
  }

  public createWidget(): void {
    const modalRef = this.modalService.open(WidgetNewComponent);
    modalRef.result.then((w: Widget) => {
      this.widgets.push(w);
      this.wService.store(this.widgets).subscribe();
    }, (reason) => reason);
  }

  public removeWidget(i: number): void {
    this.widgets.splice(i, 1);
    this.wService.store(this.widgets).subscribe();
  }

  // onMapReady is called with map component reference when it is ready.
  public onMapReady(map: Map) {
    // casts the control to any because of the leaflet awkward plugin model.
    map.addControl((<any> control).measure(
      {
        primaryLengthUnit: 'meters',
        secondaryLengthUnit: 'kilometers',
        primaryAreaUnit: 'sqmeters',
        secondaryAreaUnit: 'hectares',
      }
    ));
  }
}
