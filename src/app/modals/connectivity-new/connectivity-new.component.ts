import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgOption } from '@ng-select/ng-select';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ThingService, Thing, ConnectivityType } from '../../shared/backend';

@Component({
  selector: 'app-connectivity-new-modal',
  templateUrl: './connectivity-new.component.html',
  styleUrls: ['./connectivity-new.component.css']
})
export class ConnectivityNewComponent implements OnInit {
  public loading: boolean;
  public ctype: ConnectivityType;
  public connectivityType = ConnectivityType; // it used in html template
  @Input() thing: Thing;

  public connectivities: NgOption[] = [
    {
      value: ConnectivityType.TTN,
      label: 'The Things Network',
    }
  ];

  /**
   * ctypeChange is called when user changes connectivity type with provided select input
   */
  public ctypeChange(e: NgOption) {
    if (e) {
      this.ctype = <ConnectivityType>e.value;
    } else {
      this.ctype = undefined;
    }
  }

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
   * formSubmits calls when user submits the connectivity creation form.
   */
  public formSubmit(f: FormGroup): void {
    this.tService.connectivityCreate(this.thing.project, this.thing.id, this.ctype, f.value).subscribe(
      (thing: Thing) => {
        this.activeModal.close(thing);
      }
    );
  }


}
