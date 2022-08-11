import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  breadcrumbList: Array<any> = [];
  constructor(
    public translate: TranslateService,
    private router: Router, private activatedRoute: ActivatedRoute
  ) { 

    // this.listenRouting();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  listenRouting(): any {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter((route) => route.outlet === PRIMARY_OUTLET))
      .subscribe((route) => {
        const snapshot = this.router.routerState.snapshot;
        this.breadcrumbList = [];
        if (route.snapshot.data) {
          // const url = snapshot.url;
          const routeData = route.snapshot.data;
          // const label = routeData.breadcrumb;
          // const params = snapshot.root.params;
          if (routeData.breadcrumb) {
            this.breadcrumbList = routeData.breadcrumb.split('/');
          }
        }
      });
  }

}
