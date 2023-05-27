import { NgModule, isDevMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './features/home/components/content-layout/content-layout.component';
import { DialogRegister } from './features/auth/components/register/register.component';
import { DialogLogin } from './features/auth/components/login/login.component';
import { JourneyListComponent } from './features/journey/components/journey-list/journey-list.component';
import { AdminGuard, AuthGuard } from './shared/authentication/auth.guard';
import { ProfileComponent } from './features/user/components/profile/profile.component';
import { JourneyEditComponent } from './features/journey/components/journey-edit/journey-edit.component';
import { AdminComponent } from './features/user/components/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
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
        component: JourneyEditComponent,
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
