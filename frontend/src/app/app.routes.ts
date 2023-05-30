import { Routes } from '@angular/router';
import { DialogLogin } from './features/auth/login/login.component';
import { JourneyListComponent } from './features/journey/journey-list/journey-list.component';
import { AdminGuard, AuthGuard } from './shared/authentication/auth.guard';
import { DialogRegister } from './features/auth/register/register.component';
import { provideState } from '@ngrx/store';
import { JOURNEY_FEATURE_KEY } from './store/journey/state';
import { journeyReducer } from './store/journey/journey.reducer';
import { provideEffects } from '@ngrx/effects';
import { JourneyEffects } from './store/journey/journey.effects';

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
    path: 'home',
    component: JourneyListComponent,
    providers: [
      // provideState(JOURNEY_FEATURE_KEY, journeyReducer),
      // provideEffects([JourneyEffects]),
    ],
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

  // { path: '**', component: PageNotFoundComponent }, TODO create component to handle this case
];
