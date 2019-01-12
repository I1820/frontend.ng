import { Component, OnInit, Input } from '@angular/core';

import { QueryService, State } from '../../shared/backend';

@Component({
  selector: 'app-table-widget',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() pid: string;
  @Input() tid: string;
  @Input() asset: string;
  @Input() params: any;

  public states: State[];

  constructor(
    private qService: QueryService,
  ) { }

  ngOnInit() {
    this.fetch();
  }

  private fetch(): void {
    this.qService.recently(this.pid, this.tid, this.asset, this.params.n ? parseInt(this.params.n, 10) : 10).subscribe(
      (states: State[]) => this.states = states
    );
  }

}
