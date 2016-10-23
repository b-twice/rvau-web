import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './';
import { MainComponent } from './main';
import { PanelComponent } from './panel';
import { TeamComponent } from './team';
const dashboardRoutes: Routes = [
    {
        path: 'league', component: DashboardComponent, children: [
            { path: '', component: MainComponent },
            { path: ':league', component: MainComponent },
            { path: ':league/team', redirectTo: ':league'},
            { path: ':league/team/:team', component: MainComponent },
        ]
    },
    { path: '', redirectTo: 'league', pathMatch: 'full' }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
