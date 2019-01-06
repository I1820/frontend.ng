import { Component } from '@angular/core';
import { getData } from 'country-list';

import { AppComponent } from '../../app.component';
import { AuthenticationService } from '../../shared';
import { User } from '../../shared';

interface Tab {
  name: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  public tabs: Tab[] = [
    {
      name: 'about',
      isSelected: true,
    }
  ];

  public user: User;
  public countries: {
    name: string;
    code: string;
  }[] = getData();

  /**
   * showTab changes given tab status to true and other tabs to false.
   */
  public showTab(key: number): void {
    for (let i = 0; i < this.tabs.length; i++) {
      if (i === key) {
        this.tabs[i].isSelected = true;
      } else {
        this.tabs[i].isSelected = false;
      }
    }
  }

  constructor(
    private app: AppComponent,
    private authService: AuthenticationService,
  ) {
    this.app.setPageSettings({
      pageContentFullWidth: true
    });
    this.user = this.authService.getUser();
  }
}
