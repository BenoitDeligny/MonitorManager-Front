import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationError, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;
  route: string;

  constructor(private authService: AuthService, public router: Router) {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map((e) => e.url)
      )
      .subscribe((e) => (this.route = e));
  }

  ngOnInit(): void {
    this.items = [
      { label: 'home' },
      { label: 'users' },
      { label: 'customers' },
      { label: 'monitors' },
      { label: 'charts' },
    ];

    this.activeItem = this.items[0];
  }

  logout() {
    this.authService.logout();
  }
}
