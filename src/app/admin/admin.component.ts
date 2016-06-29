import { Component } from '@angular/core';
import { AdminHeaderComponent } from './header';
import { AdminNavComponent} from './nav';

@Component({
  selector: 'admin',
  template: require('./admin.component.html'),
  directives: [AdminHeaderComponent, AdminNavComponent],
  styles: []
})
export class AdminComponent {
}
