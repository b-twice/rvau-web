import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './';
import { PanelComponent } from './panel';
import { TeamComponent } from './team';
const dashboardRoutes: Routes = [
    {
        path: 'league', component: DashboardComponent, children: [
            { path: '', component: PanelComponent },
            { path: ':league', component: PanelComponent },
            { path: ':league/team/:team', component: TeamComponent },
        ],
    },
    { path: '', redirectTo: 'league/2016 Summer', pathMatch:'full' }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
