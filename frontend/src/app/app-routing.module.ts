import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { DialogRegister } from './modules/register/register.component';
import { DialogLogin } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './shared/authentication/auth.guard';
import { ProfileComponent } from './modules/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'profile/:id',
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
    ],
  },

  // { path: '**', component: PageNotFoundComponent }, TO DO
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
