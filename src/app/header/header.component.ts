import { Component, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

import { AuthenticationService } from '../shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Output() toggleMobileSidebar = new EventEmitter<boolean>();

  public mobileSidebarToggle(): void {
    this.toggleMobileSidebar.emit(true);
  }

  constructor(
    public authService: AuthenticationService,
  ) {
  }
}
