import { RouterConfig } from '@angular/router';
import { AdminComponent, AdminTableComponent, AdminEditComponent } from '../admin';
import { AdminPanelComponent } from '../admin/panel';

export const AdminRoutes: RouterConfig = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: AdminTableComponent,
                redirectTo: 'leagues',
            },
            {
                path: ':table',
                component: AdminTableComponent,
            },
            {
                path: ':table/edit/:id',
                component: AdminEditComponent
            }
        ]
    }
];