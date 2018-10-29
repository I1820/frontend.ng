import { Component, HostListener, Renderer2, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import * as global from './globals';

/**
 * PageSettings contains page configuration.
 * Based on this configuration each page can customize its components.
 * Components are like header, footer, etc. has an option in page settings.
 */
interface PageSettings {
  pageSidebarMinified: boolean;
  pageContentFullHeight: boolean;
  pageContentFullWidth: boolean;
  pageContentInverseMode: boolean;
  pageWithFooter: boolean;
  pageWithoutSidebar: boolean;
  pageSidebarRight: boolean;
  pageSidebarRightCollapsed: boolean;
  pageSidebarTwo: boolean;
  pageSidebarWide: boolean;
  pageSidebarTransparent: boolean;
  pageSidebarLight: boolean;
  pageTopMenu: boolean;
  pageEmpty: boolean;
  pageBodyWhite: boolean;
  pageMobileSidebarToggled: boolean;
  pageMobileSidebarFirstClicked: boolean;
  pageMobileSidebarRightToggled: boolean;
  pageMobileSidebarRightFirstClicked: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  /**
   * Current page settings
   */
  private pageSettings: PageSettings;
  private pageHasScroll: boolean;

  ngOnInit() {
    this.pageSettings = {
      pageSidebarMinified: false,
      pageContentFullHeight: false,
      pageContentFullWidth: false,
      pageContentInverseMode: false,
      pageWithFooter: false,
      pageWithoutSidebar: false,
      pageSidebarRight: false,
      pageSidebarRightCollapsed: false,
      pageSidebarTwo: false,
      pageSidebarWide: false,
      pageSidebarTransparent: false,
      pageSidebarLight: false,
      pageTopMenu: false,
      pageEmpty: false,
      pageBodyWhite: false,
      pageMobileSidebarToggled: false,
      pageMobileSidebarFirstClicked: false,
      pageMobileSidebarRightToggled: false,
      pageMobileSidebarRightFirstClicked: false
    };
  }

  /**
   * onWindowScroll listens on scroll event.
   * The scroll event is fired when the document view or an element has been scrolled.
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    if (top > 0) {
      this.pageHasScroll = true;
    } else {
      this.pageHasScroll = false;
    }
  }

  /**
   * clearSettings clears settings to default.
   * This function is called when routing is happened to clear old page settings.
   */
  private clearSettings(): void {
    this.pageSettings.pageSidebarMinified = false;
    this.pageSettings.pageContentFullHeight = false;
    this.pageSettings.pageContentFullWidth = false;
    this.pageSettings.pageWithFooter = false;
    this.pageSettings.pageWithoutSidebar = false;
    this.pageSettings.pageSidebarRight = false;
    this.pageSettings.pageSidebarRightCollapsed = false;
    this.pageSettings.pageSidebarTwo = false;
    this.pageSettings.pageSidebarWide = false;
    this.pageSettings.pageSidebarTransparent = false;
    this.pageSettings.pageSidebarLight = false;
    this.pageSettings.pageTopMenu = false;
    this.pageSettings.pageEmpty = false;
    this.pageSettings.pageBodyWhite = false;
    this.pageSettings.pageContentInverseMode = false;
    this.pageSettings.pageMobileSidebarToggled = false;
    this.pageSettings.pageMobileSidebarFirstClicked = false;

    this.renderer.removeClass(document.body, 'bg-white');
  }

  /**
   * setPageSettings sets given settings on current page settings.
   */
  public setPageSettings(settings): void {
    for (const option of Object.keys(settings)) {
      this.pageSettings[option] = settings[option];
      if (option === 'pageBodyWhite' && settings[option] === true) {
        this.renderer.addClass(document.body, 'bg-white');
      }
    }
  }

  // set page minified
  public onToggleSidebarMinified(val: boolean): void {
    if (this.pageSettings.pageSidebarMinified) {
      this.pageSettings.pageSidebarMinified = false;
    } else {
      this.pageSettings.pageSidebarMinified = true;
    }
  }

  // set page right collapse
  public onToggleSidebarRight(val: boolean): void {
    if (this.pageSettings.pageSidebarRightCollapsed) {
      this.pageSettings.pageSidebarRightCollapsed = false;
    } else {
      this.pageSettings.pageSidebarRightCollapsed = true;
    }
  }

  // hide mobile sidebar
  public onHideMobileSidebar(val: boolean): void {
    if (this.pageSettings.pageMobileSidebarToggled) {
      if (this.pageSettings.pageMobileSidebarFirstClicked) {
        this.pageSettings.pageMobileSidebarFirstClicked = false;
      } else {
        this.pageSettings.pageMobileSidebarToggled = false;
      }
    }
  }

  // toggle mobile sidebar
  onToggleMobileSidebar(val: boolean): void {
    if (this.pageSettings.pageMobileSidebarToggled) {
      this.pageSettings.pageMobileSidebarToggled = false;
    } else {
      this.pageSettings.pageMobileSidebarToggled = true;
      this.pageSettings.pageMobileSidebarFirstClicked = true;
    }
  }

  constructor(private titleService: Title, private router: Router, private renderer: Renderer2) {
    // clear settings when routing is happend.
    router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.clearSettings();
      }
    });
  }
}
