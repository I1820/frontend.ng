import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { QueryService, Thing, State } from '../../shared/backend';

interface IData {
  thing: Thing;
  asset: string;
}

@Component({
  selector: 'app-asset-data-modal',
  templateUrl: './asset-data.component.html',
  styleUrls: ['./asset-data.component.css']
})
export class AssetDataComponent implements OnInit {

  public thing: Thing;
  public asset: string;

  public states: State[] = [];
  public responseTime = 'N/A';

  constructor(
    public dialogRef: MatDialogRef<AssetDataComponent>,
    @Inject(MAT_DIALOG_DATA) data: IData,
    private qService: QueryService,
  ) {
    this.thing = data.thing;
    this.asset = data.asset;
  }

  ngOnInit() {
    this.refresh(10);
  }

  public refresh(n: number): void {
    const start = Date.now();
    this.qService.recently(this.thing.project, this.thing.id, this.asset, n).subscribe(
      (states: State[]) => {
        this.states = states;
        this.responseTime = `${Date.now() - start} ms`;
      }
    );
  }

}
