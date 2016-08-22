import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
const dashboardRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
