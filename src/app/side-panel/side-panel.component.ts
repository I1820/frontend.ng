import { Component, OnInit } from '@angular/core';

import { HealthService } from '../shared/backend';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  /**
   * indicates sidebar is open or close
   */
  public active: boolean;

  /**
   * project manager
   */
  public pmLastCheck: Date;
  public pmState;

  /**
   * weather forecasting
   */
  public wfLastCheck: Date;
  public wfState;

  /**
   * data manager
   */
  public dmLastCheck: Date;
  public dmState;

  constructor(
    private hService: HealthService,
  ) {
    this.active = false;
  }

  public wfCheck(): void {
    this.wfLastCheck = new Date();
    this.hService.wf().subscribe(
      (s: boolean) => {
        if (s === true) {
          this.wfState = {
            'btn-inverse': false,
            'btn-danger': false,
            'btn-success': true,
          };
        } else {
          this.wfState = {
            'btn-inverse': false,
            'btn-danger': true,
            'btn-success': false,
          };
        }
      }, () => {
        this.wfState = {
          'btn-inverse': true,
          'btn-danger': false,
          'btn-success': false,
        };
      }
    );
  }

  public pmCheck(): void {
    this.pmLastCheck = new Date();
    this.hService.pm().subscribe(
      (s: boolean) => {
        if (s === true) {
          this.pmState = {
            'btn-inverse': false,
            'btn-danger': false,
            'btn-success': true,
          };
        } else {
          this.pmState = {
            'btn-inverse': false,
            'btn-danger': true,
            'btn-success': false,
          };
        }
      }, () => {
        this.pmState = {
          'btn-inverse': true,
          'btn-danger': false,
          'btn-success': false,
        };
      }
    );
  }

  public dmCheck(): void {
    this.dmLastCheck = new Date();
    this.hService.dm().subscribe(
      (s: boolean) => {
        if (s === true) {
          this.dmState = {
            'btn-inverse': false,
            'btn-danger': false,
            'btn-success': true,
          };
        } else {
          this.dmState = {
            'btn-inverse': false,
            'btn-danger': true,
            'btn-success': false,
          };
        }
      }, () => {
        this.dmState = {
          'btn-inverse': true,
          'btn-danger': false,
          'btn-success': false,
        };
      }
    );
  }


  ngOnInit() {
    this.wfCheck();
    this.pmCheck();
    this.dmCheck();
  }

}
