import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminPanelComponent } from './panel/admin-panel.component';
import { AuthGuard } from '../user';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'leagues',
                pathMatch: 'full'
            },
            {
                path: 'leagues',
                component: AdminPanelComponent
            },
            {
                path: 'teams',
                component: AdminPanelComponent
            },
            {
                path: 'players',
                component: AdminPanelComponent
            },
            {
                path: 'leagueplayers',
                component: AdminPanelComponent
            },
            {
                path: 'games',
                component: AdminPanelComponent
            }
        ]
    }
];

export const adminRouting = RouterModule.forChild(adminRoutes);
