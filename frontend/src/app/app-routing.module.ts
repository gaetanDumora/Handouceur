import { NgModule, isDevMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './features/home/content-layout/content-layout.component';
import { DialogLogin } from './features/auth/login/login.component';
import { JourneyListComponent } from './features/journey/journey-list/journey-list.component';
import { AdminGuard, AuthGuard } from './shared/authentication/auth.guard';
import { DialogRegister } from './features/auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
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
        path: 'home',
        component: JourneyListComponent,
        children: [
          {
            path: 'register',
            component: DialogRegister,
          },
          {
            path: 'login',
            component: DialogLogin,
          },
        ],
      },
      {
        path: 'home/edit/:id',
        loadComponent: () =>
          import('./features/journey/journey-edit/journey-edit.component').then(
            (mod) => mod.JourneyEditComponent
          ),
        canActivate: [AdminGuard],
      },
    ],
  },

  // { path: '**', component: PageNotFoundComponent }, TO DO
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
