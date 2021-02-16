import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoleGuard } from 'src/app/shared/guards/role.guard';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ProfileComponent } from '../app/pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [RoleGuard, AuthGuard],
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'monitors',
    loadChildren: () =>
      import('./monitors/monitors.module').then((m) => m.MonitorsModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
