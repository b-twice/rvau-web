import { RouterModule, Routes } from '@angular/router';
import { UserComponent }   from './user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services';

export const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
    ]
  }
];

export const userRouting = RouterModule.forChild(userRoutes);
export const authProviders = [AuthGuard, AuthService];
