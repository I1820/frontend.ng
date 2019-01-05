import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';

// IBreadcrumb represents breadcrumb items
interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
  active: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  template: `
    <ol class="breadcrumb pull-right">
      <li class="breadcrumb-item"><a routerLink=""><i class="fa fa-home"></i></a></li>
      <ng-container *ngFor="let breadcrumb of breadcrumbs">
        <li class="breadcrumb-item" [ngClass]="{'active': breadcrumb.active}">
          <a *ngIf="!breadcrumb.active else label" [routerLink]="[breadcrumb.url]">{{ breadcrumb.label }}</a>
          <ng-template #label>{{ breadcrumb.label }}</ng-template>
        </li>
      </ng-container>
    </ol>
  `
})

export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: IBreadcrumb[];
  private routeDataBreadcrumb = 'title'; // route label is finded based on "title" data

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.breadcrumbs = [];

    // subscribe to the NavigationEnd event
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        // set breadcrumbs based on activated route
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      }
    });
  }

  ngOnInit() {
  }

  /**
   * Returns array of IBreadcrumb objects that represent the breadcrumb.
   */
  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    // get the child routes
    const children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      // set active link
      breadcrumbs[breadcrumbs.length - 1].active = true;
      // set page title
      const title = 'FANIoT | ' + breadcrumbs[breadcrumbs.length - 1].label;
      this.titleService.setTitle(title);
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // verify the custom data property "title" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(this.routeDataBreadcrumb) || child.snapshot.data[this.routeDataBreadcrumb] === '') {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // get the route's URL segment
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // append route URL to URL
      url += `/${routeURL}`;

      // only add route when it does not have dash as its title
      if (child.snapshot.data[this.routeDataBreadcrumb] !== '-') {
        // add breadcrumb
        const breadcrumb: IBreadcrumb = {
          label: child.snapshot.data[this.routeDataBreadcrumb],
          params: child.snapshot.params,
          url: url,
          active: false,
        };
        breadcrumbs.push(breadcrumb);
      }

      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    return [];
  }
}
