import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './';
import { PanelComponent } from './panel';
import { TeamComponent } from './team';

const redirect = '2016 Summer';
const dashboardRoutes: Routes = [
    {
        path: 'league', component: DashboardComponent, children: [
            { path: ':league/team/:team', component: TeamComponent },
            { path: ':league', component: PanelComponent },
            { path: '', redirectTo: redirect, pathMatch: 'full'},
        ]
    },
    { path: '', redirectTo: `league/${redirect}`, pathMatch: 'full' }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
