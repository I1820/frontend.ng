import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BackendService } from '../../shared/backend.service';


@Component({
  selector: 'app-weather-page',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  private darksky$: Observable<any[]>;

  constructor(
    private bService: BackendService,
  ) { }

  ngOnInit() {
    this.darksky$ = this.bService.weatherDarksky(35.8064342, 51.3950481);
  }

}
