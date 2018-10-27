import { group, animate, query, style, trigger, transition, state } from '@angular/animations';
import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import * as global from '../globals';

@Component({
  selector: 'sidebar-component',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('expandCollapse', [
      state('expand', style({ height: '*', overflow: 'hidden', display: 'block' })),
      state('collapse', style({ height: '0px', overflow: 'hidden', display: 'block' })),
      state('active', style({ height: '*', overflow: 'hidden', display: 'block' })),
      transition('expand <=> collapse', animate(100)),
      transition('active => collapse', animate(100))
    ])
  ]
})

export class SidebarComponent {
  navProfileState = 'collapse';
  slimScrollOptions = global.whiteSlimScrollOptions;
  @Output() toggleSidebarMinified = new EventEmitter<boolean>();
  @Output() hideMobileSidebar = new EventEmitter<boolean>();
  @Input() pageSidebarTransparent;

  toggleNavProfile() {
    if (this.navProfileState == 'collapse') {
      this.navProfileState = 'expand';
    } else {
      this.navProfileState = 'collapse';
    }
  }

  toggleMinified() {
    this.toggleSidebarMinified.emit(true);
  }

  expandCollapseSubmenu(currentMenu, allMenu, active) {
    for (let menu of allMenu) {
      if (menu != currentMenu) {
        menu.state = 'collapse';
      }
    }
    if (currentMenu.state == 'expand' || (active.isActive && !currentMenu.state)) {
      currentMenu.state = 'collapse';
    } else {
      currentMenu.state = 'expand';
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.hideMobileSidebar.emit(true);
    }
  }

  constructor(private eRef: ElementRef) {
  }

  menus = [
    {
      'icon': 'fa fa-th-large',
      'title': 'Dashboard',
      'caret': false,
      'url': 'dashboard',
    }
  ];
}
