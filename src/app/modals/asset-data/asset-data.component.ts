import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { QueryService, Thing, State } from '../../shared/backend';

@Component({
  selector: 'app-asset-data-modal',
  templateUrl: './asset-data.component.html',
  styleUrls: ['./asset-data.component.css']
})
export class AssetDataComponent implements OnInit {

  @Input() thing: Thing;
  @Input() asset: string;

  public states: State[];
  public responseTime = 'N/A';

  constructor(
    private qService: QueryService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  public refresh(): void {
    const start = Date.now();
    this.qService.recently(this.thing.project, this.thing.id, this.asset, 10).subscribe(
      (states: State[]) => {
        this.states = states;
        this.responseTime = `${Date.now() - start} ms`;
      }
    );
  }

}
