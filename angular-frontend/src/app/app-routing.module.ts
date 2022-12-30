import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { DialogEntryComponent } from './layout/nav/register/login-dialog.component';

const routes: Routes = [
  {
    path: 'home',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'dialog',
        component: DialogEntryComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
