import { Component, OnInit, Input } from '@angular/core';
import { Widget } from '../../shared/backend';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  @Input() widget: Widget;

  constructor() { }

  ngOnInit() {
  }

}
