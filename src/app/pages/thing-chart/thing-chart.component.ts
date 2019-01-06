import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { StockChart } from 'angular-highcharts';
import { Observable, merge } from 'rxjs';
import { randomColor } from 'randomcolor';

import { ThingService, Thing, QueryService, State, Partial } from '../../shared/backend';

@Component({
  selector: 'app-thing-chart',
  templateUrl: './thing-chart.component.html',
  styleUrls: ['./thing-chart.component.css']
})
export class ThingChartComponent implements OnInit {
  public loading: boolean;
  public chart: StockChart;
  public chartType = 'areaspline';
  public responseTime = 'N/A';

  public thing: Thing;
  public states: State[];

  constructor(
    private tService: ThingService,
    private qService: QueryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.tService.show(params.get('id'), params.get('tid')))
    ).subscribe(
      (thing: Thing) => {
        this.thing = thing;
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
      title: {
        text: 'Chart with Love',
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

    if (f.value.ws) {
      this.pfetch(f.value.assets, since, until, f.value.ws);
    } else {
      this.fetch(f.value.assets, since, until);
    }
  }

  /**
   * fetch calls fetch API and updates the chart.
   */
  private fetch(assets: string[], since: Date, until: Date) {
    const obs: Observable<State[]>[] = [];
    const start = Date.now();

    for (const asset of assets) {
      const ob = this.qService.fetch(this.thing.project, this.thing.id, 'number', asset, since, until).pipe(
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

    merge(...obs).subscribe(() => {
      this.loading = false;
      this.responseTime = `${Date.now() - start} ms`;
    });
  }

  /**
   * pfetch calls pfetch API and updates the chart.
   */
  private pfetch(assets: string[], since: Date, until: Date, ws: number) {
    const obs: Observable<Partial[]>[] = [];
    const start = Date.now();

    for (const asset of assets) {
      const ob = this.qService.pfetch(this.thing.project, this.thing.id, 'number', asset, since, until, ws).pipe(
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

    merge(...obs).subscribe(() => {
      this.loading = false;
      this.responseTime = `${Date.now() - start} ms`;
    });
  }
}
