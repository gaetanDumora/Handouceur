import { NgModule, isDevMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { DialogRegister } from './components/register/register.component';
import { DialogLogin } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminGuard, AuthGuard } from './shared/authentication/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { JourneyEditComponent } from './components/journey/journey-edit/journey-edit.component';

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
        component: HomeComponent,
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
