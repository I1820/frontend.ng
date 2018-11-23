import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Chart } from 'angular-highcharts';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { randomColor } from 'randomcolor';

import { ThingService, Thing, QueryService, State } from '../../shared/backend';

@Component({
  selector: 'app-thing-chart',
  templateUrl: './thing-chart.component.html',
  styleUrls: ['./thing-chart.component.css']
})
export class ThingChartComponent implements OnInit {
  public loading: boolean;
  public chart: Chart;

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
    this.chart = new Chart({
      chart: {
        type: 'area',
        zoomType: 'x',
      },
      title: {
        text: 'Chart with Love',
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
        tickPixelInterval: 1000,
      },
      series: []
    });
  }

  /**
   * submitButtonText specifies submit button inner html.
   * when someone click on submit button form status changes to loading
   * and submit button will shows a spinner.
   */
  private get submitButtonText(): string {
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

    const sinceDate = f.value.sinceDate;
    const sinceTime = f.value.sinceTime;
    const since: Date = new Date(sinceDate.year, sinceDate.month - 1, sinceDate.day, sinceTime.hour, sinceTime.minute);

    const untilDate = f.value.untilDate;
    const untilTime = f.value.untilTime;
    const until: Date = new Date(untilDate.year, untilDate.month - 1, untilDate.day, untilTime.hour, untilTime.minute);

    this.initChart();
    const obs: Observable<State[]>[] = [];

    for (const asset of f.value.assets) {
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
        this.chart.addSeries({
          name: asset,
          description: '',
          data: points,
          color: randomColor({ hue: 'random', luminosity: 'light' }),
        });
      });
    }

    merge(...obs).subscribe(() => this.loading = false);
  }
}
