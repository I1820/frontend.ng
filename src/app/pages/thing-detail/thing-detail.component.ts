import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { icon, latLng, tileLayer, marker, LatLng } from 'leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ThingService, Thing, TTNConnectivity } from '../../shared/backend';
import { AssetNewComponent } from '../../modals/asset-new/asset-new.component';
import { ConnectivityNewComponent } from '../../modals/connectivity-new/connectivity-new.component';
import { AssetDataComponent } from '../../modals/asset-data/asset-data.component';

@Component({
  selector: 'app-thing-detail-page',
  templateUrl: './thing-detail.component.html',
  styleUrls: ['./thing-detail.component.css']
})
export class ThingDetailComponent implements OnInit {

  public thing: Thing;

  /**
   * each asset has a type, this map set its widget background color with asset's type.
   */
  public bgToAssetTypeMap = {
    'boolean': 'bg-cyan',
    'number': 'bg-orange',
    'string': 'bg-green',
    'array': '',
    'object': '',
  };

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
  public layer = marker([0, 0], {
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
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.tService.show(params.get('id'), params.get('tid')))
    ).subscribe(
      (thing: Thing) => {
        this.thing = thing;
        this.layer.setLatLng(latLng(this.thing.latitude, this.thing.longitude));
      }
    );
  }

  public recentData(asset: string): void {
    const modalRef = this.modalService.open(AssetDataComponent);
    modalRef.componentInstance.thing = this.thing;
    modalRef.componentInstance.asset = asset;
  }

  public createConnectivity(): void {
    const modalRef = this.modalService.open(ConnectivityNewComponent);
    modalRef.componentInstance.thing = this.thing;
    modalRef.result.then((thing) => this.thing = thing, (reason) => reason);
  }

  public createAsset(): void {
    const modalRef = this.modalService.open(AssetNewComponent);
    modalRef.componentInstance.thing = this.thing;
    modalRef.result.then((thing) => this.thing = thing, (reason) => reason);
  }

  public removeAsset(name: string): void {
    this.tService.assetRemove(this.thing.project, this.thing.id, name).subscribe(
      (thing: Thing) => {
        this.thing = thing;
      }
    );
  }

  public createToken(): void {
    this.tService.tokenCreate(this.thing.project, this.thing.id).subscribe(
      (thing: Thing) => {
        this.thing = thing;
      }
    );
  }

  public removeToken(token: string): void {
    this.tService.tokenRemove(this.thing.project, this.thing.id, token).subscribe(
      (thing: Thing) => {
        this.thing = thing;
      }
    );
  }

  public bgToConnectivityType(connectivity: any) {
    if (connectivity instanceof TTNConnectivity) {
      return 'bg-blue';
    }
  }
}
