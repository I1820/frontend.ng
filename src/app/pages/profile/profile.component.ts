import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AuthenticationService } from '../../shared';

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
  private tabs: Tab[] = [
    {
      name: 'about',
      isSelected: true,
    }
  ];

  private user;

  /**
   * showTab changes given tab status to true and other tabs to false.
   */
  private showTab(key: number): void {
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
    app.setPageSettings({
      pageContentFullWidth: true
    });
    this.user = authService.getUser();
  }
}
