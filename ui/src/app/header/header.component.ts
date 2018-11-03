import { Component, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

import { AuthenticationService } from '../shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input() pageSidebarTwo;
  @Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
  @Output() toggleMobileSidebar = new EventEmitter<boolean>();
  @Output() toggleMobileRightSidebar = new EventEmitter<boolean>();

  private mobileSidebarToggle(): void {
    this.toggleMobileSidebar.emit(true);
  }

  private mobileRightSidebarToggle(): void {
    this.toggleMobileRightSidebar.emit(true);
  }

  private toggleSidebarRight(): void {
    this.toggleSidebarRightCollapsed.emit(true);
  }

  constructor(
    private renderer: Renderer2,
    private authService: AuthenticationService,
  ) {
  }
}
