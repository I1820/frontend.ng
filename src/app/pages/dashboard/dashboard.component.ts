import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { icon, latLng, tileLayer, Map, LatLng } from 'leaflet';
import 'leaflet-measure';
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
  private centerLat = 35.807657;

  /**
   * Map center longitude.
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
    center: latLng(this.centerLat, this.centerLng),
    measureControl: true,
  };

  constructor(
    private modalService: NgbModal,
    public authService: AuthenticationService,
    public wService: WidgetService,
  ) { }

  ngOnInit() {
    this.wService.retrieve().subscribe((widgets: Widget[]) => this.widgets = widgets);
  }

  public createWidget(): void {
    const modalRef = this.modalService.open(WidgetNewComponent);
    modalRef.result.then((w: Widget) => {
      this.widgets.push(w)
      this.wService.store(this.widgets).subscribe();
    });
  }

  public removeWidget(i: number): void {
      this.widgets.splice(i, 1);
      this.wService.store(this.widgets).subscribe();
  }
}
