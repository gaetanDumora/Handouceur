import { Routes } from '@angular/router';
import { AdminGuard, AuthGuard } from './shared/authentication/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/user/admin/admin.component').then(
        (mod) => mod.AdminComponent
      ),
    canActivate: [AdminGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/user/profile/profile.component').then(
        (mod) => mod.ProfileComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'journey',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/journey/journey-list/journey-list.component').then(
            (mod) => mod.JourneyListComponent
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./features/journey/journey-edit/journey-edit.component').then(
            (mod) => mod.JourneyEditComponent
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (mod) => mod.RegisterComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (mod) => mod.DialogLogin
          ),
      },
    ],
  },

  // { path: '**', component: PageNotFoundComponent }, TODO create component to handle this case
];
