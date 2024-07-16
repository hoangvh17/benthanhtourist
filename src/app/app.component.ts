// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'asm';
// }


import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeaderFooter = true;
  showLayoutAdmin = false;
  private excludedPathsForHeaderFooter: string[] = ['/statistic', 'user-list', '/category-list', '/category-add', '/category-edit', '/product-list', '/product-add', '/product-edit'];
  private includedPathsForAdminLayout: string[] = ['/statistic', 'user-list', '/category-list', '/category-add', '/category-edit', '/product-list', '/product-add', '/product-edit'];
  title: any;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeaderFooter = !this.excludedPathsForHeaderFooter.some(path => event.url.includes(path));
      this.showLayoutAdmin = this.includedPathsForAdminLayout.some(path => event.url.includes(path));
    });
  }
}



