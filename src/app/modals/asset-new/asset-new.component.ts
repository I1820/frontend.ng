import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ThingService, Thing } from '../../shared/backend';

@Component({
  selector: 'app-asset-new-modal',
  templateUrl: './asset-new.component.html',
  styleUrls: ['./asset-new.component.css']
})
export class AssetNewComponent implements OnInit {

  public loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<AssetNewComponent>,
    @Inject(MAT_DIALOG_DATA) public thing: Thing,
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
   * formSubmits calls when user submits the asset creation form.
   */
  public formSubmit(f: FormGroup): void {
    this.tService.assetCreate(this.thing.project, this.thing.id, f.value.name, f.value.title, f.value.kind, f.value.type).subscribe(
      (thing: Thing) => {
        this.dialogRef.close(thing);
      }
    );
  }
}
