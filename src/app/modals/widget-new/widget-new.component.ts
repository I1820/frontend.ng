import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { ThingService, Thing, ProjectService, Project, Widget } from '../../shared/backend';

@Component({
  selector: 'app-widget-new',
  templateUrl: './widget-new.component.html',
  styleUrls: ['./widget-new.component.css']
})
export class WidgetNewComponent implements OnInit {

  public loading: boolean;

  public projects$: Observable<Project[]>;
  public things$: Observable<Thing[]>;

  public thing: Thing;
  public type = 'gauge';
  public size = 6;

  @ViewChild('wf') widgetOptionsForm: FormGroup;
  // please note that these options are string even if their type is number
  public widgetOptions = {
    gauge: [
      { name: 'min', type: 'number' },
      { name: 'max', type: 'number' }
    ],
    chart: [
      { name: 'type', type: 'option', options: ['line', 'area', 'column'] },
      { name: 'n', type: 'number' }
    ],
  };
  public widgetTypes = Object.keys(this.widgetOptions);

  constructor(
    public activeModal: NgbActiveModal,
    public pService: ProjectService,
    public tService: ThingService,
  ) {}

  ngOnInit() {
    this.projects$ = this.pService.list();
  }

  public onProjectChange(p: Project): void {
    this.things$ = this.tService.list(p.id);
    this.thing = null;
  }

  public onThingChange(t: Thing): void {
    this.thing = t;
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
      return 'Build';
    }
  }

  /**
   * When input is invalid in the input box, input box must truns to red this function
   * returns true to trigger invalid class when input is invalid. use this with [class.is-invalid].
   */
  public isValid(m: FormControl): boolean {
    return m.invalid && (m.dirty || m.touched);
  }

  /**
   * formSubmits calls when user submits the widget creation form.
   */
  public formSubmit(f: FormGroup): void {
    const widget = new Widget(
      f.value.title, this.type,
      f.value.project, f.value.thing,
      f.value.asset, this.size,
      this.widgetOptionsForm.value
    );
    this.activeModal.close(widget);
  }
}
