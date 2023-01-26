import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { DialogLogin, DialogRegister } from './shared/dialog/dialog.component';

const routes: Routes = [
  {
    path: 'home',
    component: ContentLayoutComponent,
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
  // { path: '**', component: PageNotFoundComponent }, TO DO
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
