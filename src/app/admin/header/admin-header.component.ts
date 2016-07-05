import { Component} from '@angular/core';
import { AuthService } from '../../services';
@Component({
  selector: 'admin-header',
  template: require('./admin-header.component.html'),
  styles: [require('./admin-header.component.scss')]
})
export class AdminHeaderComponent {

  constructor(private authService: AuthService) {}

  logout():void {
    this.authService.logout();
  }
}
