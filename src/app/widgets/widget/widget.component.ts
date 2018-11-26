import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Widget } from '../../shared/backend';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  @Input() widget: Widget;
  @Output() remove = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
