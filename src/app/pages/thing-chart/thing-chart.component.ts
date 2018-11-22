import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-thing-chart',
  templateUrl: './thing-chart.component.html',
  styleUrls: ['./thing-chart.component.css']
})
export class ThingChartComponent implements OnInit {
  public loading: boolean;

  constructor() { }

  ngOnInit() {
  }

  /**
   * submitButtonText specifies submit button inner html.
   * when someone click on submit button form status changes to loading
   * and submit button will shows a spinner.
   */
  private get submitButtonText(): string {
    if (this.loading) {
      return `<i class="fas fa-spinner fa-spin"></i>`;
    } else {
      return 'Draw';
    }
  }

  /**
   * formSubmits calls when user submits the period information form.
   */
  public formSubmit(f: FormGroup): void {
    console.log(f.valid)
    console.log(f.value);
  }
}
