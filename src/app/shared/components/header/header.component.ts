import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  items = [
    { label: 'Home', route: 'home', id: 0 },
    { label: 'Users', route: 'users', id: 1 },
    { label: 'Customers', route: 'customers', id: 2 },
    { label: 'Monitors', route: 'monitors', id: 3 },
    { label: 'Charts', route: 'charts', id: 4 },
  ];
  currentItem = 0;

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
