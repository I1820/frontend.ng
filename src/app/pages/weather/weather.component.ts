import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherService } from '../../shared/backend';
import { Darksky } from '../../shared/backend';


@Component({
  selector: 'app-weather-page',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  private darksky: Darksky;

  constructor(
    private wService: WeatherService,
  ) { }

  ngOnInit() {
    this.wService.darksky(35.8064342, 51.3950481).subscribe(
      (w: Darksky) => {
        this.darksky = w;
      }
    );
  }

}
