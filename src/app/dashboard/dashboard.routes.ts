import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel';
const dashboardRoutes: Routes = [
    { path: 'league/:league', component: PanelComponent },
    { path: '', component: PanelComponent },
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
