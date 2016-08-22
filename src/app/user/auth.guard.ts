import { Injectable } from '@angular/core';
import { AuthService } from '../services';
import { CanActivate,
         Router }    from '@angular/router';

@Injectable()
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if (this.authService.isAuthorized) { return true; }
    this.router.navigate(['/user/login']);
    return false;
  }
}
