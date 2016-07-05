import { RouterConfig }          from '@angular/router';
import { UserComponent,  
         LoginComponent } from '../user';
import { AuthGuard } from '../user';
import { AuthService } from '../services';

export const AuthRoutes: RouterConfig = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', redirectTo:'login' },
      { path: 'login',  component: LoginComponent },
    ]
  }
];


export const AUTH_PROVIDERS = [AuthGuard, AuthService];