import { Component, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
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

  constructor(private renderer: Renderer2) {
  }
}
