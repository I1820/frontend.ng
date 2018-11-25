import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { ThingService, Thing, ProjectService, Project } from '../../shared/backend';

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
  }
}
