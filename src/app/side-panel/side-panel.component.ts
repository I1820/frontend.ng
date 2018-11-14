import { Component, OnInit } from '@angular/core';

import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  private active: boolean;

  private pmLastCheck: Date;
  private pmState;

  private wfLastCheck: Date;
  private wfState;

  constructor(
    private bService: BackendService,
  ) {
    this.active = false;

    // project manager
    this.pmLastCheck = new Date();
    this.pmState = {
      'btn-inverse': true,
      'btn-danger': false,
      'btn-success': false,
    };

    // weather forecasting
    this.wfLastCheck = new Date();
    this.wfState = {
      'btn-inverse': true,
      'btn-danger': false,
      'btn-success': false,
    };
  }

  public wfCheck(): void {
    this.wfLastCheck = new Date();
    this.bService.wfHealth().subscribe(
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
    this.bService.pmHealth().subscribe(
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

  ngOnInit() {
  }

}
