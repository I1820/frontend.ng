import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BackendService } from '../../shared/backend.service';
import { Darksky } from '../../shared/darksky.model';


@Component({
  selector: 'app-weather-page',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  private darksky: Darksky;

  constructor(
    private bService: BackendService,
  ) { }

  ngOnInit() {
    this.bService.weatherDarksky(35.8064342, 51.3950481).subscribe(
      (w: Darksky) => {
        this.darksky = w;
      }
    );
  }

}
