import { RouterConfig } from '@angular/router';
import { AdminComponent, AdminPanelComponent } from '../admin';

export const AdminRoutes: RouterConfig = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: AdminPanelComponent,
                redirectTo: 'leagues',
            },
            {
                path: ':table',
                component: AdminPanelComponent,
            },
        ]
    }
];
