import { RouterConfig } from '@angular/router';
import { HomeComponent } from '../dashboard/home';
export const DashboardRoutes: RouterConfig = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent }
];
