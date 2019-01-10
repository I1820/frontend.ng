import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { StockChart } from 'angular-highcharts';
import { Observable, merge } from 'rxjs';
import { randomColor } from 'randomcolor';

import { ThingService, Thing, QueryService, State, Partial } from '../../shared/backend';

@Component({
  selector: 'app-project-chart-page',
  templateUrl: './project-chart.component.html',
  styleUrls: ['./project-chart.component.css']
})
export class ProjectChartComponent implements OnInit {

  public loading: boolean;
  public chart: StockChart;
  public chartType = 'areaspline';
  public responseTime = 'N/A';

  public things: Thing[];
  public selectedThings: Thing[];
  public states: State[];
  private pid: string;

  constructor(
    private tService: ThingService,
    private qService: QueryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.tService.list(this.pid = params.get('id')))
    ).subscribe(
      (things: Thing[]) => {
        this.things = things;
      }
    );
    this.initChart();
  }

  private initChart(): void {
    this.chart = new StockChart({
      chart: {
        type: this.chartType,
        zoomType: 'x',
      },
      time: {
        useUTC: false,
      },
      legend: {
        enabled: true,
      },
      title: {
        text: 'Chart with <i class="fas fa-heart text-red"></i>',
        useHTML: true,
      },
      credits: {
        enabled: true,
      },
      yAxis: {
        minorTickInterval: 'auto'
      },
      series: []
    });
  }

  /**
   * addSeries calls addseries API of highcharts stockchart to add given series.
   */
  private addSeries(
    series: Highcharts.SeriesOptions,
    redraw = true,
    animation: boolean | Highcharts.Animation = false
  ): void {
    this.chart.ref$.subscribe(chart => {
      chart.addSeries(series, redraw, animation);
    });
  }

  /**
   * submitButtonText specifies submit button inner html.
   * when someone click on submit button form status changes to loading
   * and submit button will shows a spinner.
   */
  public get submitButtonText(): string {
    if (this.loading) {
      return `<i class="fas fa-spinner fa-spin"></i>`;
    } else {
      return 'Draw';
    }
  }

  /**
   * formSubmits calls when user submits the period information form.
   */
  public formSubmit(f: FormGroup): void {
    this.loading = true;

    const since = f.value.sinceDate;

    const until = f.value.untilDate;

    this.initChart();

    const assets: Map<string, string[]> = new Map<string, string[]>();
    for (const t of this.things) {
      if (f.value[`assets-${t.id}`] && f.value[`assets-${t.id}`].length) {
        assets.set(t.id, f.value[`assets-${t.id}`]);
      }
    }

    if (f.value.ws) {
      this.pfetch(assets, since, until, f.value.ws);
    } else {
      this.fetch(assets, since, until);
    }
  }

  /**
   * fetch calls fetch API and updates the chart.
   */
  private fetch(assets: Map<string, string[]>, since: Date, until: Date) {
    const obs: Observable<State[]>[] = [];
    const start = Date.now();

    for (const tid of assets.keys()) {
      for (const asset of assets.get(tid)) {
        const ob = this.qService.fetch(this.pid, tid, 'number', asset, since, until).pipe(
          map((states: State[]) => {
            const points = [];
            for (const state of states) {
              points.push([state.at.getTime(), state.value]);
            }
            return points;
          })
        );
        obs.push(ob); // adds newly created observable to list of created observable
        ob.subscribe((points: any[]) => { // adds new series to the chart
          this.addSeries({
            name: asset,
            description: '',
            data: points,
            color: randomColor({ hue: 'random', luminosity: 'light' }),
          });
        });
      }
    }

    merge(...obs).subscribe(() => {
      this.loading = false;
      this.responseTime = `${Date.now() - start} ms`;
    });
  }

  /**
   * pfetch calls pfetch API and updates the chart.
   */
  private pfetch(assets: Map<string, string[]>, since: Date, until: Date, ws: number) {
    const obs: Observable<Partial[]>[] = [];
    const start = Date.now();

    for (const tid of assets.keys()) {
      for (const asset of assets.get(tid)) {
        const ob = this.qService.pfetch(this.pid, tid, 'number', asset, since, until, ws).pipe(
          map((partials: Partial[]) => {
            const points = [];
            for (const partial of partials) {
              points.push({
                name: `${partial.since} - ${partial.until} - count: ${partial.count}`,
                x: (partial.since.getTime() + partial.until.getTime()) / 2,
                y: partial.value,
              });
            }
            return points;
          })
        );
        obs.push(ob); // adds newly created observable to list of created observable
        ob.subscribe((points: any[]) => { // adds new series to the chart
          this.addSeries({
            name: asset,
            description: '',
            data: points,
            color: randomColor({ hue: 'random', luminosity: 'light' }),
          });
        });
      }
    }

    merge(...obs).subscribe(() => {
      this.loading = false;
      this.responseTime = `${Date.now() - start} ms`;
    });
  }
}
