import { RouterModule, Routes } from '@angular/router';
import { UserComponent,  
         LoginComponent } from '../user';
import { AuthGuard } from '../user';
import { AuthService } from '../services';

export const UserRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', redirectTo:'login' },
      { path: 'login',  component: LoginComponent },
    ]
  }
];
export const authProviders = [AuthGuard, AuthService];
