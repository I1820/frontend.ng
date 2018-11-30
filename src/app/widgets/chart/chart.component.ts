import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { randomColor } from 'randomcolor';
import { map } from 'rxjs/operators';

import { QueryService, State } from '../../shared/backend';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

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
        type: this.params.type ? this.params.type : 'line',
        zoomType: 'x',
      },
      time: {
        useUTC: false,
      },
      title: {
        text: 'Chart',
      },
      credits: {
        enabled: true,
      },
      yAxis: {
        type: 'linear',
        minorTickInterval: 'auto'
      },
      xAxis: {
        type: 'datetime',
      },
      series: []
    });
    this.fetch();
  }

  public fetch(): void {
    const n = this.params.n ? parseInt(this.params.n, 10) : 10;

    this.qService.recently(this.pid, this.tid, this.asset, n).pipe(
      map((states: State[]) => {
        const points = [];
        for (const state of states) {
          points.push([state.at.getTime(), state.value]);
        }
        return points;
      })
    ).subscribe((points: any[]) => {
      this.chart.addSeries({
        name: this.asset,
        description: '',
        data: points,
        color: randomColor({ hue: 'random', luminosity: 'light' }),
      });
    });
  }
}
