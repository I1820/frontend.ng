import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { icon, latLng, tileLayer, marker, LatLng } from 'leaflet';

import { Thing } from '../../shared/thing.model';
import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'app-thing-detail',
  templateUrl: './thing-detail.component.html',
  styleUrls: ['./thing-detail.component.css']
})
export class ThingDetailComponent implements OnInit {

  private thing: Thing;

  /**
   * leatlet map options
   */
  private options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: '&copy; OpenStreetMap contributors' })
    ],
    zoom: 15,
  };

  /**
   * leaflet map layer that is used here just for marker management
   */
  private layer = marker([0, 0], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  constructor(
    private bService: BackendService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.bService.thingsShow(params.get('id'), params.get('tid')))
    ).subscribe(
      (thing: Thing) => {
        this.thing = thing
        this.layer.setLatLng(latLng(this.thing.latitude, this.thing.longitude));
      }
    )
  }

}
