import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  template: `
    <dashboard-metabar></dashboard-metabar>
    <router-outlet></router-outlet>
    `,

})
export class DashboardComponent {
}
