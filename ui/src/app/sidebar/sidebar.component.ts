import { group, animate, query, style, trigger, transition, state } from '@angular/animations';
import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
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
  @Output() toggleSidebarMinified = new EventEmitter<boolean>();
  @Output() hideMobileSidebar = new EventEmitter<boolean>();
  @Input() pageSidebarTransparent;

  menus = [
    {
      'icon': 'fa fa-th-large',
      'title': 'Dashboard',
      'caret': false,
      'url': 'dashboard',
    }, {
      'icon': 'far fa-smile',
      'title': 'Projects',
      'caret': false,
      'url': 'projects',
    }
  ];

  toggleMinified() {
    this.toggleSidebarMinified.emit(true);
  }

  expandCollapseSubmenu(currentMenu, allMenu, active) {
    for (const menu of allMenu) {
      if (menu !== currentMenu) {
        menu.state = 'collapse';
      }
    }
    if (currentMenu.state === 'expand' || (active.isActive && !currentMenu.state)) {
      currentMenu.state = 'collapse';
    } else {
      currentMenu.state = 'expand';
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideMobileSidebar.emit(true);
    }
  }

  constructor(private eRef: ElementRef) {
  }
}
