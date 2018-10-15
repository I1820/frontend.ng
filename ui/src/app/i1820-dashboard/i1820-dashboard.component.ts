import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';


interface Card {
  title: string;
  content: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-i1820-dashboard',
  templateUrl: './i1820-dashboard.component.html',
  styleUrls: ['./i1820-dashboard.component.css']
})
export class I1820DashboardComponent {

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      let cards:Card[] = [
        {
          title: 'Avidnet Platform',
          content: `
          <p>I1820 had went to Avidnet in the summer of 2018 and then is evolves and grows</p>
          `,
          cols: 2,
          rows: 1
        }
      ];

      if (matches) {
        /** switch to another view based on screen size */
        cards[0].cols = 1
        return cards;
      }

      return cards;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
