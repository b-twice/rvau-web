import { Component} from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
  private title: string = "Richmond Ultimate Scores";
  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
}
