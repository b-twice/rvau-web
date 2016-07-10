import { RouterConfig } from '@angular/router';
import { AdminComponent, AdminPanelComponent } from '../admin';
import { AuthGuard } from '../user';

export const AdminRoutes: RouterConfig = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: AdminPanelComponent,
                redirectTo: 'leagues',
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
