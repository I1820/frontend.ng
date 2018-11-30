import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { QueryService, State } from '../../shared/backend';

@Component({
  selector: 'app-gauge-widget',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit {
  @Input() pid: string;
  @Input() tid: string;
  @Input() asset: string;
  @Input() params: any;

  public chart: Chart;

  constructor(
    private qService: QueryService,
  ) { }

  ngOnInit() {
    this.chart = new Chart({
      chart: {
        type: 'gauge'
      },
      pane: {
        startAngle: -150,
        endAngle: 150
      },
      title: {
        text: 'Gauge'
      },
      credits: {
        enabled: false
      },
      yAxis: {
        min: this.params.min ? parseInt(this.params.min, 10) : 0,
        max: this.params.max ? parseInt(this.params.max, 10) : 200,
        lineColor: '#ffa500',
        tickColor: '#adadad',
        minorTickColor: '#adadad',
        offset: -25,
        lineWidth: 2,
        tickLength: 5,
        minorTickLength: 5,
        endOnTick: false
      },
      series: []
    });
    this.fetch();
  }

  public fetch(): void {
    this.qService.recently(this.pid, this.tid, this.asset, 1).subscribe(
      (states: State[]) => this.chart.addSeries({ name: this.asset, data: [{y: states[0].value}] })
    );
  }

}
