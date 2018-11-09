import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  private active: boolean
  private lastCheck: Date
  private state

  constructor() {
    this.active = false;
    this.lastCheck = new Date();
    this.state = {
      'btn-inverse': true,
      'btn-danger': false,
      'btn-success': false
    };
  }

  public check(): void {
    this.lastCheck = new Date();
    this.state = {
      'btn-inverse': false,
      'btn-danger': true,
      'btn-success': false
    };

  }

  ngOnInit() {
  }

}
