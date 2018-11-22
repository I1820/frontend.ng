import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ThingService, Thing } from '../../shared/backend';

@Component({
  selector: 'app-asset-new-modal',
  templateUrl: './asset-new.component.html',
  styleUrls: ['./asset-new.component.css']
})
export class AssetNewComponent implements OnInit {

  public loading: boolean;
  @Input() thing: Thing;

  constructor(
    public activeModal: NgbActiveModal,
    public tService: ThingService,
  ) {}

  ngOnInit() {
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
   * formSubmits calls when user submits the asset creation form.
   */
  public formSubmit(f: FormGroup): void {
    this.tService.assetCreate(this.thing.project, this.thing.id, f.value.name, f.value.title, f.value.kind, f.value.type).subscribe(
      (thing: Thing) => {
        this.activeModal.close(thing);
      }
    );
  }
}
