import { RouterConfig } from '@angular/router';
import { AdminComponent } from '../admin';
import { AdminPanelComponent } from '../admin/panel';

export const AdminRoutes: RouterConfig = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: AdminPanelComponent
            }
        ]
    }
];