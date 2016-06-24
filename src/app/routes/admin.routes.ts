import { RouterConfig } from '@angular/router';
import { AdminComponent, AdminTableComponent } from '../admin';
import { AdminPanelComponent } from '../admin/panel';

export const AdminRoutes: RouterConfig = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: AdminPanelComponent,
            },
            {
                path: ':table',
                component: AdminTableComponent
            }
        ]
    }
];