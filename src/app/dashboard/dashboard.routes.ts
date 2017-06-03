import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './';
import { PanelComponent } from './panel';
import { TeamComponent } from './team';

const dashboardRoutes: Routes = [
    {
        path: 'league', component: DashboardComponent, children: [
            { path: ':league/team/:team', component: TeamComponent },
            { path: ':league', component: PanelComponent },
            { path: '', redirectTo: '2017 Summer', pathMatch: 'full'},
        ]
    },
    { path: '', redirectTo: `league/2017 Summer`, pathMatch: 'full' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(
            dashboardRoutes
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class DashboardRoutingModule { }
